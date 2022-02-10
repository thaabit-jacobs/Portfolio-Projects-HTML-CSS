const coin = document.querySelector("img");

const buttons = document.querySelectorAll("button");
buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        let selectedPlayerMove = btn.getAttribute("data-type");
        selectPlayerMove(selectedPlayerMove);

        let selectedComputerMove = selectComMove();

        let count = 0;
        let interval = setInterval(() => {
            if(count === 5){
                determineWinner(selectedPlayerMove, selectedComputerMove);
                clearInterval(interval);
                return;
            }

            if(coin.getAttribute("src") === "images/heads.svg"){
                coin.setAttribute("src", "images/tails.svg");
            }else{
                coin.setAttribute("src", "images/heads.svg");
            }
            ++count;
        }, 500);
    })
})

function selectComMove(){
    let selectedMove = coinFlip();

    const comOneSelected = document.querySelector("#comOneSelected");
    comOneSelected.innerText = selectedMove; 

    return selectedMove;
}

function coinFlip(){
    let moves = ["heads", "tails"];

    let min = Math.ceil(0);
    let max = Math.floor(2);

    return moves[Math.floor(Math.random() * (max - min) + min)];
}

function selectPlayerMove(move){
    const playerOneSelected = document.querySelector("#playerOneSelected");
    playerOneSelected.innerText = move; 
}

function determineWinner(playerMove, comMove){
    const playerOneScore = document.querySelector("#playerOneScore");
    const computerScore = document.querySelector("#computerScore");

    let coin = coinFlip();

    updateCoinImg(coin);

    console.log(coin);

    if(playerMove === coin){
        updateScore(playerOneScore)
    }
    
    if(comMove === coin){
        updateScore(computerScore);
    }
}

function updateScore(scoreElement){
    let currentScore = Number(scoreElement.innerText);
    scoreElement.innerText = ++currentScore; 
}

function updateCoinImg(move){
    coin.setAttribute("src", `images/${move}.svg`);
}