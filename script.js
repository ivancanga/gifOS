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

function getSearchResults() {
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

$(function() {
    $(".search-bar input").keypress(function (e) {
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
            $('.btn-search').click();
            return false;
        } else {
            return true;
        }
    });
});