const menue = document.querySelector("#menue");
const overlay = document.querySelector(".over-lay");
const closeBtn = document.querySelector("#close");

menue.addEventListener("click", () => {
    overlay.className = "over-lay"
    overlay.style.diplay = "flex";
    console.log(overlay.style.diplay)
})

closeBtn.addEventListener("click", () => {
    overlay.className = "over-lay hide"  
})