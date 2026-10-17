import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const missingSupabaseEnv = [
  !supabaseUrl && "SUPABASE_URL",
  !supabaseServiceRoleKey && "SUPABASE_SERVICE_ROLE_KEY",
].filter(Boolean);

if (missingSupabaseEnv.length > 0 && typeof window === "undefined") {
  console.warn("Supabase client is not configured:", missingSupabaseEnv.join(", "));
}

export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;
export const supabaseAdmin = supabaseUrl && supabaseServiceRoleKey
  ? createClient(supabaseUrl, supabaseServiceRoleKey)
  : null;