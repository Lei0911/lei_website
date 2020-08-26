const body = document.getElementById("projectBody");
const box = document.getElementsByClassName("box");
const goBack = document.getElementById("goBack");

var buttons = document.getElementsByClassName("btn");
var hidden_boxs = document.getElementsByClassName("hidden_box");
var temp = [];

for (let i = 0; i < buttons.length; i++) {
    temp.push(i);
    buttons[i].onclick = () => {
        if (
            (buttons[i].style.opacity == 1, hidden_boxs[i].style.opacity == 0)
        ) {
            // move all content in hidden box up 20vh
            let x = 23.5;
            buttons[i].style.opacity = 0;
            hidden_boxs[i].style.opacity = 1;
            hidden_boxs[i].style.position = "absolute";
            buttons[i].style.zIndex = 2;
            hidden_boxs[i].style.top = "-" + `${i * x}` + "vh";
            goBack.style.visibility = "visible";

            console.log(box);
            // let all the rest grid opacity invisible
            temp.forEach((element) => {
                if (element != i) {
                    buttons[element].style.opacity = 0;
                    // has to be -1, under default 0
                    buttons[element].style.zIndex = 0;
                    hidden_boxs[element].style.opacity = 0;
                    goBack.style.visibility = "visible";
                }
            });
        } else {
            buttons[i].style.opacity = 1;
            hidden_boxs[i].style.opacity = 0;
            temp.forEach((element) => {
                if (element != i) {
                    buttons[element].style.opacity = 1;
                    hidden_boxs[element].style.opacity = 0;
                    buttons[element].style.zIndex = 2;
                    goBack.style.visibility = "hidden";
                }
            });
        }
    };
}
goBack.addEventListener("click", () => {
    window.location.href = "project";
});
