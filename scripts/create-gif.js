var video = document.querySelector("#videoElement");

function getStreamAndRecord() {
    $(".create-gif-section").css("display", "none");
    $(".video-recording").css("display", "block");
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true })
        .then(function (stream) {
            video.srcObject = stream;
        })
        .then(function (record) {
        });
}