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

let keysPressed = {};
let displayHead = document.querySelector("input");
let displayText = document.querySelector(".note-display-container-text");

window.addEventListener("keydown", (event) => {
    keysPressed[event.key] = true;
    
    if (keysPressed['Alt'] && event.key == 's') {
        console.log(displayHead.value);
        console.log(displayText.value);
    }
})

window.addEventListener('keyup', (event) => {
    delete keysPressed[event.key];
});

textarea = document.querySelector("textarea");

/*
textarea.addEventListener('input', autoResize, false);

function autoResize() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
}

let notes = document.querySelectorAll(".note");
notes.forEach(note => {
    note.addEventListener("click", (event) => {

    })
})
*/