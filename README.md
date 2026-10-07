# Plan de marketing · Aruma & Soft Line

Calendario de contenido (orgánico y Meta Ads) para las dos marcas. Una sola página
estática: `index.html` (HTML + CSS + JS, sin build). Los datos compartidos viven en Supabase.

## Cómo funciona
- Todo el equipo edita el mismo calendario y ve los cambios de los demás en vivo.
- Cada cambio (estado, formato, texto, alta, baja) queda en un historial: quién, cuándo y qué cambió. Botón **Historial**.
- Sin claves en `config.js` funciona en modo local (datos solo en el navegador, sin historial).

## Puesta en marcha
1. Crear un proyecto en Supabase (propio de este calendario).
2. SQL Editor: correr `supabase/calendar.sql` y después `supabase/calendar-seed.sql`.
3. Authentication > Users: crear a las 5 personas (mail + contraseña). Opcional: cargar `full_name`
   en los metadatos del usuario para que el historial muestre el nombre y no el mail.
4. Completar `supabaseUrl` y `supabaseKey` (clave anon/publishable) en `config.js`.
5. Deploy en Vercel: importar el repo, sin framework ni build; se publica la carpeta raíz.

## Editar el diseño o el contenido
- Diseño y comportamiento: `index.html`.
- `DATA` dentro de `index.html` es el contenido de arranque del modo local; la base se carga con `supabase/calendar-seed.sql`.
