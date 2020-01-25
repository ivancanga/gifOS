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
  let c = 0;
  for (let i = 0; i < localStorage.length; i++) {
    if (
      localStorage.key(i).startsWith("mygif-") ||
      localStorage.key(i).startsWith("gif-")
    ) {
      c++;
    }
    document.getElementById("gif-count").innerHTML = `(${c})`;
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
  document.querySelector(".content").style.filter = "grayscale(70%) blur(7px)";
  document.querySelector(".top-bar").style.filter = "grayscale(70%) blur(7px)";

  setTimeout(() => {
    document.querySelector(".content").style.filter = "none";
    document.querySelector(".top-bar").style.filter = "none";
    document.querySelector(".loading-page").style.display = "none";
  }, 2500);

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
