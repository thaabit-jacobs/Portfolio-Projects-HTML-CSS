const moveableArea = document.querySelector("#moveable-area");
const movableObject =document.querySelector("#movable-object");
const instructionsContainer = document.querySelector("#instructions-container");
const directionalKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
let instructionsQeue = [];

function createInstructionContainer(instruction){
    let container = document.createElement("div");

    container.className = "instruction";
    container.innerText = " + " +instruction;

    return container;
}

function appendInstructionToInstructionContainer(InstructionElement, instructionsContainerElement){
    instructionsContainerElement.appendChild(InstructionElement);

    return InstructionElement;
}

function removeArrowFromPressedKey(key){
    let keyWithoutArrow = key.substring(key.indexOf("w") + 1);

    return keyWithoutArrow;
}

function addClickEventToInstruction(instructionElement){
    instructionElement.addEventListener("click", (event) => {
        instructionElement.remove();
    })

    return true;
}

function shiftMoveableUp(){
    let rect = movableObject.getBoundingClientRect();
    movableObject.style.top = rect.top - rect.height + "px"; 
}

function shiftMoveableDown(){
    let rect = movableObject.getBoundingClientRect();
    movableObject.style.top = rect.top + rect.height + "px"; 
}

function shiftMoveableLeft(){
    let rect = movableObject.getBoundingClientRect();
    movableObject.style.left = rect.left - rect.width + "px"; 
}

function shiftMoveableRight(){
    let rect = movableObject.getBoundingClientRect();
    movableObject.style.left = rect.left + rect.width + "px"; 
}

function removeLastInstruction(){
    let lastElement = instructionsContainer.lastChild; 
    
    if(lastElement !== null){
        let instruction = lastElement.innerText.replace("+", "");
        movableObject.innerText = `Move: ${instruction}` 
        lastElement.remove();
  
        instruction = instruction.trim()

        if(instruction === 'Left'){
            console.log("in left")
            shiftMoveableLeft();
        }

        if(instruction === 'Right'){
            console.log("in right")
            shiftMoveableRight();
        }

        if(instruction === 'Down'){
            console.log("in down")
            shiftMoveableDown();
        }

        if(instruction === 'Up'){
            console.log("in up")
            shiftMoveableUp();
        }

        setTimeout(removeLastInstruction, 500); 
    }
}

window.addEventListener("keydown", (event) => {
    let selectedKey = event.key;
    let flagShouldContinue = true; 
    
    if(directionalKeys.includes(selectedKey)){
        let newInstruction = createInstructionContainer(removeArrowFromPressedKey(selectedKey));
        newInstruction = appendInstructionToInstructionContainer(newInstruction, instructionsContainer);

        addClickEventToInstruction(newInstruction);
    }
  
    
    if(selectedKey === "Enter"){
        removeLastInstruction(instructionsContainer);
    }

})