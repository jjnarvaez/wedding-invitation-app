# Carpeta de imágenes del carrusel

Coloca aquí las fotos que aparecerán en el carrusel de "Nuestra historia".

## Cómo funciona

1. Arrastra tus imágenes a esta carpeta (`public/assets/`).
2. Por convención usamos nombres simples: `1.jpg`, `2.jpg`, `3.jpg`, …
   pero puedes usar cualquier nombre (incluido `.png`, `.webp`, etc.).
3. Edita `src/slidesData.js` para asociar cada archivo con su título y
   orientación. Cada entrada tiene esta forma:

   ```js
   { id: 1, caption: "El primer encuentro", horizontal: false, img: "/assets/1.jpg", grad: "..." }
   ```

   - `img`: ruta relativa al servidor — siempre empieza con `/assets/…`
     (no `./assets` ni `public/assets`).
   - `horizontal: true` → tarjeta apaisada (4:3).  
     `horizontal: false` → tarjeta vertical (3:4).
   - `caption`: texto que se muestra sobre la foto.
   - `grad`: degradado de respaldo. Se muestra si la imagen no carga.

4. Puedes añadir tantas entradas como quieras: el carrusel funciona como
   bucle infinito, así que no hay límite de imágenes.

## Recomendaciones

- **Tamaño**: 1200–1600 px de ancho es suficiente. Imágenes demasiado
  grandes ralentizan la carga.
- **Formato**: `.jpg` para fotos, `.webp` si quieres peso aún menor.
- **Relación de aspecto**:
  - Verticales → cercanas a 3:4.
  - Horizontales → cercanas a 4:3.
- Las imágenes se recortan con `background-size: cover`, así que el
  centro siempre quedará visible.
