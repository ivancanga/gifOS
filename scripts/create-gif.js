var video = document.querySelector("#videoElement");

async function getStream() {
    $(".create-gif-section").css("display", "none");
    $(".video-recording").css("display", "block");
    let stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
    video.srcObject = stream;
}

function startRecording() {
    let stream = video.srcObject;
    recorder = RecordRTC(stream, {
        type: 'video/webm',
        frameRate: 1,
        quality: 10,
        onGifRecordingStarted: function () {
            console.log('started')
        }
    });
    recorder.startRecording();

    document.getElementById('titleBox').innerHTML = "Capturando Tu Guifo";

}

function stopRecording() {
    let stream = video.srcObject;
    video.srcObject = null;
    recorder.stopRecording(function () {
        let blob = recorder.getBlob();
        video.src = URL.createObjectURL(blob);
        video.loop = true;
        video.controls = true;
        document.getElementById('titleBox').innerHTML = "Vista Previa";

        let formData = new FormData();
        formData.append('file', blob, 'myGif.gif');
    });
    stream.getTracks().forEach(function(track) {
        track.stop();
    });
}

function uploadGif() {
    var miInit = {
        method: 'POST',
        mode: 'no-cors',
    };
    fetch('//upload.giphy.com/v1/gifs?api_key=xBWsI1LWcGLChS6L9d5ucODsG0BfkNEx', miInit)
        .then(response => {
            console.log(response);
        })
}