const movieAPI = document.getElementById("movieAPI");
const gameAPI = document.getElementById("gameAPI");
const hidden_notice = document.getElementsByClassName("hidden_notice");

movieAPI.addEventListener("click", () => {
    hidden_notice.style.opacity = 1;
});
gameAPI.addEventListener("click", () => {
    hidden_notice.style.opacity = 1;
});
