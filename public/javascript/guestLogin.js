const back_to_entrance = document.getElementById("back_to_entrance");
const signIn = document.getElementById("signUp");

back_to_entrance.addEventListener("click", () => {
    window.location.href = "/";
});
signIn.addEventListener("click", () => {
    window.location.href = "/registerGuest";
});
