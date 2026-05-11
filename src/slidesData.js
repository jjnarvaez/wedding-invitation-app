/*
 * Configuración del carrusel.
 *
 * Para añadir/quitar/cambiar fotos:
 *   1. Coloca los archivos en `public/assets/` (p. ej. `1.jpg`, `2.jpg`, ...).
 *   2. Edita esta lista: cada entrada apunta a un archivo de esa carpeta vía
 *      `img: '/assets/<nombre>'` y define su título y orientación.
 *   3. El gradiente `grad` se usa como fallback si la imagen no carga.
 *
 * El carrusel es un bucle infinito: puedes tener tantas entradas como quieras.
 */

const SLIDES = [
  { id: 1, caption: "El primer encuentro", horizontal: false, img: "/assets/1.jpg", grad: "linear-gradient(150deg,#1E150D,#2E2014 55%,#1A130B)" },
  { id: 2, caption: "Nuestro primer café", horizontal: true,  img: "/assets/2.jpg", grad: "linear-gradient(150deg,#1C130A,#2C1F13 55%,#180F08)" },
  { id: 3, caption: "Nuestra aventura",    horizontal: false, img: "/assets/3.jpg", grad: "linear-gradient(150deg,#21170D,#332218 55%,#1B130A)" },
  { id: 4, caption: "La propuesta",        horizontal: true,  img: "/assets/4.jpg", grad: "linear-gradient(150deg,#1B140C,#2A1E14 55%,#170F09)" },
  { id: 5, caption: "Para siempre",        horizontal: false, img: "/assets/5.jpg", grad: "linear-gradient(150deg,#1E140B,#301F13 55%,#180F08)" },
];

export default SLIDES;
