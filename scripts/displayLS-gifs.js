// Display Gifs (se ejecuta sola)

const myGifos = document.getElementById("mygifos");
const savedGifos = document.getElementById("savedgifos");

(function displayGifs() {
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).startsWith('mygif-')) {
        gifObj = JSON.parse(localStorage.getItem(localStorage.key(i)));
        gif = document.createElement("img");
        gif.id = gifObj.id;
        gif.src = `${gifObj.images.original.url}`;
        myGifos.appendChild(gif);
      }
      if (localStorage.key(i).startsWith('gif-')) {
        gifObj = JSON.parse(localStorage.getItem(localStorage.key(i)));
        gif = document.createElement("img");
        gif.id = gifObj.id;
        gif.src = `${gifObj.images.original.url}`;
        savedGifos.appendChild(gif);
      }
    }
    
    if(myGifos.innerHTML === ''){
      myGifos.innerHTML = 'Aun no creaste gifs';
    }
    if(savedGifos.innerHTML === ''){
      savedGifos.innerHTML = 'Aun no guardaste ningun gif';
    }
  })();

