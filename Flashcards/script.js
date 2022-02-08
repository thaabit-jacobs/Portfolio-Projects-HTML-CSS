const formWrapper = document.querySelector(".flashCardsForm");
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();

    let question = form["question"].value;
    let answer = form["answer"].value;

    if(isInvalidateQues(question) && isInvalidateQues(question)){
        renderErrorMsgs("Please enter a valid question", "Please enter a valid answer")    
    }else if(isInvalidateAnswer(answer)){
        renderErrorMsgs("Please enter a valid answer");    
    }else if(isInvalidateQues(question)){
        renderErrorMsgs("Please enter a valid question");    
    }else{
        createFlashCard(question, answer);
    }

    form.reset();
})

const closeBtn = document.querySelector("#closeBtn")
closeBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    formWrapper.style.display = "none";
});

const addQuestionBtn = document.querySelector(".form-wrapper > button");
addQuestionBtn.addEventListener("click", () => {
    formWrapper.style.display = "flex";
})

function createFlashCard(question, answer){
    let flashCardDiv = document.createElement("div");
    flashCardDiv.className = "flash-card";

    let flashCardQues = document.createElement("h2");
    flashCardQues.innerText = question;
    flashCardDiv.appendChild(flashCardQues);

    let flashCardAnswer = document.createElement("p");
    flashCardAnswer.style.display = "none";
    flashCardAnswer.innerText = answer;
    flashCardDiv.appendChild(flashCardAnswer);

    let hideShownBtn = document.createElement("button");
    hideShownBtn.setAttribute("data-isHidden", "true");
    hideShownBtn.addEventListener("click", () => {
        if(hideShownBtn.getAttribute("data-isHidden") === "true"){
            flashCardAnswer.style.display = "block";
            hideShownBtn.setAttribute("data-isHidden", "false");
        }else{
            flashCardAnswer.style.display = "none";
            hideShownBtn.setAttribute("data-isHidden", "true");
        }
    })
    hideShownBtn.innerText = "Hide/Show Answer";
    flashCardDiv.appendChild(hideShownBtn);

    let btnGrp = document.createElement("btn-grp");
    btnGrp.className = "btn-grp";
    btnGrp.appendChild(createEditBtn(flashCardDiv, question));
    btnGrp.appendChild(createDeleteBtn(flashCardDiv));
    flashCardDiv.appendChild(btnGrp);

    document.querySelector(".flash-card-wrapper").appendChild(flashCardDiv);
}

function createEditBtn(flashCardDiv, question){
    let editBtn = document.createElement("button");
    editBtn.id = "edit";
    editBtn.innerText = "EDIT";
    editBtn.addEventListener("click", () => {
        const questTextArea = document.querySelector("#question");
        questTextArea.value = question;
        flashCardDiv.remove();
    })
    return editBtn;
}

function createDeleteBtn(flashCardDiv){
    let deleteBtn = document.createElement("button");
    deleteBtn.id = "delete";
    deleteBtn.innerText = "DELETE";
    deleteBtn.addEventListener("click", () => {
        flashCardDiv.remove();
    })
    return deleteBtn;
}

function isInvalidateQues(question){
    if(question.length === 0){
        return true;
    }
    return false;
}

function isInvalidateAnswer(answer){
    if(answer.length === 0){
        return true;
    }
    return false;
}

function renderErrorMsgs(...errorMsg){
    const errorWrapper = document.querySelector(".error-wrapper");
    errorWrapper.style.display = "block";

    let allErrorMsgs = document.querySelectorAll("p");

    if(allErrorMsgs.length !== 0){
        allErrorMsgs.forEach(node => node.remove());
    }

    errorMsg.forEach(msg => {
        let errorMsgEl = document.createElement("p");
        errorMsgEl.innerText = msg;
        errorWrapper.appendChild(errorMsgEl);
    })
    
    setTimeout(() => {
        errorWrapper.style.display = "none";
    },2000);
}