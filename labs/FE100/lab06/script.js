window.addEventListener("load",init);

function startTimer(duration, display) {
    var timer = duration;
    var minutes;
    var seconds;

    var countDown = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        timer--;

        if (timer === 0) {
            clearInterval(countDown);
        }
    }, 1000);
}

function init() {
    document.getElementById("start").addEventListener("click", function () {
        var countDownTime = 10; //seconds to launch
        display = document.getElementById('time');
        startTimer(countDownTime, display);
    });
}