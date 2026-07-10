import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://lcrxrxcomoiejaslmcft.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_B7jhVqx0apJuPikd2ckGhQ_2KOyEQlY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
