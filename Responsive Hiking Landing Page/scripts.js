const hamburger  = document.querySelector("#hamburger");

let toggle = false;

hamburger.addEventListener("mouseover", (event) => {
    let ham =  document.createElement("div");
    ham.id = "hamburger-window";

    document.querySelector("header").appendChild(ham);
})