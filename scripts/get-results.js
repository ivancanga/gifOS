
const APIurl = "//api.giphy.com/v1/gifs/";
const APIkey = "xBWsI1LWcGLChS6L9d5ucODsG0BfkNEx";

// Resultados de busqueda

function getSearchResults() {
    document.querySelector(".search-results").style.display = 'block';
    search = document.getElementById("search").value;
    const found =
        fetch(`${APIurl}search?q=${search}&api_key=${APIkey}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                innerGifs = document.getElementById('inner_gifs');
                innerGifs.innerHTML = "";
                for (var i = 0; i < 20; i++) {
                    gifID = data.data[i].id;
                    imgURL = data.data[i].images.original.url;
                    gifDiv = document.createElement('div');
                    gifDiv.className = 'gif';
                    innerGifs.appendChild(gifDiv);

                    imgChild = document.createElement('img');
                    imgChild.src = imgURL;
                    titleDiv = document.createElement('div');
                    titleDiv.className = 'title-gif';
                    titleDiv.id = `gif-${i + 1}`;

                    gifDiv.append(imgChild, titleDiv);

                    titulo_gif = data.data[i].title.trim().split(" ");
                    titulo_gif = titulo_gif.filter(del => del !== 'GIF');
                    for (var j = 0; j <= 2; j++) {
                        if (titulo_gif[j] !== undefined && titulo_gif[j] !== "") {
                            spanChild = document.createElement('span');
                            spanChild.innerHTML = `#${titulo_gif[j]}`;
                            document.getElementById(`gif-${i + 1}`).appendChild(spanChild);
                        }
                    }

                    saveBtnChild = document.createElement('p');
                    saveBtnChild.className = 'save-gif';
                    saveBtnChild.id = gifID;
                    saveBtnChild.innerHTML = `<img title='Guardar Gifos' src='/gifOS/images/save-icon.png'>`;
                    saveBtnChild.onclick = function () {
                        localStorage.setItem(`gif-${this.id}`, this.id);
                        showLsItems();
                    }
                    gifDiv.append(saveBtnChild);

                }
                document.querySelector(".autocomplete-content").style.display = 'none';
                document.querySelector(".suggested").style.display = 'none';
                document.querySelector(".trendings").style.display = 'none';
            })
            .catch((error) => {
                return error
            })
    return found
}

// Autocompletar

function resultadoSugerido() {
    autoComp = document.querySelector(".autocomplete-content");
    autoComp.style.display = 'block';
    search = document.getElementById("search").value;
    if (search === "") {
        autoComp.style.display = 'none';
    }
    fetch(`${APIurl}search?q=${search}&api_key=${APIkey}&limit=3`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            autoComp.innerHTML = "";
            for (let i = 0; i < data.data.length; i++) {
                imgTITLE = data.data[i].title;
                if (imgTITLE !== "") {
                    imgURL = data.data[i].bitly_url;
                    sug = document.createElement('p');
                    autoComp.appendChild(sug);
                    innerS = `<a href="${imgURL}" target='_blank'>${imgTITLE}</a>`;
                    sug.innerHTML = innerS;
                }
            }
        });
}

// Limpiar resultados

function clearResults() {
    document.getElementById('inner_gifs').innerHTML = "";
    document.querySelector(".suggested").style.display = 'block';
    document.querySelector(".trendings").style.display = 'block';
    document.querySelector(".search-results").style.display = 'none';
}


// Random gifs, (refactorizar ese then data)

function suggestedGifs(gif) {
    fetch(`${APIurl}search?q=${gif}&api_key=${APIkey}&limit=1`)
        .then((response) => {
            return response.json()
        })
        .then(data => {
            $("#gif_suggested").append("<div class='gif-box'><section class='gif-title-card'><p>#" + gif + "</p><img src='/gifOS/images/button3.svg' /></section><img class='gif-img' src=' " + data.data[0].images.original.url + " ' /><span class='btn-gif'><a href=' " + data.data[0].bitly_url + "' target='_blank'>Ver más...</span><a></div>");
        });
}

let myArray = ['SakuraCardCaptor', 'SailorMoon', 'Togepi', 'Gatomon', 'Lapras', 'Mewtwo', 'Bulvasaur', 'Squirtle', 'Medabots']
let rand = function () {
    let myArraynew = [];
    let compara = myArray[Math.floor(Math.random() * myArray.length)];
    while (myArraynew.length < 4) {
        if (!myArraynew.includes(compara)) {
            myArraynew.push(compara);
        }
        compara = myArray[Math.floor(Math.random() * myArray.length)];
    }
    return myArraynew;
}

data = rand();
if ($(window).width() < 500) {
    $(document).ready(suggestedGifs(data[Math.floor(Math.random() * data.length)]));
} else {
    for (let i = 0; i < data.length; i++) {
        $(document).ready(suggestedGifs(data[i]));
    }
}

// Trending gifs (refactorizar)

function trendingGifs() {
    if ($(window).width() > 500) {
        qtyRes = 24;
    } else {
        qtyRes = 6;
    }
    fetch(`${APIurl}trending?&api_key=${APIkey}&limit=${qtyRes}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            for (let i = 0; i <= data.data.length; i++) {
                height = data.data[i].images.original.height;
                width = data.data[i].images.original.width;
                squareCheck = width / height;
                imgURL = data.data[i].images.original.url;
                $('#giftrending').append(`<div class='gif'><img src='${imgURL}' /><div class='title-gif' id='trend-gif-${i + 1}'></div></div>`);
                titulo_gif = data.data[i].title.trim().split(" ");
                titulo_gif = titulo_gif.filter(del => del !== 'GIF');
                for (var j = 0; j <= 3; j++) {
                    if (titulo_gif[j] !== undefined && titulo_gif[j] !== "") {
                        $(`#trend-gif-${i + 1}`).append(`<span>#${titulo_gif[j]}</span>`);
                    }
                }
                if (squareCheck > 1.3 && $(window).width() > 500) {
                    document.querySelector(".gif:last-child").classList.add("double-span");
                }
            }
        })
}