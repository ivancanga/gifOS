// Display Gifs (se ejecuta sola)

(function displayGifs() {
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).startsWith('mygif-')) {
        gifObj = JSON.parse(localStorage.getItem(localStorage.key(i)));
        gif = document.createElement("img");
        gif.id = gifObj.id;
        gif.src = `${gifObj.images.original.url}`;
        document.getElementById("mygifos").appendChild(gif);
      }
      if (localStorage.key(i).startsWith('gif-')) {
        gifObj = JSON.parse(localStorage.getItem(localStorage.key(i)));
        gif = document.createElement("img");
        gif.id = gifObj.id;
        gif.src = `${gifObj.images.original.url}`;
        document.getElementById("savedgifos").appendChild(gif);
      }
    }
  
  })();