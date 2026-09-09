# Invitación de Alejandro e Isabela

Proyecto estático en HTML, CSS y JavaScript. No requiere instalaciones, compilación, Node, React, TypeScript, PHP ni base de datos.

## Subir al hosting compartido
1. Abre el administrador de archivos de tu hosting.
2. Sube invitacion-hosting.zip a public_html o a una subcarpeta, por ejemplo public_html/boda.
3. Extrae el ZIP en esa carpeta. index.html debe quedar directamente dentro de ella, junto a styles.css, script.js y assets.
4. Visita tu dominio o tudominio.com/boda/.

También puedes subir directamente index.html, styles.css, script.js y la carpeta assets, conservando sus nombres. No necesitas subir carpetas ocultas como .git o .openai.

## Abrir en tu computadora
Abre index.html con doble clic. Las rutas de imágenes y música son relativas y funcionan tanto localmente como en subcarpetas del hosting. Las tipografías de Google Fonts necesitan conexión a Internet; si no hay conexión se utiliza la fuente alternativa.

## Personalizar
- index.html: nombres (entrada e invitación), fecha visible, horarios, lugar, textos y SVG del sobre.
- script.js: fecha de la cuenta regresiva, en la variable eventDate. Conserva el desplazamiento horario -06:00 o ajústalo al evento.
- styles.css: diseño original, adaptación móvil y animación del sobre al final del archivo.
- assets/music.mp3: música instrumental optimizada para web.
- assets/wedding.jpg y assets/venue.jpg: fotografías de ejemplo optimizadas para web.

## Funcionamiento
La portada solo muestra los nombres y el sobre. Al tocar el sobre (o pulsar Enter/Espacio con el botón enfocado), se abre la solapa, sube la tarjeta y aparece la invitación. Ese mismo toque inicia la música; el botón flotante permite pausarla o reintentar si el navegador bloquea el audio.
La cuenta regresiva termina en cero. Las animaciones respetan la preferencia de movimiento reducido. Sin JavaScript se muestra directamente el contenido estático.

Los datos de la boda y Casa del Olivo son ficticios. El enlace del mapa apunta a San Miguel de Allende.
