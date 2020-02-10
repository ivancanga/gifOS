let video = document.querySelector("#video");
let buffer = document.querySelectorAll(".buffer-bar-item");

// Para timer de gif
let recording = false;

function getStream() {
  document.querySelector(".create-gif-section").style.display = "none";
  document.querySelector(".video-recording").style.display = "block";
  const constraints = {
    video: true,
    audio: false
  };
  navigator.mediaDevices
  .getUserMedia(constraints)
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(error => {
    console.error(error);
  });
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
  document.getElementById("startRecording").style.display = "none";
  document.querySelector(".stop").style.display = "block";
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

    // Creamos el formulario para enviarlo por el body a giphy
    let form = new FormData();
    form.append("file", recorder.getBlob(), "myGif.gif");

    document.getElementById("upload").addEventListener("click", () => {
      uploadGif(form);
    });
  });
  document.querySelector(".stop").style.display = "none";
  document.querySelector(".btns-upload-gif").style.display = "flex";
}

function uploadGif(gif) {
  document.querySelector('.gif-preview-container').innerHTML = `
  <div class='uploading-gif'>
    <img src="/gifOS/images/globe_img.png">
    <p class='uploading-gif-title'>Estamos subiendo tu guifo...<p>
    <div class="progress-bar" id="progress-bar">
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <p class='time-left'>Tiempo restante: <span style='text-decoration: line-through'>38 años</span> algunos segundos</p>
  </div>
  `;
  animateProgressBar();
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

// Cronometro
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

// Anima la barra de subida
function animateProgressBar() {
  document.querySelector('.progress-bar').style.display = 'inline-block';
  let progressBar = document.getElementById('progress-bar');
  let liCounter = 0;
  setInterval(function() {
    progressBar.querySelectorAll('li')[liCounter].style.display = 'inline-block';
    if (liCounter >= 15) {
      progressBar.querySelectorAll('li').forEach(element => {
        element.style.display = 'none';
      })
      liCounter = 0;
    }else{
      liCounter++;
    }
  }, 400);
};