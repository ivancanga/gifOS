var video = document.querySelector("#videoElement");

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
    width: 720,
    onGifRecordingStarted: function() {
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
  video.srcObject.getTracks().forEach(function(track) {
    track.stop();
  });
  recorder.stopRecording(function() {
    recording = false;
    // Se oculta video y muestra el preview del gif
    video.style.display = "none";
    document.querySelector(".gif-preview-container").style.display = "block";
    preview = document.getElementById("gif-preview");
    preview.src = URL.createObjectURL(recorder.getBlob());
    document.getElementById("titleBox").innerHTML = "Vista Previa";

    // Aca van los add para la barra de buffer dinámica

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
  fetch(
    "https://upload.giphy.com/v1/gifs?api_key=xBWsI1LWcGLChS6L9d5ucODsG0BfkNEx",
    {
      method: "POST",
      body: gif
    }
  )
    .then(response => {
      console.log(response.status);
      return response.json();
    })
    .then(data => {
      console.log("Gif subido!");
      fetch(
        `https://api.giphy.com/v1/gifs/${data.data.id}?&api_key=xBWsI1LWcGLChS6L9d5ucODsG0BfkNEx`
      )
        .then(response => {
          return response.json();
        })
        .then(data => {
          localStorage.setItem(
            `gif-${data.data.id}`,
            JSON.stringify(data.data)
          );
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
let counter = 0;
function animateProgressBar(bar) {
  setInterval(() => {
    if (counter < bar.length) {
      bar.item(counter).classList.toggle("progress-bar-item-active");
      counter++;
    } else {
      counter = 0;
    }
  }, 200);
}
