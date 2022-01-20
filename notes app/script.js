/*let keysPressed = {};

document.addEventListener('keydown', (event) => {
keysPressed[event.key] = true;

if (keysPressed['Control'] && event.key == 'a') {
    alert(event.key);
}
});

document.addEventListener('keyup', (event) => {
    delete keysPressed[event.key];
});

const btn = document.querySelector("#click"); 

btn.addEventListener("dblclick", (event) => {
    console.log("hello world")
})
*/


///////////////textearea///////////////
textarea = document.querySelector("textarea");
textarea.addEventListener('input', autoResize, false);

function autoResize() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
}

///////////////save heading and text///////////////
let keysPressed = {};
let displayHead = document.querySelector(".container-heading");
let displayText = document.querySelector(".container-text");

displayHead.value = "A Sample Note";

window.addEventListener("keydown", (event) => {
    keysPressed[event.key] = true;
    
    if (keysPressed['Alt'] && (event.key == 's' || event.key == 'S')) {
        console.log(displayHead.value);
        console.log(displayText.value);
    }
})

window.addEventListener('keyup', (event) => {
    delete keysPressed[event.key];
});

///////////////selected note event listener ///////////////
let notes = document.querySelectorAll(".note");
notes.forEach(note => {
    note.addEventListener("click", (event) => {

    })
})