let questions = {
    "What does HTML stand for?": 
    {
        "Hyper Text preprocessor": false,
        "Hyper Text Markup Language": true,
        "Hyper Text Mutiple Language": false,
        "Hyper Tool Multi Language": false,
    },

    "What does CSS stand for?": 
    {
        "Common Style Sheet": false,
        "Colorful Style Sheet": false,
        "Computer Style Sheet": false,
        "Cascading Style Sheet": true,
    },

    "What does PHP stand for?": 
    {
        "Hypertext Preproccessor": true,
        "Hypertext Programming": false,
        "Hypertext Preprogramming": false,
        "Hometext Preprocessor": false,
    },

    "What does SQL stand for?": 
    {
        "Stylish Question Language": false,
        "Stylish Query Language": false,
        "Statement Question Language": false,
        "Structured Query Language": true,
    },

    "What does XML stand for?": 
    {
        "eXtensible Markup Language": true,
        "eXcutable Mutiple Language": false,
        "eXTra Mutiple-Program Language": false,
        "eXamine Mutiple Language": false,
    }
}

const nextQuesBtn = document.querySelector("#next-ques");
const questionEl = document.querySelector("#question");
const answersEl = document.querySelector(".answers");

const questWapper  = document.querySelector(".question-container");

const scoreEl  = document.querySelector("#score"); 
const doneEl  = document.querySelector(".done-container"); 
const tryAgainBtn  = document.querySelector("#try-again"); 

const questTimer = document.querySelector("#timer");

let questionIndex = 0;
let questionsKeys = Object.keys(questions);
let score = 0;
let interval;

function removePreviousQuesionData(){
    const allLabels = document.querySelectorAll("label");
    allLabels.forEach(label => label.remove());
}


function renderQuestionData(currentQuesIndex){

    let question = questionsKeys[currentQuesIndex];

    questionEl.innerText = question;

    createAnswers(questions[question]);
}

function createAnswers(answerInfo){
    removePreviousQuesionData();

    let answers = Object.keys(answerInfo);

    for(let answer in answers){
        let label = document.createElement("label");

        let input = document.createElement("input");
        input.setAttribute("type", "radio");
        input.setAttribute("name", "answer");
        input.setAttribute("value", answerInfo[answers[answer]]);
        
        let span = document.createElement("span");
        span.className = "span-text";
        span.innerText = answers[answer];

        label.appendChild(input);
        label.appendChild(span);

        answersEl.appendChild(label);
    }

    addEventListenerOnToInput();

    const currentQuesNumberEl = document.querySelector("#current-test-number");
    const totalQuesNumberEl = document.querySelector("#total-numbe-text");

    currentQuesNumberEl.innerText = questionIndex + 1;
    totalQuesNumberEl.innerText = questionsKeys.length;    
}

function addEventListenerOnToInput(){
    let allWrongAnswers = document.querySelectorAll(`input[value=false]`)
    let rightAnswer = document.querySelector(`input[value=true]`)

    document.querySelectorAll("input").forEach(input => {
        input.addEventListener("click", (event) => {
            if(input["value"] === "true"){
                score++;
            }

            let parentLabel = rightAnswer.parentElement;
            parentLabel.className ="correct";
            
            allWrongAnswers.forEach(wrongAnswer => {
                let wrongAnswerParentLabel = wrongAnswer.parentElement;
                wrongAnswerParentLabel.className ="wrong";
            })

            disableAllInputs();
            clearInterval(interval);
        })   
    })
}

function disableAllInputs(){
    document.querySelectorAll("input").forEach(input => input.disabled = true);
}

nextQuesBtn.addEventListener(("click"), ()=>{
    clearInterval(interval);

    questionTimer();

    if(questionIndex === questionsKeys.length - 1){
        questWapper.className = "question-container hide";
        questionIndex = 0;

        doneEl.className = "done-container"
        scoreEl.innerText = `${score} out of ${questionsKeys.length}`;
        score = 0;

        return;
    }

    questionIndex++;

    renderQuestionData(questionIndex);
})

tryAgainBtn.addEventListener("click", () => {
    location.reload();
})

function questionTimer(){
    let count = 15;

    interval = setInterval(()=> {
        if(count > 0){
            questTimer.innerText = --count; 
        }else{
            let allWrongAnswers = document.querySelectorAll(`input[value=false]`)
            let rightAnswer = document.querySelector(`input[value=true]`)

            let parentLabel = rightAnswer.parentElement;
            parentLabel.className ="correct";
            
            allWrongAnswers.forEach(wrongAnswer => {
                let wrongAnswerParentLabel = wrongAnswer.parentElement;
                wrongAnswerParentLabel.className ="wrong";
            })

            disableAllInputs();

            questTimer.innerText = count;

            clearInterval(interval);
        } 
    }, 1000);
}


renderQuestionData(questionIndex);
questionTimer();


