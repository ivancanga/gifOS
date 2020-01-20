let video = document.querySelector("#videoElement");
let buffer = document.querySelectorAll(".buffer-bar-item");

// Para timer de gif
let recording = false;

async function getStream() {
  $(".create-gif-section").css("display", "none");
  $(".video-recording").css("display", "block");
  let stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true
  });
  video.srcObject = stream;
}

function startRecording() {
  recording = true;
  recorder = RecordRTC(video.srcObject, {
    type: "gif",
    frameRate: 1,
    quality: 10,
    onGifRecordingStarted: function () {
      console.log("started");
    }
  });

  recorder.startRecording();
  getDuration();

  document.getElementById("titleBox").innerHTML = "Capturando Tu Guifo";
  $(".confirm").css("display", "none");
  $(".stop").css("display", "block");
}

function stopRecording() {
  video.srcObject.getTracks().forEach(function (track) {
    track.stop();
  });
  recorder.stopRecording(function () {
    recording = false;
    // Se oculta video y muestra el preview del gif
    video.style.display = "none";
    document.querySelector(".gif-preview-container").style.display = "block";
    preview = document.getElementById("gif-preview");
    preview.src = URL.createObjectURL(recorder.getBlob());
    document.getElementById("titleBox").innerHTML = "Vista Previa";

    // Aca van los add para la barra de buffer dinámica
    animateProgressBar(buffer);
    // ****

    // Creamos el formulario para enviarlo por el body a giphy
    let form = new FormData();
    form.append("file", recorder.getBlob(), "myGif.gif");

    document.getElementById("upload").addEventListener("click", () => {
      uploadGif(form);
    });
  });

  $(".stop").css("display", "none");
  $(".btns-upload-gif").css("display", "flex");
}

function uploadGif(gif) {
  animateProgressBar(buffer);
  document.querySelector('.gif-preview-container').innerHTML = `
  <div class='uploading-gif'>
    <img src="/gifOS/images/globe_img.png">
    <p class='uploading-gif-title'>Estamos subiendo tu guifo...<p>
    <div class="buffer">
      <div class="buffer-bar-item"></div>
      <div class="buffer-bar-item"></div>
      <div class="buffer-bar-item"></div>
      <div class="buffer-bar-item"></div>
      <div class="buffer-bar-item"></div>
      <div class="buffer-bar-item"></div>
      <div class="buffer-bar-item"></div>
      <div class="buffer-bar-item"></div>
      <div class="buffer-bar-item"></div>
      <div class="buffer-bar-item"></div>
      <div class="buffer-bar-item"></div>
      <div class="buffer-bar-item"></div>
      <div class="buffer-bar-item"></div>
      <div class="buffer-bar-item"></div>
      <div class="buffer-bar-item"></div>
      <div class="buffer-bar-item"></div>
      <div class="buffer-bar-item"></div>
      <div class="buffer-bar-item"></div>
      <div class="buffer-bar-item"></div>
      <div class="buffer-bar-item"></div>
      <div class="buffer-bar-item"></div>
      <div class="buffer-bar-item"></div>
    </div>
    <p class='time-left'>Tiempo restante: <span style='text-decoration: line-through'>38 años</span> algunos segundos</p>
  </div>
  `;
  document.querySelector('.btns-upload-gif').innerHTML = `
  <button class="btn-create-gif repeat push" onclick="location.href='upload.html'"><span>Cancelar</span></button>
  `

  fetch(
    "https://upload.giphy.com/v1/gifs?api_key=xBWsI1LWcGLChS6L9d5ucODsG0BfkNEx",
    {
      method: "POST",
      body: gif
    }
  )
    .then(response => {
      if (response.status === 200) {
        console.log('Gif subido!');
        return response.json();
      } else {
        console.log('error.');
      }
    })
    .then(data => {
      console.log(data);
      fetch(
        `https://api.giphy.com/v1/gifs/${data.data.id}?&api_key=xBWsI1LWcGLChS6L9d5ucODsG0BfkNEx`
      )
        .then(response => {
          return response.json();
        })
        .then(data => {
          localStorage.setItem(
            `mygif-${data.data.id}`,
            JSON.stringify(data.data)
          );
          let alertGif = document.createElement('div');
          alertGif.className = 'alert-gif';
          alertGif.innerHTML = `
          <p class='title-modal'> Guifo subido con éxito! <span style='float: right'><img id='closeModal' src="/gifOS/images/close.svg"></span></p>
          <div class='content-modal'>
            <img class='gif-modal' src='${data.data.images.original.url}'>
            <div class='gif-modal-btns'>
              <button>Copiar Enlace Guifo</button>
              <button>Descargar Guifo</button>
            </div>
          <div>
          `;
          document.querySelector('.content').style.filter = 'grayscale(70%) blur(2px)';
          document.querySelector('.top-bar').style.filter = 'grayscale(70%) blur(2px)';
          document.body.append(alertGif);
          document.getElementById('closeModal').addEventListener('click', () => {
            document.querySelector('.alert-gif').style.display = 'none';
            window.location.href = "../gifOS/my-gifos.html";
          });
        });
    });
}

// Entender como funciona esto bien
function getDuration() {
  let seconds = 0;
  let minutes = 0;
  let timer = setInterval(() => {
    if (recording) {
      if (seconds < 60) {
        if (seconds <= 9) {
          seconds = "0" + seconds;
        }
        document.getElementById("timer").style.display = "block";
        document.getElementById(
          "timer"
        ).innerHTML = `00:00:0${minutes}:${seconds}`;
        seconds++;
      } else {
        minutes++;
        seconds = 0;
      }
    } else {
      clearInterval(timer);
    }
  }, 1000);
}

// Anima la barra de subida, entender como funciona esto bien
function animateProgressBar(bar) {
  setInterval(() => {

    for (let i = 0; i < bar.length; i++) {
      setTimeout(() => {
        bar[i].classList.toggle("buffer-bar-item-active");
      }, 500);
    }

  }, 200);
}

