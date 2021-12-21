const tipForm = document.querySelector("#tip-form");

const totalBill = tipForm["total-bill"];
const peopleSharing = tipForm["people-sharing"];
const waiterTip = tipForm["waiter-tip"];

const errors = document.querySelector("#errors");

const submitBtn = document.querySelector("#submit");

const INVALID_BILL_ERROR = "Please enter valid bill total";
const INVALID_PEOPLE_SHARING_ERROR = "Please enter valid people sharing total";
const INVALID_TIP_ERROR_ERROR = "Please select tip amount";

const tipPriceMap = {
    "great" : 20,
    "good" : 10,
    "bad" : 2
}

function isValidAmount(input){
    if(input.value <= 0 || input.value === "0"){
        return false;
    }

    return true;
}

function isValidTip(input){
    if(input.value === "...")return false;

    return true;
}

function addToErrors(errorMsg){
    let newErrorMsgChild = document.createElement("p");
    newErrorMsgChild.innerText = errorMsg;
    errors.appendChild(newErrorMsgChild);
}

function clearErrors(){
    errors.querySelectorAll("p").forEach(p => p.remove())
}

function errorHandler(){

    if(errors.querySelectorAll("p").length === 0){

        if(!isValidAmount(totalBill)){
            addToErrors(INVALID_BILL_ERROR);
        }
    
        if(!isValidAmount(peopleSharing)){
            addToErrors(INVALID_PEOPLE_SHARING_ERROR)
        }
    
        if(!isValidTip(waiterTip)){
            addToErrors(INVALID_TIP_ERROR_ERROR)
        }

        setTimeout(clearErrors, 5000);

        return true
    }

    return false
}

function calculateTip(bill, tip){
    
    return bill * tip/100;
}

function calculateTotalBill(bill, tip){
    let totalBill = Number(bill) + Number(calculateTip(bill, tip));

    return totalBill;
}

function calculateEachPersonShare(totalBill, numberOfPeople){
    return totalBill / numberOfPeople;
}

function generateBill(bill, tip, people){
    const billTotal = document.querySelector("#bill-total");
    
    let tipAmount = `Tip amount: $${calculateTip(bill, tip)}`;
    let personShare = `Person sharing amount: $${calculateEachPersonShare(calculateTotalBill(bill, tip), people)}`;
    let totalBill = `Total bill: $${calculateTotalBill(bill, tip)}`;

    let billItemTip = document.createElement("p");
    billItemTip.innerText = tipAmount;

    let billItemPeopleShare = document.createElement("p");
    billItemPeopleShare.innerText = personShare;

    let billItemTotalBill = document.createElement("p");
    billItemTotalBill.innerText = totalBill
    
    if(errors.querySelectorAll("p").length === 0 && billTotal.querySelectorAll("p").length === 0){
        billTotal.appendChild(billItemTip);
        billTotal.appendChild(billItemPeopleShare);
        billTotal.appendChild(billItemTotalBill);

        setTimeout(() => {
            billTotal.querySelectorAll("p").forEach(p => p.remove())
        }, 5000)
    }
}

tipForm.addEventListener("submit", (event) => {
    event.preventDefault();

    errorHandler();

    if(errors.querySelectorAll("p").length === 0){
        const loader = document.querySelector("#loader");
        loader.className = "loader";

        setTimeout(() => {
            loader.className = "hide";
            generateBill(totalBill.value, tipPriceMap[waiterTip.value.toLowerCase()] , peopleSharing.value)
        }, 5000)
    
        setTimeout(() => {
            tipForm.reset();
        }, 6000)
    }

} )