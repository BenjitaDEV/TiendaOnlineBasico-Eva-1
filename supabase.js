const SUPABASE_URL = "https://voeuxckqocigittflufq.supabase.co";
const SUPABASE_KEY = "sb_publishable_YEJNVNKhLJ_fZtG4CWf0TQ_syBzDJUi";

const db = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

console.log("Conexión con Supabase preparada");
