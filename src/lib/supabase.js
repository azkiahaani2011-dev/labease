import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://lcrxrxcomoiejaslmcft.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjcnhyeGNvbW9pZWphc2xtY2Z0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0OTgxMDksImV4cCI6MjA5ODA3NDEwOX0.43s93ZCnpy1MCw3-fFmxJX2LvGBIlLO_kyLa_ty9KGQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
