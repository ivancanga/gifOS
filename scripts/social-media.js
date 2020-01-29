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
    <div class='gif-title'>
          <span>Compartir gif!</span><span style='float: right;'><img id='close' src='/gifOS/images/button3.svg' /></span>
    </div>
    <img class='modal-gif-img' src='${src}'/>

    <div class='share-box-flex'>
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

      <div class='download-btn'>
        <p>
        <img src='/gifOS/images/download-icon.svg'>
        Descargar
        </p>
        <p id='copyEmbed'></p>
      </div>
    </div>
  `;
  document.body.appendChild(modalDiv);
  if (document.body.clientWidth > 500) {
    document.getElementById('copyEmbed').innerHTML = `
      Copiar Embed
    `
  }
  blurDOM(true, 40, 2);
  let closeModal = document.getElementById("close");
  closeModal.addEventListener("click", () => {
    document.body.removeChild(modalDiv);
    blurDOM(false);
  });
}

function blurDOM(flag, grayscale, blur) {
  if (flag === true) {
    document.querySelector(
      ".content"
    ).style.filter = `grayscale(${grayscale}%) blur(${blur}px)`;
    document.querySelector(
      ".top-bar"
    ).style.filter = `grayscale(${grayscale}%) blur(${blur}px)`;
  } else {
    document.querySelector(".content").style.filter = "none";
    document.querySelector(".top-bar").style.filter = "none";
  }
}
