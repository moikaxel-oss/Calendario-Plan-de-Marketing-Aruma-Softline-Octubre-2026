# Calendario Plan de Marketing · Aruma & Soft Line

Calendario de contenido de Instagram (orgánico) y Meta Ads para dos marcas, **Aruma** y **Soft Line**. Lo usan 5 personas (Moisés, Ximena, Fernanda, Elbio, Luisina) para saber qué creativos hay que hacer, cuáles están diseñados y cuáles programados. Idioma de la interfaz y de las respuestas: español rioplatense, tono simple y directo.

## Dónde vive (leer primero)
- **Versión en uso: un Artifact de claude.ai** → https://claude.ai/artifact/LjYMw8VNp6BXd77U6aPzRt (editable en vivo por el equipo, con base de datos compartida).
- **`index.html` de este repo es una versión vieja** (la que usaba Supabase). No es lo que usa el equipo. No editarlo creyendo que cambia el calendario; si se quiere, primero sincronizarlo con el Artifact.
- Este repo es **público**: no guardar contraseñas ni claves privadas acá.
- Para modificar el Artifact: leerlo con `Artifact action: read`, editar el archivo local y volver a publicar con **el mismo `file_path`/`url`** (conserva el link). No pasar `capabilities` salvo que cambie: se conservan `{db: {}}`.
- El HTML del Artifact es un fragmento: sin `<html>/<head>/<body>`, empieza con `<title>`, fuentes y `<style>`, y termina con un solo `<script>`.

## Datos (capability `db`)
- Colección `posts/{id}`: `brand` (aruma|softline), `channel` (org|ads), `year` 2026, `month` 6–12, `day`, `format` (R|C|H|''), `status` (0 por hacer, 1 diseñado, 2 programado), `text`, `link` (URL del creativo en Canva; opcional, los documentos viejos no lo tienen).
  - El link se pega con el botón "+ Link de Canva" de cada tarjeta (Enter o salir del campo guarda, Esc cancela, vacío lo quita) y se abre con el botón "Canva ↗" en otra pestaña. Las repeticiones de "3 cuotas" muestran el link de la primera si no tienen uno propio. Los cambios quedan en el historial.
  - Carga inicial: ids `s0`…`s271` (272 contenidos). Los nuevos creados desde la página llevan ids `n…`.
- Colección `log/{auto}`: `at` (ms), `who`, `action` (insert|update|delete), `brand`, `channel`, `month`, `day`, `text`, `changes` (`{campo: [antes, después]}`). Lo escribe la página en cada cambio; es lo que muestra el botón discreto "historial" (abajo a la izquierda).
- El texto se guarda ~0,9 s después de dejar de tipear (para no llenar el historial de letras sueltas) y al cerrar o ocultar la pestaña.
- Los datos viven en la base, no en el HTML: no volver a escribir contenido en el código ni reseedear sin que lo pida el usuario.

## Reglas de negocio (no romper)
- Solo existen 3 formatos: **Reel** (rosa), **Carrusel** (violeta), **Historia** (verde azulado).
- Estados: Por hacer (tarjeta blanca), Diseñado (amarilla), Programado (verde).
- **"Diseñados" incluye a los programados** (programado implica que ya estuvo diseñado).
- Hay **3 contadores, uno por formato** (Reel, Historia, Carrusel; un cuarto "Sin formato" solo si hay alguno).
- **Historias "3 cuotas sin interés"** (formato Historia, texto exacto): se diseñan **una sola vez** pero se programan **cada aparición**.
  - La primera del mes (por día) es la que se diseña. Al pasarla a Por hacer o Diseñado, todas las demás copian ese estado. Si pasa a Programado, solo se programa esa (las otras quedan al menos en Diseñado).
  - Mientras la primera esté en Por hacer, las demás están bloqueadas ("se diseña el N"). Después cada una se marca Diseñado/Programado por su cuenta.
  - Contador: cada diseño cuenta una vez; cada aparición cuenta para programar ("a diseñar X · a programar Y" si difieren).
- Se puede arrastrar una tarjeta a otro día del **mismo mes** manteniendo el click (solo mouse/trackpad, no táctil). Queda en el historial.
- Los días de la semana quedan fijos arriba (`position: sticky`) al bajar por el mes. El zoom (pellizco del trackpad y botones) usa CSS `zoom`: no pixelar.
- Cada casilla de día crece según sus tarjetas; nada queda oculto.
- Al abrir, siempre se pide **usuario (desplegable) y contraseña**. El usuario no se recuerda ni se puede cambiar sin recargar. La contraseña se compara contra un hash SHA-256 (`PASS_HASH` en el script); la sabe José Carlos. Es un control blando, no seguridad real: el acceso real lo define el menú Share del Artifact.

## Identidad visual
- **Aruma**: fondo rosa `#F29CC9`, azul marino `#0B3085`, wordmark en Sora.
- **Soft Line**: fondo **blanco** con azules del logo (azul marino `#1F4A8C`/`#1B3A78`, celeste `#38B6FF` en la barra de días, fines de semana y vacíos en celeste), wordmark Playfair Display itálica. El gris anterior fue rechazado ("parecía muerto").
- Ambas: barra de días celeste, casillas blancas, título del mes en Anton itálica mayúscula, garabatos de fondo.
- Estilo minimalista y entendible.

## Límites del entorno Artifact
- Sin `alert()`, `confirm()` ni `prompt()`; scripts solo desde CDNs permitidos; sin descargas ni impresión.
- Debe funcionar en pantallas grandes (uso principal) y no romperse a ancho de celular.

## Cómo probar sin tocar los datos reales
Simular `window.claude.use('db')` con una base en memoria cargada con el contenido inicial y abrir una copia de la página (envuelta en `<html><body>`) con Playwright + Chromium (`/opt/pw-browsers/chromium`). Verificar contadores, la regla de "3 cuotas", arrastre y login. Sacar una captura antes de publicar cualquier cambio visual.

## Hábitos de trabajo con el usuario
- **Preguntar antes de mezclar proyectos o repositorios**: Aruma/Soft Line calendario y el CRM son proyectos separados (cada chat, un repositorio).
- Ir directo: el usuario prefiere que se haga el cambio pedido y se explique en pocas líneas, sin ofrecer alternativas innecesarias.
- Decir qué se probó y qué no (por ejemplo, si no se pudo ver el Artifact publicado ni la edición entre dos personas a la vez).

## Pendientes / ideas
- Sincronizar `index.html` del repo con el Artifact (hoy solo existe la copia local de trabajo y el Artifact publicado).
- Arrastrar tarjetas con el dedo en celular.
- Mover una tarjeta a otro mes.
- Confirmar con una persona del equipo con cuenta gratis que puede editar y ver los cambios en vivo.
- Deploy en Vercel con dominio propio: descartado por ahora (se usa el Artifact).
