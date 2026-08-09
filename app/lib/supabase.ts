import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(
  supabaseUrl || 'https://nlnjjttfacpbsdrahfmc.supabase.co',
  supabaseAnonKey || 'sb_publishable_IlW8hd1Q1bs7z5hQHw44TQ_nH0poNR8'
);

export interface DbProduct {
  id: string;
  name: string;
  category: string;
  format: string;
  price: string;
  image: string;
  created_at?: string;
}
