let sailor_day = "./styles/sailor_day.css";
let sailor_night = "./styles/sailor_night.css";

function ver() {
  document.getElementById("style-list").style.display = "block";
}

function ocultar() {
  document.getElementById("style-list").style.display = "none";
}

function active_sailor_night() {
  document.getElementById("theme").href = sailor_night;
  document.getElementById("img-header").src =
    "./images/gifOF_logo_dark.png";
  document.getElementById("lupa").src = "./images/lupa.svg";
  setThemeLS();
}

function active_sailor_day() {
  document.getElementById("theme").href = sailor_day;
  document.getElementById("img-header").src = "./images/gifOF_logo.png";
  document.getElementById("lupa").src = "./images/lupa_inactive.svg";
  setThemeLS();
}

function changeLupa() {
  document.getElementById("lupa").src = "./images/lupa.svg";
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
  blurDOM(true,70,7);
  setTimeout(() => {
    blurDOM(false);
    document.querySelector(".loading-page").style.display = "none";
  }, 100);

  // Si alguna vez se predefinió el tema oscuro, permanece el tema por el value en LS
  if (localStorage.getItem("theme") == 2) {
    document.getElementById("theme").href = "./styles/sailor_night.css";
    document.getElementById("img-header").src =
      "./images/gifOF_logo_dark.png";
  }

  trendingGifs();
  showLsItems();
  setThemeLS();

  (function() {
    document.querySelector(".search-bar input").addEventListener('keypress',function(e) {
      if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
        document.querySelector(".btn-search").click();
        return false;
      } else {
        return true;
      }
    });
  })();

};
