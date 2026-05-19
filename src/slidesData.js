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

const asset = (path) => `${process.env.PUBLIC_URL}${path}`;

const SLIDES = [
  { id: 1, caption: "El primer encuentro", horizontal: false, aspectRatio: "3/4", img: asset("/assets/FotosCarrusel/1.jpeg"), grad: "linear-gradient(150deg,#1E150D,#2E2014 55%,#1A130B)" },
  { id: 2, caption: "Nuestro primer café", horizontal: false,  aspectRatio: "3/4", img: asset("/assets/FotosCarrusel/2.jpeg"), grad: "linear-gradient(150deg,#1C130A,#2C1F13 55%,#180F08)" },
  { id: 3, caption: "Nuestra aventura",    horizontal: false, aspectRatio: "3/4", img: asset("/assets/FotosCarrusel/3.jpeg"), grad: "linear-gradient(150deg,#21170D,#332218 55%,#1B130A)" },
  { id: 4, caption: "La propuesta",        horizontal: false,  aspectRatio: "3/4", img: asset("/assets/FotosCarrusel/4.jpeg"), grad: "linear-gradient(150deg,#1B140C,#2A1E14 55%,#170F09)" },
  { id: 5, caption: "Para siempre",        horizontal: false, aspectRatio: "3/4", img: asset("/assets/FotosCarrusel/5.jpeg"), grad: "linear-gradient(150deg,#1E140B,#301F13 55%,#180F08)" },
  { id: 6, caption: "¡Nos casamos!",       horizontal: false, aspectRatio: "3/4", img: asset("/assets/FotosCarrusel/6.jpeg"), grad: "linear-gradient(150deg,#1C130A,#2C1F13 55%,#180F08)" },
  { id: 7, caption: "¡Te esperamos!",      horizontal: false, aspectRatio: "3/4", img: asset("/assets/FotosCarrusel/7.jpeg"), grad: "linear-gradient(150deg,#1B140C,#2A1E14 55%,#170F09)" },
  { id: 8, caption: "¡Gracias por acompañarnos!", horizontal: false, aspectRatio: "3/4", img: asset("/assets/FotosCarrusel/8.jpeg"), grad: "linear-gradient(150deg,#1E140B,#301F13 55%,#180F08)" },
  { id: 9, caption: "¡Nos vemos pronto!", horizontal: false, aspectRatio: "3/4", img: asset("/assets/FotosCarrusel/9.jpeg"), grad: "linear-gradient(150deg,#1C130A,#2C1F13 55%,#180F08)" },
  { id: 10, caption: "¡Con amor, Junior & Tatiana!", horizontal: false, aspectRatio: "3/4", img: asset("/assets/FotosCarrusel/10.jpeg"), grad: "linear-gradient(150deg,#1B140C,#2A1E14 55%,#170F09)" },
];

export default SLIDES;
