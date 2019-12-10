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

function suggestedGifs(gif) {
    fetch('//api.giphy.com/v1/gifs/search?q=' + gif +
        '&api_key=xBWsI1LWcGLChS6L9d5ucODsG0BfkNEx&limit=1')
        .then((response) => {
            return response.json()
        }).then(data => {
            console.log(data.data);
            $("#gif_suggested").append("<div class='gif-box'><section class='gif-title-card'><p>#"+gif+"</p><img src='/gifOS/images/button3.svg' /></section><img class='gif-img' src=' " + data.data[0].images.original.url + " ' /><span class='btn-gif'><a href=' "+ data.data[0].bitly_url +"' target='_blank'>Ver más...</span><a></div>");
        });
}


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

function resultadoSugerido(){
    search = document.getElementById("search").value;
    fetch('//api.giphy.com/v1/gifs/search?q=' + search +
        '&api_key=xBWsI1LWcGLChS6L9d5ucODsG0BfkNEx&limit=1')
        .then((response) => {
            return response.json()
        }).then(data => {
            $("#sugerido1").html("");
            console.log(data.data[0].title);
            $("#sugerido1").append("<div><a href='"+ data.data[0].bitly_url +"' target='_blank'>" + data.data[0].title + "</a></div>");
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