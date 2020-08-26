const body = document.getElementById("eduDetailBody");
const box1_btn = document.getElementById("box1_btn");
const box1Content = document.getElementById("box1Content");
const hidden_box1 = document.getElementById("hidden_box1");
const box2_btn = document.getElementById("box2_btn");
const box3_btn = document.getElementById("box3_btn");
const box4_btn = document.getElementById("box4_btn");
const box5_btn = document.getElementById("box5_btn");
const box6_btn = document.getElementById("box6_btn");
//
// const techContent = document.querySelectorAll("techContent");

var buttons = document.getElementsByClassName("btn");
var hidden_boxs = document.getElementsByClassName("hidden_box");
var temp = [];
for (let i = 0; i < buttons.length; i++) {
    temp.push(i);
    buttons[i].onclick = () => {
        if (
            (buttons[i].style.opacity == 1, hidden_boxs[i].style.opacity == 0)
        ) {
            buttons[i].style.opacity = 0;
            hidden_boxs[i].style.opacity = 1;

            // setTimeout(() => {
            //     buttons[i].style.opacity = 1;
            //     hidden_boxs[i].style.opacity = 0;
            // }, 5000);

            // let all the rest grid opacity invisible
            temp.forEach((element) => {
                if (element != i) {
                    buttons[element].style.opacity = 1;
                    hidden_boxs[element].style.opacity = 0;
                }
            });
        } else {
            buttons[i].style.opacity = 1;
            hidden_boxs[i].style.opacity = 0;
        }
    };
}
