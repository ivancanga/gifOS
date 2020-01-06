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

function changeLupa() {
    document.getElementById("lupa").src = "/gifOS/images/lupa.svg"
}

function showLsItems(){
    document.getElementById("gif-count").innerHTML = `(${(localStorage.length)})`;
}

window.onload = function() {

    $("#rnd").append(Math.floor(Math.random() * 10000000));

    trendingGifs();
    showLsItems();

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
}

