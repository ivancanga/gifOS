# GifOS ![globe_img](https://ivancanga.github.io/gifOS/images/globe_img.png)

El proyecto GifOS consiste en la realización total de una web app (mobile/desktop), maquetado, estilado y funcionalidad a partir de un hi-fi mockup hecho por un UX/UI designer de Acámica (bootcamp TI). 

La app tiene diferentes funcionalidades, todas basadas en la obtención y envío de Gifs hechas a la APIrest de Giphy. 

- **Buscador de Gif** con resultados sugeridos, que trae (**http GET request**) y renderiza en pantalla una grilla estilada (CSS) con Grid las gifcards con la info de cada gif.
  - Imágen gif.
  - Título simulando hashtags del gif.
  - Funcionalidad para guardar el gif en **LocalStorage**.
  - Posibilidad de hacerle click e ir a la url de Giphy con más información.

- **Sugeridos** sección que muestra 4 resultados sugeridos randoms (desktop version) y 1 resultado sugerido (mobile version) a partir de un array con 10 valores.
- **Trendings**: sección que muestra los trendings del momento, para desktop, toma span 2 si el ancho del gif es wide. 
- **Creador de Gif**: Con la implementación de la librería **RecordRTC**, podemos grabar un video desde nuestra webcam y subirlo al servidor de Giphy (**http POST request**).
- **Mis Guifos**: Obtendremos un listado de todos los gifs que guardamos u hayamos creado. Para acceder siempre desde el navegador. Los gifs se guardan en el **LocalStorage**, con el value del **JSON string**. 

#### Live demo

> https://ivancanga.github.io/gifOS

#### Tecnologías utilizadas

- **HTML5**:
  - Etiquetas semánticas.
  - Validación de código.
  - Principios de diseño UX/UI
  - Buenas prácticas.
- **CSS3**:
  - **Responsive design**.
  - Cross browser & display.
  - SASS.
  - Flexbox-Grid.

- **Javascript**: 
  - Condicionales, arrays, iteraciones.
  - **DOM** + **Events handler**.
  - Ecmascript 6+.
  - **APIrest**. (http GET and POST requests).
  - Paradigma asíncrono. **Fetch. Async/Await. Promises.**
  - Uso de librerías **RecordRTC, JQuery**.
  - Buenas prácticas. Código legible.
