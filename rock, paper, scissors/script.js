const playerScore = document.querySelector("#player-score");
const computerScore = document.querySelector("#computer-score");

const rockBtn = document.querySelector("#rock");
const paperBtn = document.querySelector("#paper");
const scissorsBtn = document.querySelector("#scissor");

const imgContainer = document.querySelector(".img-container");

const winner = document.querySelector("#winner");

const allBtns = document.querySelectorAll("button");

let movesImgObj = {
    rock: "images/rock.svg", 
    paper: "images/paper.svg",
    scissors: "images/scissors.svg"
};

let playerMove = "";

allBtns.forEach(btn => {
    btn.addEventListener("click", (event) => {
        playerMove = btn.getAttribute("data-move");
        
        imgContainer.className = "img-container animate";

        setTimeout(()=>{
            imgContainer.className = "img-container";

            let comMove = comMoveSelector();

            setImgs(playerMove, comMove);

            round(playerMove, comMove);
        }, 1200);
    })
})

function setImgs(playerMove, comMove){
    const playerImg = document.querySelector("#player-move");
    const comImg = document.querySelector("#computer-move");

    playerImg.setAttribute("src", `images/${playerMove}.svg`);
    comImg.setAttribute("src", `images/${comMove}.svg`);
}

function playerWins(){
    let currentScore = Number(playerScore.innerText);
    playerScore.innerText = ++currentScore;

    winner.innerText = "Player wins";
}

function comWins(){
    let currentScore = Number(computerScore.innerText);
    computerScore.innerText = ++currentScore;

    winner.innerText = "Computer wins";
}

function draw(){
    winner.innerText = "Draw";
}

function comMoveSelector(){
    const moves = ["rock", "paper", "scissors"];

    let min = 0;
    let max = moves.length;

    return moves[Math.floor(Math.random() * (max - min) + min)];
}

function round(playerMove, computerMove){
    
    if(playerMove === "rock" && computerMove === "scissors"){
        playerWins();
    }
    
    if(playerMove === "rock" && computerMove === "paper"){
        comWins();
    }
    
    if(playerMove === "rock" && computerMove === "rock"){
        draw();
    }

    if(playerMove === "paper" && computerMove === "scissors"){
        comWins();
    }

    if(playerMove === "paper" && computerMove === "paper"){
        draw();
    }

    if(playerMove === "paper" && computerMove === "rock"){
        playerWins();
    }

    if(playerMove === "scissors" && computerMove === "rock"){
        comWins();
    }

    if(playerMove === "scissors" && computerMove === "paper"){
        playerWins();
    }

    if(playerMove === "scissors" && computerMove === "scissors"){
        draw();
    }
}