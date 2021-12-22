const allBtns = document.querySelector("#caculator-btns");

const historyDisplayElement = document.querySelector("#history");
const currrentDisplayElement = document.querySelector("#current");
const answerDisplayElement = document.querySelector("#answer");

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
    }else{
        let operatorInHistory = historyDisplayText[historyDisplayText.length-1];
        let num1 = historyDisplayText.substring(0, historyDisplayText.indexOf(operatorInHistory));
        let num2 = currentDisplay.innerText;

        let result = performCalculation(num1, num2, operator);

        historyDisplay.innerText = result + "" + operator;
        currentDisplay.innerText = 0;
    }
}

let operatorArr = ["+", "-", "X", "/", "%"];
let numbersArr = ["1", "2", "3", "4", "5", "6" , "7" ,"8" ,"9"]

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
        });

    })
}

addEventListenersToBtns(allBtns);
