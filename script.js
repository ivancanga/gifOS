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