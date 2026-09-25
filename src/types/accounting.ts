export type AccountType = 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
export type TransactionType = 'income' | 'expense' | 'transfer';
export type PartyType = 'customer' | 'supplier' | 'both';
export type InvoiceStatus = 'draft' | 'unpaid' | 'partial' | 'paid' | 'cancelled';

export interface UserProfile {
  id: string; // matches auth.users.id
  email: string;
  fullName: string;
  businessName?: string;
  currency: string; // e.g. 'BDT', 'USD'
  createdAt: string;
}

export interface Account {
  id: string;
  userId: string;
  name: string; // e.g., 'Cash in Hand', 'Bank Account', 'bKash Merchant'
  accountType: AccountType;
  accountNumber?: string;
  balance: number;
  isDefault?: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  userId: string;
  name: string; // e.g., 'Sales', 'Office Rent', 'Salary', 'Utility Bills'
  type: 'income' | 'expense';
  icon?: string;
  color?: string;
}

export interface Party {
  id: string;
  userId: string;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  partyType: PartyType;
  totalReceivable: number; // For customers
  totalPayable: number;    // For suppliers
  createdAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  accountId: string;
  accountName?: string;
  categoryId?: string;
  categoryName?: string;
  partyId?: string;
  partyName?: string;
  type: TransactionType;
  amount: number;
  date: string; // YYYY-MM-DD
  reference?: string; // Voucher No / Invoice No / Check No
  description?: string;
  createdAt: string;
}

export interface InvoiceItem {
  id: string;
  invoiceId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  userId: string;
  invoiceNumber: string;
  partyId: string;
  partyName?: string;
  date: string;
  dueDate?: string;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paidAmount: number;
  dueAmount: number;
  status: InvoiceStatus;
  items?: InvoiceItem[];
  notes?: string;
  createdAt: string;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpense: number;
  netProfit: number;
  totalCashBank: number;
  totalReceivable: number;
  totalPayable: number;
}
