import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { UserProfile } from '../types/accounting';

export const authService = {
  // Sign In with Google (OAuth)
  async signInWithGoogle(redirectTo?: string) {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured. Please set up your .env credentials.');
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectTo || window.location.origin,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) throw error;
    return data;
  },

  // Sign In with Email & Password
  async signInWithEmail(email: string, password: string) {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured.');
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  // Sign Up with Email & Password
  async signUpWithEmail(email: string, password: string, fullName: string, businessName?: string) {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured.');
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          business_name: businessName || '',
        },
      },
    });

    if (error) throw error;
    return data;
  },

  // Sign Out
  async signOut() {
    if (!isSupabaseConfigured) return;
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Get Current Session
  async getSession() {
    if (!isSupabaseConfigured) return null;
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error('Get session error:', error);
      return null;
    }
    return data.session;
  },

  // Get Current User Profile
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    if (!isSupabaseConfigured) return null;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Fetch profile error:', error);
      return null;
    }

    return {
      id: data.id,
      email: data.email,
      fullName: data.full_name,
      businessName: data.business_name,
      currency: data.currency || 'BDT',
      createdAt: data.created_at,
    };
  },

  // Listen to Auth State Changes
  onAuthStateChange(callback: (event: string, session: any) => void) {
    if (!isSupabaseConfigured) return { unsubscribe: () => {} };
    const { data } = supabase.auth.onAuthStateChange(callback);
    return data.subscription;
  },
};
