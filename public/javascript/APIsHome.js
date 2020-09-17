const movieAPI = document.getElementById("movieAPI");
const gameAPI = document.getElementById("gameAPI");
const hidden_notice = document.getElementsByClassName("hidden_notice");

movieAPI.addEventListener("click", () => {
    window.location.href = "movieAPIHome";
});

gameAPI.addEventListener("click", () => {
    window.location.href = "gameAPIHome";
});
