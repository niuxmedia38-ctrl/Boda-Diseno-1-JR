# InvitaciÃ³n de Alejandro e Isabela

Proyecto estÃ¡tico en HTML, CSS y JavaScript. No requiere instalaciones, compilaciÃ³n, Node, React, TypeScript, PHP ni base de datos.

## Subir al hosting compartido
1. Abre el administrador de archivos de tu hosting.
2. Sube invitacion-hosting.zip a public_html o a una subcarpeta, por ejemplo public_html/boda.
3. Extrae el ZIP en esa carpeta. index.html debe quedar directamente dentro de ella, junto a styles.css, script.js y assets.
4. Visita tu dominio o tudominio.com/boda/.

TambiÃ©n puedes subir directamente index.html, styles.css, script.js y la carpeta assets, conservando sus nombres. No necesitas subir carpetas ocultas como .git o .openai.

## Abrir en tu computadora
Abre index.html con doble clic. Las rutas de imÃ¡genes y mÃºsica son relativas y funcionan tanto localmente como en subcarpetas del hosting. Las tipografÃ­as de Google Fonts necesitan conexiÃ³n a Internet; si no hay conexiÃ³n se utiliza la fuente alternativa.

## Personalizar
- index.html: nombres (entrada e invitaciÃ³n), fecha visible, horarios, lugar, textos y SVG del sobre.
- script.js: fecha de la cuenta regresiva, en la variable eventDate. Conserva el desplazamiento horario -06:00 o ajÃºstalo al evento.
- styles.css: diseÃ±o original, adaptaciÃ³n mÃ³vil y animaciÃ³n del sobre al final del archivo.
- assets/music.wav: mÃºsica instrumental. Puedes reemplazarla; si usas MP3, cambia tambiÃ©n el nombre en index.html.
- assets/wedding.png y assets/venue.png: fotografÃ­as de ejemplo generadas para esta invitaciÃ³n.

## Funcionamiento
La portada solo muestra los nombres y el sobre. Al tocar el sobre (o pulsar Enter/Espacio con el botÃ³n enfocado), se abre la solapa, sube la tarjeta y aparece la invitaciÃ³n. Ese mismo toque inicia la mÃºsica; el botÃ³n flotante permite pausarla o reintentar si el navegador bloquea el audio.
La cuenta regresiva termina en cero. Las animaciones respetan la preferencia de movimiento reducido. Sin JavaScript se muestra directamente el contenido estÃ¡tico.

Los datos de la boda y Casa del Olivo son ficticios. El enlace del mapa apunta a San Miguel de Allende.

