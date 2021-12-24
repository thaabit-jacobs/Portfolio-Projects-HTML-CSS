const moveableArea = document.querySelector("#moveable-area");
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

function removeLastInstruction(){
    let lastElement = instructionsContainer.lastChild; 
    
    if(lastElement !== null){
        lastElement.remove();
        setTimeout(removeLastInstruction, 1000); 
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