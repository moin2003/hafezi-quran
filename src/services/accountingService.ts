import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import {
  Account,
  Category,
  Party,
  Transaction,
  FinancialSummary,
} from '../types/accounting';

export const accountingService = {
  // ==========================================
  // ACCOUNTS (Cash / Bank / Mobile Wallets)
  // ==========================================
  async getAccounts(): Promise<Account[]> {
    if (!isSupabaseConfigured) return [];
    const { data, error } = await supabase
      .from('accounts')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;
    return (data || []).map((a) => ({
      id: a.id,
      userId: a.user_id,
      name: a.name,
      accountType: a.account_type,
      accountNumber: a.account_number,
      balance: parseFloat(a.balance || 0),
      isDefault: a.is_default,
      createdAt: a.created_at,
    }));
  },

  async createAccount(account: Omit<Account, 'id' | 'userId' | 'createdAt'>): Promise<Account> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('accounts')
      .insert({
        user_id: user.id,
        name: account.name,
        account_type: account.accountType,
        account_number: account.accountNumber,
        balance: account.balance,
        is_default: account.isDefault || false,
      })
      .select()
      .single();

    if (error) throw error;
    return {
      id: data.id,
      userId: data.user_id,
      name: data.name,
      accountType: data.account_type,
      accountNumber: data.account_number,
      balance: parseFloat(data.balance || 0),
      isDefault: data.is_default,
      createdAt: data.created_at,
    };
  },

  // ==========================================
  // CATEGORIES
  // ==========================================
  async getCategories(type?: 'income' | 'expense'): Promise<Category[]> {
    if (!isSupabaseConfigured) return [];
    let query = supabase.from('categories').select('*').order('name', { ascending: true });
    if (type) {
      query = query.eq('type', type);
    }
    const { data, error } = await query;
    if (error) throw error;

    return (data || []).map((c) => ({
      id: c.id,
      userId: c.user_id,
      name: c.name,
      type: c.type,
      icon: c.icon,
      color: c.color,
    }));
  },

  async createCategory(category: Omit<Category, 'id' | 'userId'>): Promise<Category> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('categories')
      .insert({
        user_id: user.id,
        name: category.name,
        type: category.type,
        icon: category.icon,
        color: category.color,
      })
      .select()
      .single();

    if (error) throw error;
    return {
      id: data.id,
      userId: data.user_id,
      name: data.name,
      type: data.type,
      icon: data.icon,
      color: data.color,
    };
  },

  // ==========================================
  // PARTIES (Customers & Suppliers)
  // ==========================================
  async getParties(type?: 'customer' | 'supplier'): Promise<Party[]> {
    if (!isSupabaseConfigured) return [];
    let query = supabase.from('parties').select('*').order('name', { ascending: true });
    if (type) {
      query = query.or(`party_type.eq.${type},party_type.eq.both`);
    }
    const { data, error } = await query;
    if (error) throw error;

    return (data || []).map((p) => ({
      id: p.id,
      userId: p.user_id,
      name: p.name,
      phone: p.phone,
      email: p.email,
      address: p.address,
      partyType: p.party_type,
      totalReceivable: parseFloat(p.total_receivable || 0),
      totalPayable: parseFloat(p.total_payable || 0),
      createdAt: p.created_at,
    }));
  },

  async createParty(party: Omit<Party, 'id' | 'userId' | 'createdAt' | 'totalReceivable' | 'totalPayable'>): Promise<Party> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('parties')
      .insert({
        user_id: user.id,
        name: party.name,
        phone: party.phone,
        email: party.email,
        address: party.address,
        party_type: party.partyType,
      })
      .select()
      .single();

    if (error) throw error;
    return {
      id: data.id,
      userId: data.user_id,
      name: data.name,
      phone: data.phone,
      email: data.email,
      address: data.address,
      partyType: data.party_type,
      totalReceivable: parseFloat(data.total_receivable || 0),
      totalPayable: parseFloat(data.total_payable || 0),
      createdAt: data.created_at,
    };
  },

  // ==========================================
  // TRANSACTIONS
  // ==========================================
  async getTransactions(limit: number = 50): Promise<Transaction[]> {
    if (!isSupabaseConfigured) return [];
    const { data, error } = await supabase
      .from('transactions')
      .select(`
        *,
        accounts:account_id (name),
        categories:category_id (name),
        parties:party_id (name)
      `)
      .order('date', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return (data || []).map((t) => ({
      id: t.id,
      userId: t.user_id,
      accountId: t.account_id,
      accountName: t.accounts?.name,
      categoryId: t.category_id,
      categoryName: t.categories?.name,
      partyId: t.party_id,
      partyName: t.parties?.name,
      type: t.type,
      amount: parseFloat(t.amount || 0),
      date: t.date,
      reference: t.reference,
      description: t.description,
      createdAt: t.created_at,
    }));
  },

  async createTransaction(transaction: Omit<Transaction, 'id' | 'userId' | 'createdAt'>): Promise<Transaction> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('transactions')
      .insert({
        user_id: user.id,
        account_id: transaction.accountId,
        category_id: transaction.categoryId || null,
        party_id: transaction.partyId || null,
        type: transaction.type,
        amount: transaction.amount,
        date: transaction.date,
        reference: transaction.reference || '',
        description: transaction.description || '',
      })
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      userId: data.user_id,
      accountId: data.account_id,
      categoryId: data.category_id,
      partyId: data.party_id,
      type: data.type,
      amount: parseFloat(data.amount || 0),
      date: data.date,
      reference: data.reference,
      description: data.description,
      createdAt: data.created_at,
    };
  },

  // ==========================================
  // FINANCIAL SUMMARY / DASHBOARD STATS
  // ==========================================
  async getFinancialSummary(): Promise<FinancialSummary> {
    if (!isSupabaseConfigured) {
      return {
        totalIncome: 0,
        totalExpense: 0,
        netProfit: 0,
        totalCashBank: 0,
        totalReceivable: 0,
        totalPayable: 0,
      };
    }

    // 1. Calculate Account Balances
    const { data: accounts } = await supabase.from('accounts').select('balance');
    const totalCashBank = (accounts || []).reduce((acc, curr) => acc + parseFloat(curr.balance || 0), 0);

    // 2. Calculate Receivables & Payables
    const { data: parties } = await supabase.from('parties').select('total_receivable, total_payable');
    const totalReceivable = (parties || []).reduce((acc, curr) => acc + parseFloat(curr.total_receivable || 0), 0);
    const totalPayable = (parties || []).reduce((acc, curr) => acc + parseFloat(curr.total_payable || 0), 0);

    // 3. Calculate Income and Expenses from Transactions
    const { data: txs } = await supabase.from('transactions').select('type, amount');
    let totalIncome = 0;
    let totalExpense = 0;

    (txs || []).forEach((t) => {
      const amt = parseFloat(t.amount || 0);
      if (t.type === 'income') totalIncome += amt;
      else if (t.type === 'expense') totalExpense += amt;
    });

    return {
      totalIncome,
      totalExpense,
      netProfit: totalIncome - totalExpense,
      totalCashBank,
      totalReceivable,
      totalPayable,
    };
  },
};
