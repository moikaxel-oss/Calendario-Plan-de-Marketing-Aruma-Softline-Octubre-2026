// Claves públicas de Supabase (Project Settings > API). Son seguras para el navegador:
// los datos los protege el login y las reglas de la base (RLS).
// Vacías = modo local: el calendario funciona pero solo guarda en este navegador.
window.CALENDAR_CONFIG = {
  supabaseUrl: "",
  supabaseKey: "", // "anon" o "publishable"
};
