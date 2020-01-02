
const APIurl = "//api.giphy.com/v1/gifs/"; 
const APIkey = "xBWsI1LWcGLChS6L9d5ucODsG0BfkNEx";

// Resultados de busqueda

function getSearchResults() {
    $(".search-results").css("display", "block");
    search = document.getElementById("search").value;
    const found =
        fetch(`${APIurl}search?q=${search}&api_key=${APIkey}`)
            .then((response) => {
                return response.json()
            }).then(data => {
                $("#inner_gifs").html("");
                console.log(data.data);
                for (var i = 0; i < 20; i++) {
                    $("#inner_gifs").append(`<div class='gif'><img src=${data.data[i].images.original.url}/><div class='title-gif' id='gif-${i + 1}'></div></div>`);
                    let titulo_gif = data.data[i].title.trim().split(" ");
                    titulo_gif = titulo_gif.filter(del => del !== 'GIF');
                    console.log(titulo_gif);
                    for (var j = 0; j <= 2; j++) {
                        console.log(titulo_gif[j]);
                        if (titulo_gif[j] !== undefined && titulo_gif[j] !== "") {
                            $(`#gif-${i + 1}`).append(`<span>#${titulo_gif[j]}</span>`);
                        }
                    }
                }
                $(".suggested").css("display", "none");
                $(".trendings").css("display", "none");
            })
            .catch((error) => {
                return error
            })
    return found
}

// Autocompletar (refactorizar)

function resultadoSugerido() {
    $(".autocomplete-content").css("display", "block");
    search = document.getElementById("search").value;
    if (search === "") {
        $(".autocomplete-content").css("display", "none");
    }
    fetch(`${APIurl}search?q=${search}&api_key=${APIkey}&limit=3`)
        .then((response) => {
            return response.json()
        }).then(data => {
            $("#sugerido1").html("");
            $("#sugerido2").html("");
            $("#sugerido3").html("");
            $("#sugerido1").append("<div><a href='" + data.data[0].bitly_url + "' target='_blank'>" + data.data[0].title + "</a></div>");
            $("#sugerido2").append("<div><a href='" + data.data[1].bitly_url + "' target='_blank'>" + data.data[1].title + "</a></div>");
            $("#sugerido3").append("<div><a href='" + data.data[2].bitly_url + "' target='_blank'>" + data.data[2].title + "</a></div>");
        });
}

// Limpiar resultados (pasar a JS dom)

function clearResults() {
    $("#inner_gifs").html("");
    $(".suggested").css("display", "block");
    $(".trendings").css("display", "block");
    $(".search-results").css("display", "none");
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

// Trending gifs

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
            for (elem in data.data) {
                height = data.data[elem].images.original.height;
                width = data.data[elem].images.original.width;
                squareCheck = width / height;
                imgURL = data.data[elem].images.original.url;
                $('#giftrending').append(`<div class='gif'><img src='${imgURL}' /></div>`);
                if (squareCheck > 1.3 && $(window).width() > 500) {
                    document.querySelector(".gif:last-child").classList.add("double-span");
                }
            }
        })
}