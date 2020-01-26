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

function displayModal() {
  let arrayGifs = document.querySelectorAll(".img-gif");
  arrayGifs.forEach(element => {
    element.addEventListener("click", e => {
      if (document.querySelector(".modal-div") === null) {
      createModal(e.target.src);
      e.stopPropagation();
      }
    });
  });
}

function createModal(src) {
    let modalDiv = document.createElement("div");
    modalDiv.className = "modal-div";
    modalDiv.innerHTML = `
    <p><img id='close' style='float: right;' src='/gifOS/images/button3.svg'/></p>
    <img class='modal-gif-img' src='${src}'/>
    <div class='social-media'>
      <p>
        <a target='_blank' href='https://wa.me/?text=${src}'>
          <img src='/gifOS/images/whatsapp.svg'>Enviar como mensaje
        </a>
      </p>

      <p>
        <a target='_blank' href='http://www.facebook.com/sharer/sharer.php?u=${src}'>
          <img src='/gifOS/images/facebook.svg'>Compartir en Facebook
        </a>
      </p>

      <p>
        <a target='_blank' href='http://twitter.com/share?url=${src}'>
          <img src='/gifOS/images/twitter.svg'>Twittear gif
        </a>
      </p>
    </div>
  `;
    document.body.appendChild(modalDiv);
    blurDOM(true,40,2);
    let closeModal = document.getElementById("close");
    closeModal.addEventListener("click", () => {
      document.body.removeChild(modalDiv);
      blurDOM(false);
    });
}

function blurDOM(flag,grayscale,blur){
  if(flag === true){
    document.querySelector(".content").style.filter = `grayscale(${grayscale}%) blur(${blur}px)`;
    document.querySelector(".top-bar").style.filter = `grayscale(${grayscale}%) blur(${blur}px)`;
  }else{
    document.querySelector(".content").style.filter = "none";
    document.querySelector(".top-bar").style.filter = "none";
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
