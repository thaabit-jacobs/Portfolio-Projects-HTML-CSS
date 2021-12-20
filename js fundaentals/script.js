const heading = document.querySelector("h1");
heading.innerText = "Hello Thaabit";

console.log(heading);

const allListItems = document.querySelectorAll("ul li");

for(let i = 0; i < allListItems.length; i++){
    const listItem = allListItems[i];
    listItem.innerText = "Thaabit"
}

const ulElement = document.querySelector("ul");

const incrementBtn = document.querySelector("#incrementBtn");
const decrementBtn = document.querySelector("#decrementBtn");


let counter = 0;

function createLi(currentCounterValue){
    const newLi =  document.createElement("li");
    newLi.setAttribute("data-counter", currentCounterValue);
    
    newLi.innerHTML =  `<p>Added when count was ${currentCounterValue}</p>`
    return  newLi;
}

incrementBtn.addEventListener("click", () => {
    counter++;

    const counterElement = document.querySelector("#counter");
    counterElement.innerText = counter;

    const newLi =  createLi(counter)

    if(counter % 2 === 0) {
        newLi.setAttribute("class", "blue");    
    }else {
        newLi.setAttribute("class", "red");
    }

    let ulElement = document.querySelector("ul");

    ulElement.appendChild(newLi);
})

decrementBtn.addEventListener("click", () => {
    const counterElement = document.querySelector("#counter");
    counterElement.innerText = counter;

    let ulElement = document.querySelector("ul");
     const li = ulElement.querySelector('[data-counter="'+counter+'"]')
     console.log(li);
     li.remove()

     counter--;
})