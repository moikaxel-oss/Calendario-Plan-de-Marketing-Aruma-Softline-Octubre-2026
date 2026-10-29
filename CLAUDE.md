# Calendario Plan de Marketing · Aruma & Soft Line

Calendario de contenido de Instagram (orgánico) y Meta Ads para dos marcas, **Aruma** y **Soft Line**. Lo usan 5 personas (Moisés, Ximena, Fernanda, Elbio, Luisina) para saber qué creativos hay que hacer, cuáles están diseñados y cuáles programados. Idioma de la interfaz y de las respuestas: español rioplatense, tono simple y directo.

## Dónde vive (leer primero)
- **Versión en uso: un Artifact de claude.ai** → https://claude.ai/artifact/LjYMw8VNp6BXd77U6aPzRt (editable en vivo por el equipo, con base de datos compartida).
- **`index.html` de este repo es una versión vieja** (la que usaba Supabase). No es lo que usa el equipo. No editarlo creyendo que cambia el calendario; si se quiere, primero sincronizarlo con el Artifact.
- Este repo es **público**: no guardar contraseñas ni claves privadas acá.
- Para modificar el Artifact: leerlo con `Artifact action: read`, editar el archivo local y volver a publicar con **el mismo `file_path`/`url`** (conserva el link). No pasar `capabilities` salvo que cambie: se conservan `{db: {}}`.
- El HTML del Artifact es un fragmento: sin `<html>/<head>/<body>`, empieza con `<title>`, fuentes y `<style>`, y termina con un solo `<script>`.

## Datos (capability `db`)
- Colección `posts/{id}`: `brand` (aruma|softline), `channel` (org|ads), `year` 2026, `month` 6–12, `day`, `format` (R|C|H|''), `status` (0 por hacer, 1 diseñado, 2 programado, 3 editado — el 3 solo lo usan los reels), `text`, `guion` (link al guión) y `link` (link al diseño en Canva); ambos opcionales, los documentos viejos no los tienen.
  - Qué se muestra según el formato y el estado: **Reel** (cualquier estado): solo "+ Link al guión". **Carrusel/Historia en "Por hacer"**: solo "+ Link al guión" (la opción de Canva desaparece). **Carrusel/Historia diseñado o programado**: aparece "+ Link de Canva" y el guión se sigue mostrando si ya estaba cargado, así una tarjeta puede tener los 2 links. Los links no se borran al cambiar el estado, solo se ocultan.
  - Cada link se pega con su botón (Enter o salir del campo guarda, Esc cancela, vacío lo quita) y se abre con "Guión ↗" / "Canva ↗" en otra pestaña. Las repeticiones de "3 cuotas" muestran los links de la primera si no tienen propios. Los cambios quedan en el historial ("agregó el link al guión", "cambió el link de Canva"…).
- Colección `log/{auto}`: `at` (ms), `who`, `action` (insert|update|delete), `brand`, `channel`, `month`, `day`, `text`, `changes` (`{campo: [antes, después]}`). Lo escribe la página en cada cambio; es lo que muestra el botón discreto "historial" (abajo a la izquierda).
- El texto se guarda ~0,9 s después de dejar de tipear (para no llenar el historial de letras sueltas) y al cerrar o ocultar la pestaña.
  - **Enter** en el campo "¿De qué trata?" guarda ya y sale del campo (no hace un renglón nuevo); **Shift+Enter** sí hace un renglón nuevo.
- Los datos viven en la base, no en el HTML: no volver a escribir contenido en el código ni reseedear sin que lo pida el usuario.

## Reglas de negocio (no romper)
- Solo existen 3 formatos: **Reel** (rosa), **Carrusel** (violeta), **Historia** (verde azulado).
- Estados de **Carrusel e Historia**: Por hacer (tarjeta blanca), Diseñado (amarilla), Programado (verde).
- Estados de **Reel** (4): **Por grabar** (blanca), **Grabado** (amarilla), **Editado** (azul), **Programado** (verde), en ese orden. Se guardan con los códigos 0, 1, 3 y 2 (el 2 sigue siendo Programado para que los reels ya cargados no cambien). Si un reel pasa a otro formato, "Editado" cuenta como Diseñado. El historial usa los nombres según el formato de la tarjeta.
- **"Diseñados" incluye a los programados** (programado implica que ya estuvo diseñado). En **Reel** pasa lo mismo en cadena: los contadores son por grabar / grabados / editados / programados y cada paso incluye a los que ya avanzaron más (programados ⊂ editados ⊂ grabados).
- Hay **3 contadores, uno por formato** (Reel, Historia, Carrusel; un cuarto "Sin formato" solo si hay alguno).
- **Historias "3 cuotas sin interés"** (formato Historia, texto exacto): se diseñan **una sola vez** pero se programan **cada aparición**.
  - La primera del mes (por día) es la que se diseña. Al pasarla a Por hacer o Diseñado, todas las demás copian ese estado. Si pasa a Programado, solo se programa esa (las otras quedan al menos en Diseñado).
  - Mientras la primera esté en Por hacer, las demás están bloqueadas ("se diseña el N"). Después cada una se marca Diseñado/Programado por su cuenta.
  - Contador: cada diseño cuenta una vez; cada aparición cuenta para programar ("a diseñar X · a programar Y" si difieren).
- Se puede arrastrar una tarjeta a otro día del **mismo mes** manteniendo el click (solo mouse/trackpad, no táctil). Queda en el historial.
- Los días de la semana quedan fijos arriba (`position: sticky`) al bajar por el mes. El zoom (pellizco del trackpad y botones) usa CSS `zoom`: no pixelar.
- Cada casilla de día crece según sus tarjetas; nada queda oculto.
- **Celular en vertical** (pantalla de hasta 640 px de ancho): el mes se muestra como una lista de días, uno debajo del otro (con el nombre del día), sin la barra LUNES–DOMINGO ni los botones de zoom. Todo está en un único bloque `@media (max-width:640px)` al final del `<style>`. **PC, tablet y celular horizontal no deben cambiar nunca por esto**: al tocar ese bloque, comparar capturas de PC antes y después. Los campos de texto usan 16 px en celular para que iPhone no haga zoom solo al escribir.
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
Simular `window.claude.use('db')` con una base en memoria cargada con el contenido inicial y abrir una copia de la página (envuelta en `<html><body>`) con Playwright + Chromium (`/opt/pw-browsers/chromium`). Verificar contadores, la regla de "3 cuotas", arrastre y login, y la vista de celular (viewport 390×844 con `isMobile`, sin desborde horizontal). Sacar una captura antes de publicar cualquier cambio visual.

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
