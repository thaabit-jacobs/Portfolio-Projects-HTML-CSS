const overlay = document.querySelector(".overlay");
const closeSetTimerFormBtn = document.querySelector("#close-form");
const setTimerBtn = document.querySelector("#set");
const resetTimerBtn = document.querySelector("#reset");
const startTimerBtn = document.querySelector("#start");
const timerForm = document.querySelector("#timer-form");

const hours = document.querySelector("#hours");
const minutes = document.querySelector("#minutes");
const seconds = document.querySelector("#seconds");

timerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let hrs = makeTwoSpaceWide(timerForm["hrs"].value);
    let mins = makeTwoSpaceWide(timerForm["mins"].value);
    let secs = makeTwoSpaceWide(timerForm["secs"].value);

    hours.innerText = hrs;
    minutes.innerText = mins;
    seconds.innerText = secs;

    overlay.className = "hide";
})


setTimerBtn.addEventListener("click", () => {
    overlay.className = "overlay";
})

let interval;

resetTimerBtn.addEventListener("click", () => {
    hours.innerText = "00";
    minutes.innerText = "00";
    seconds.innerText = "00";

    clearInterval(interval);
})

startTimerBtn.addEventListener("click", () => {
    let hrs = Number(hours.innerText);
    let mins = Number(minutes.innerText);
    let secs = Number(seconds.innerText);

    interval = setInterval(() => {
        if(secs !== 0) {
            secs--;
            seconds.innerText = makeTwoSpaceWide(`${secs}`);
        }else if(mins !== 0){
            mins--;
            minutes.innerText = makeTwoSpaceWide(`${mins}`);
            secs = 59;
            seconds.innerText = makeTwoSpaceWide(`${secs}`);
        }else if(hrs !== 0){
            hrs--;
            hours.innerText = makeTwoSpaceWide(`${hrs}`);
            mins = 59;
            minutes.innerText = makeTwoSpaceWide(`${mins}`);
            secs = 59;
            seconds.innerText = makeTwoSpaceWide(`${secs}`);
        }else{
            clearInterval(interval);
        }
    }, 1000);
})

closeSetTimerFormBtn.addEventListener("click", () => {
    overlay.className = "hide";
})


//utility to ensure length of two
function makeTwoSpaceWide(value){
    if(value.length === 1) return "0" + value;

    return value;
}