const show_date = document.getElementById("show_date");

function startTime() {
    var today = new Date();
    var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();

    var year = today.getFullYear();
    var month = today.getMonth();
    var day = today.getDate();
    var hour = today.getHours();
    var minute = today.getMinutes();
    var second = today.getSeconds();
    year = checkTime(year);
    month = checkTime(month);
    day = checkTime(day);
    minute = checkTime(minute);
    second = checkTime(second);
    var t = setTimeout(startTime, 1000);
    show_date.innerHTML =
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second;
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    } // add 0 for minute or second if they are less than 10
    return i;
}

show_date.innerHTML = setTimeout(() => {
    startTime();
}, -1000);
