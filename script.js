function ver() {
    document.getElementById("style-list").style.display = "block";
};

function ocultar() {
    document.getElementById("style-list").style.display = "none";
};

function active_sailor_night() {
    document.getElementById("theme").href = "/gifOS/styles/sailor_night.css";
    document.getElementById("img-header").src = "/gifOS/images/gifOF_logo_dark.png";
    document.getElementById("lupa").src = "/gifOS/images/lupa.svg";
}

function active_sailor_day() {
    document.getElementById("theme").href = "";
    document.getElementById("img-header").src = "/gifOS/images/gifOF_logo.png";
    document.getElementById("lupa").src = "/gifOS/images/lupa_inactive.svg";
}

function getSearchResults() {

    search = document.getElementById("search").value;
    const found =
        fetch('http://api.giphy.com/v1/gifs/search?q=' + search +
            '&api_key=xBWsI1LWcGLChS6L9d5ucODsG0BfkNEx')
            .then((response) => {
                return response.json()
            }).then(data => {
                console.log(data.data);
                document.getElementById("inner").innerHTML = ("<img src='" + data.data[0].images.original.url + "' style='height:350px; width:350px'/>");
                return data
            })
            .catch((error) => {
                return error
            })
    return found

}