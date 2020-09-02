const BCIT_icon = document.getElementById("BCIT_icon");
const Centennial_icon = document.getElementById("Centennial_icon");

const bcitTranscript = document.getElementById("bcitTranscript");
const centennialTranscript = document.getElementById("centennialTranscript");

BCIT_icon.addEventListener("click", () => {
    window.location.href = "eduDetail";
});
Centennial_icon.addEventListener("click", () => {
    window.location.href = "eduDetailCentennial";
});

bcitTranscript.addEventListener("click", () => {
    window.location.href = "bcitTranscript";
});

centennialTranscript.addEventListener("click", () => {
    window.location.href = "centennialTranscript";
});

// onclick = "location.href ='eduDetail'";
