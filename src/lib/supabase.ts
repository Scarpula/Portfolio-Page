import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for database tables
export interface Company {
  id: string;
  name: string;
  name_en: string;
  role: string;
  period: string;
  description: string;
  color: string;
  slug: string;
  order: number;
  created_at: string;
}

export interface Project {
  id: string;
  company_id: string;
  title: string;
  description: string;
  role: string;
  tech_stack: string[];
  highlights: string[];
  order: number;
  created_at: string;
}
