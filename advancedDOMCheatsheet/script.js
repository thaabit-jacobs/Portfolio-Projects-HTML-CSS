const button = document.querySelector("#button")
const btnContainer = document.querySelector("#btn-container");

//innerText
//Updates the text inside of an element i.e

/*
button.addEventListener("click", () => {
    button.innerText = "You clicked me !!!";
})
*/

//innerHtml
//Updates the text and what ever element you passed of the slected elemtn  i.e

/*
button.addEventListener("click", () => {
    button.innerHTML = "<b>You clicked me !!!</b>";
})
*/

//creating lements;
let randomDiv = document.createElement("div");

///append allows for appending of nodes and text
//randomDiv.append(randomDiv);
//randomDiv.append("Hello");

///preappend allows for appending of nodes before said element
//randomDiv.prepend(randomDiv);

//remove elements require reference to element
//randomDiv.remove()

//event listerners 
//add third argument to event listerners to have it only fire once
/*
button.addEventListener("click", () => {
    alert("One time click")
}, {once: true})
*/

//Event bubbling and Event Capturing
//Event bubbling happens when we have evnt listerner on the child as well as the parent
// and when the child event listener is triggered the parent event listener is automatically 
//triggered
//Event Capturing is the opposite of event bubbling
//To Activate event capturing we use the third when definig a listerner and set it to true

//event bubbling

/*
btnContainer.addEventListener("click", ()=>{
    alert("from btnContainer")
})

button.addEventListener("click", ()=>{
    alert("from button")
})
*/

//event capturing
/*
btnContainer.addEventListener("click", ()=>{
    alert("from btnContainer")
}, true, {capture: true})

button.addEventListener("click", ()=>{
    alert("from button")
}, {capture: true})
*/

//prevent event bubbling
btnContainer.addEventListener("click", (event)=>{
    alert("from btnContainer")
})

button.addEventListener("click", (event)=>{
    event.stopPropagation()
    alert("from button")
})
