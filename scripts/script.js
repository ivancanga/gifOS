let sailor_day = "/gifOS/styles/sailor_day.css";
let sailor_night = "/gifOS/styles/sailor_night.css";

// REFACTORIZAR TODO ESTO

function ver() {
  document.getElementById("style-list").style.display = "block";
}

function ocultar() {
  document.getElementById("style-list").style.display = "none";
}

function active_sailor_night() {
  document.getElementById("theme").href = sailor_night;
  document.getElementById("img-header").src =
    "/gifOS/images/gifOF_logo_dark.png";
  document.getElementById("lupa").src = "/gifOS/images/lupa.svg";
  setThemeLS();
}

function active_sailor_day() {
  document.getElementById("theme").href = sailor_day;
  document.getElementById("img-header").src = "/gifOS/images/gifOF_logo.png";
  document.getElementById("lupa").src = "/gifOS/images/lupa_inactive.svg";
  setThemeLS();
}

function changeLupa() {
  document.getElementById("lupa").src = "/gifOS/images/lupa.svg";
}

function showLsItems() {
  if (localStorage.length > 1) {
    document.getElementById("gif-count").innerHTML = `(${localStorage.length -
      1})`;
  }
}

function setThemeLS() {
  theme = document.getElementById("theme").getAttribute("href");
  if (theme == sailor_day) {
    localStorage.setItem("theme", 1);
  } else {
    localStorage.setItem("theme", 2);
  }
}

window.onload = function() {
  // Si alguna vez se predefinió el tema oscuro, permanece el tema por el value en LS
  if (localStorage.getItem("theme") == 2) {
    document.getElementById("theme").href = "/gifOS/styles/sailor_night.css";
    document.getElementById("img-header").src =
      "/gifOS/images/gifOF_logo_dark.png";
  }

  $("#rnd").append(Math.floor(Math.random() * 10000000));

  trendingGifs();
  showLsItems();
  setThemeLS();

  $(function() {
    $(".search-bar input").keypress(function(e) {
      if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
        $(".btn-search").click();
        return false;
      } else {
        return true;
      }
    });
  });
};
