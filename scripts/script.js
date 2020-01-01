function ver() {
    document.getElementById("style-list").style.display = "block";
};

function ocultar() {
    document.getElementById("style-list").style.display = "none";
};

function active_sailor_night() {
    document.getElementById("theme").href = "/gifOS/styles/sailor_night.css";
    document.getElementById("img-header").src = "/gifOS/images/gifOF_logo_dark.png";
    document.getElementById("lupa").src = "/gifOS/images/lupa.svg";
}

function active_sailor_day() {
    document.getElementById("theme").href = "/gifOS/styles/sailor_day.css";
    document.getElementById("img-header").src = "/gifOS/images/gifOF_logo.png";
    document.getElementById("lupa").src = "/gifOS/images/lupa_inactive.svg";
}

$("#rnd").append(Math.floor(Math.random() * 1000000));

/////////////////////// funcion suggested terminada, refactorizar

function suggestedGifs(gif) {
    fetch('//api.giphy.com/v1/gifs/search?q=' + gif +
        '&api_key=xBWsI1LWcGLChS6L9d5ucODsG0BfkNEx&limit=1')
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
    console.log(myArraynew);
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

////////////////////////////////////




function getSearchResults() {
    $(".search-results").css("display", "block");
    search = document.getElementById("search").value;
    const found =
        fetch('//api.giphy.com/v1/gifs/search?q=' + search +
            '&api_key=xBWsI1LWcGLChS6L9d5ucODsG0BfkNEx')
            .then((response) => {
                return response.json()
            }).then(data => {
                $("#inner_gifs").html("");
                console.log(data.data);
                for (var i = 0; i < 20; i++) {
                    $("#inner_gifs").append("<div><img src=' " + data.data[i].images.original.url + " ' /></div>");
                }
            })
            .catch((error) => {
                return error
            })
    return found
}

function resultadoSugerido() {
    $(".autocomplete-content").css("display", "block");
    search = document.getElementById("search").value;
    if (search === "") {
        $(".autocomplete-content").css("display", "none");
    }
    fetch('//api.giphy.com/v1/gifs/search?q=' + search +
        '&api_key=xBWsI1LWcGLChS6L9d5ucODsG0BfkNEx&limit=3')
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


// Trending gifs

function trendingGifs() {
    fetch('//api.giphy.com/v1/gifs/trending?&api_key=xBWsI1LWcGLChS6L9d5ucODsG0BfkNEx&limit=16')
        .then(response => {
            return response.json();
        })
        .then(data => {
            for (elem in data.data) {
                // guardo ancho y alto en una variable para medir si es cuadrado o wide, si se acerca a 1 es cuadrado, si no, wide
                // toma width 25% si es cuadrado, 50% si es wide, para el ancho del gif en la fila
                height = data.data[elem].images.original.height;
                width = data.data[elem].images.original.width;
                squareCheck = width / height;
                if (squareCheck < 1.3) {
                    w = 25;
                } else {
                    w = 50;
                }

                //ACA VIENE EL GUISO u.u

                // yo lo que quiero es que las filas sean fill content, posibilidades (en porcentaje): 
                // 4 elementos cuadrados (25,25,25,25)
                // 2 elementos wide (50,50)
                // 3 elementos mezcla (25,25,50) (25,50,25) (50,25,50)
                // o sea, SIEMPRE contWid tiene que dar 100

                //si el ancho del cuarto elemento (cont = 4) supera el 100 (contWid), el ancho de ese gif tiene que ser de 25% y se llena la fila (cont = 0)
                //si el ancho de los dos primeros elementos (cont = 2) son 50 (contWid = 100), se llena la fila (cont,contWid = 0)
                if(w == 50){
                    $('#giftrending').append(`<div class='gif' style=''><img src=' ` + data.data[elem].images.original.url + ` ' /></div>`);
                }else{
                    $('#giftrending').append(`<div class='gif'><img src=' ` + data.data[elem].images.original.url + ` ' /></div>`);
                }
            }
        })
}

trendingGifs();

// let titulo_gif = data.data[i].title.trim().split(" ");
// titulo_gif = titulo_gif.filter(del => del !== 'GIF');
// console.log(titulo_gif);
// $("#title-gifs").append(titulo_gif);

function changeLupa() {
    document.getElementById("lupa").src = "/gifOS/images/lupa.svg"
}


$(function () {
    $(".search-bar input").keypress(function (e) {
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
            $('.btn-search').click();
            return false;
        } else {
            return true;
        }
    });
});