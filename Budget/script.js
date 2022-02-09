const budgetValueEl = document.querySelector("#budgetValue");
const exoenseValueEl = document.querySelector("#expenseValue");
const balanceValueEl = document.querySelector("#balanceValuee");

const budgetForm = document.querySelector("#budget");
budgetForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let budgetValue = budgetForm["budgetAmount"].value;
    setBudgetValue(budgetValue);

    setBalanceValue();

    budgetForm.reset();
})

const expenseForm = document.querySelector("#expense");
expenseForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let expenseName = expenseForm["expenseName"].value;
    let expenseAmount = expenseForm["expenseAmount"].value;

    setExpenseValue(expenseAmount);
    setBalanceValue();

    createExpenseRow(expenseName, expenseAmount);

    expenseForm.reset();
})

function setBudgetValue(value){
    budgetValueEl.innerText = strTemplate(value);
}

function setBalanceValue(){
    let balance = Number(extractValueFromInnerText(budgetValueEl.innerText)) - Number(extractValueFromInnerText(exoenseValueEl.innerText))

    balanceValueEl.innerText = strTemplate(balance);
    
    if(balance > 0) 
        balanceValueEl.className = "green";
    else
        balanceValueEl.className = "red";

}

function setExpenseValue(value){
    let currentExpenseValue = extractValueFromInnerText(exoenseValueEl.innerText);
    let total =  currentExpenseValue + Number(value);
    exoenseValueEl.innerText = strTemplate(total);
}

function createExpenseRow(expenseName, expenseAmount){
    const table = document.querySelector("table");

    let tr = document.createElement("tr");

    let tdName = document.createElement("td");
    tdName.innerText = expenseName;
    tr.appendChild(tdName);

    let tdAmount = document.createElement("td");
    tdAmount.innerText = strTemplate(expenseAmount);
    tr.appendChild(tdAmount);

    let iconGroup = document.createElement("div");
    iconGroup.className = "icon-group";

    let deleteImg = document.createElement("img");
    deleteImg.setAttribute("src", "img/trash.svg");
    deleteImg.addEventListener("click", (event) => {
        event.stopPropagation();
        deleteExpense(tr, expenseAmount);
    });
    iconGroup.appendChild(deleteImg);

    let editImg = document.createElement("img");
    editImg.setAttribute("src", "img/edit.svg");
    editImg.addEventListener("click", (event) => {
        event.stopPropagation();
        editExpense(tr, expenseName, expenseAmount);
    });
    iconGroup.appendChild(editImg);

    tr.appendChild(iconGroup);

    table.appendChild(tr);
}

function deleteExpense(tr, expenseAmount){
    tr.remove();
    
    updateExpenseValue(expenseAmount)

    setBalanceValue();
}

function editExpense(tr, expenseName, expenseAmount){
    tr.remove();
    
    updateExpenseValue(expenseAmount)

    setBalanceValue();

    expenseForm["expenseName"].value = expenseName;
    expenseForm["expenseAmount"].value = expenseAmount;
}

function updateExpenseValue(expenseAmount){
    let currentExpenseValue = extractValueFromInnerText(exoenseValueEl.innerText);
    let total =  currentExpenseValue - Number(expenseAmount);
    exoenseValueEl.innerText = strTemplate(total);
}

function extractValueFromInnerText(innerText){
    return Number(innerText.substring(innerText.indexOf("$") + 1));
}

function strTemplate(value){
    return `$${Math.round(value * 100) / 100}`;
}

function isValidateExpenseName(name){
    if(name.length > 0) return true;

    return false;
}
