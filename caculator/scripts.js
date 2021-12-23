const allBtns = document.querySelector("#caculator-btns");

const historyDisplayElement = document.querySelector("#history");
const currrentDisplayElement = document.querySelector("#current");
const answerDisplayElement = document.querySelector("#answer");

let operatorArr = ["+", "-", "X", "/"];
let numbersArr = ["1", "2", "3", "4", "5", "6" , "7" ,"8" ,"9", "0"];

function addDigitToCurrent(digit, currentDisplay){
    let currentDisplayCurrentText = currentDisplay.innerText;

    if(currentDisplayCurrentText === "0"){
        currentDisplay.innerText = digit;
    }else {
        currentDisplayCurrentText += digit;
        currentDisplay.innerText = currentDisplayCurrentText; 
    }
}


//ADDS CURRENT TEXT TO HISTORY IF IT ZERO
function addCurretTextToHistory(currentDisplay, historyDisplay){
    let currentDisplayText = currentDisplay.innerText;
    let historyDisplayText = historyDisplay.innerText;

    if(historyDisplayText === "0"){
        historyDisplay.innerText = currentDisplayText;
        currentDisplay.innerText = 0;
    }
}

function performCalculation(num1, num2, operator){
    if(operator === "+"){
        return Number(num1) + Number(num2);
    }else if(operator === "-"){
        console.log(operator)
        return Number(num1) - Number(num2);
    }else if(operator === "X"){
        return Number(num1) * Number(num2);
    }else if(operator === "/"){
        return Number(num1) / Number(num2);
    }else{
        return 1000000000;
    }
}


function addOperatorToHistory(operator, historyDisplay, currentDisplay){
    let historyDisplayText = historyDisplay.innerText;

    let lastElementInDisplayText = historyDisplayText[historyDisplayText.length-1];

    if(!operatorArr.includes(lastElementInDisplayText)){
            historyDisplay.innerText = historyDisplayText + operator;
    }else if(operatorArr.includes(lastElementInDisplayText) && currentDisplay.innerText === "0"){
        historyDisplay.innerText = historyDisplayText.substring(0, historyDisplayText.length-1) + operator; 
    }else{
        let operatorInHistory = historyDisplayText[historyDisplayText.length-1];
        let num1 = historyDisplayText.substring(0, historyDisplayText.indexOf(operatorInHistory));
        let num2 = currentDisplay.innerText;

        let result = performCalculation(num1, num2, operatorInHistory);

        historyDisplay.innerText = result + "" + operator;
        currentDisplay.innerText = 0;
    }
}

function deleteEntry(currentDisplay){
    let currentDisplayText = currentDisplay.innerText;

    if(currentDisplayText.length !== 0 || currentDisplayText !== "0"){
        currentDisplayText = currentDisplayText.substring(0, currentDisplayText.length -1)
        currentDisplay.innerText = currentDisplayText;

        currentDisplayText = currentDisplay.innerText;

        if(currentDisplayText.length === 0){
            currentDisplay.innerText = "0";
        }
    }
}

function deleteaLL(currentDisplay, historyDisplay){
    currentDisplay.innerText = "0";
    historyDisplay.innerText = "0";
}

function equate(currentDisplay, historyDisplay){
    let historyDisplayText = historyDisplay.innerText;
    let currentDisplayText = currentDisplay.innerText;

    let operatorInHistory = historyDisplayText.substring(historyDisplayText.length-1);

    if(operatorArr.includes(operatorInHistory)){
        let num1 = Number(historyDisplayText.substring(0, historyDisplayText.indexOf(operatorInHistory)));
        let num2 = Number(currentDisplay.innerText);

        let result = performCalculation(num1, num2, operatorInHistory);

        historyDisplay.innerText = result;
        currentDisplay.innerText = "0";
    }
}

function addDecimal(currentDisplay){
    let currentDisplayText = currentDisplay.innerText;

    if(currentDisplayText.indexOf(".") === -1){
        currentDisplay.innerText = currentDisplayText + ".";
    }
}

function percent(currentDisplay, historyDisplay){
    let historyDisplayText = historyDisplay.innerText;
    let operatorInHistory = historyDisplayText.substring(historyDisplayText.length-1);

    let currentDisplayText = currentDisplay.innerText;

    if(operatorArr.includes(operatorInHistory)){
        if(currentDisplayText.length > 2) {
            let length = currentDisplayText.length;

            let newDisplayText = currentDisplayText.substring(0, length -2) + "." + currentDisplayText.substring(length -2);
            
            currentDisplay.innerText = newDisplayText;
        }   else {
            if(currentDisplayText.length === 1){
                currentDisplay.innerText = `0.0${currentDisplayText}`;
            }else {
                currentDisplay.innerText = `0.0${currentDisplayText}`;
            }
        }     
    }else {
        currentDisplay.innerText = "0";
    }
}

 function addEventListenersToBtns(allBtnsElement){
    allBtnsElement.querySelectorAll(".btn")
    .forEach(button => {
        let btnInnerText = button.innerText;

        button.addEventListener("click", (event) => {
            let clickElement = event.target.innerText; 
            
            if(numbersArr.includes(clickElement)){
                addDigitToCurrent(clickElement, currrentDisplayElement);
            }

            if(operatorArr.includes(clickElement)){
                addCurretTextToHistory(currrentDisplayElement, historyDisplayElement);
                addOperatorToHistory(clickElement, historyDisplayElement, currrentDisplayElement);
            }

            if(clickElement === "CE"){
                deleteEntry(currrentDisplayElement);
            }

            if(clickElement === "C"){
                deleteaLL(currrentDisplayElement, historyDisplayElement);
            }

            if(clickElement === "="){
                equate(currrentDisplayElement, historyDisplayElement);
            }

            if(clickElement === "."){
                addDecimal(currrentDisplayElement);
            }

            if(clickElement === "%"){
                percent(currrentDisplayElement, historyDisplayElement);
            }
        });

    })
}

addEventListenersToBtns(allBtns);
