export const ENV = {
    BASE_URL: import.meta.env.VITE_BASE_URL || '',
    SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
    SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
    IS_PROD: import.meta.env.MODE === 'production',
};