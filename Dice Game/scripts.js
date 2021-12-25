const rollBtn = document.querySelector("#roll");
const pOneDieImg = document.querySelector("#p1");
const pTwoDieImg = document.querySelector("#p2");
const roundResult = document.querySelector("#round-result"); 

function rollDice(){
    let min = Math.ceil(1);
    let max = Math.floor(7);
    return Math.floor(Math.random() * (max - min) + min);
}

function getDieImg(dieValue){
    let baseUrl = "images/";

    if(dieValue === 1){
        return `${baseUrl}${1}.png` 
    }else if(dieValue === 2){
        return `${baseUrl}${2}.png`
    }else if(dieValue === 3){
        return `${baseUrl}${3}.png`
    }else if(dieValue === 4){
        return `${baseUrl}${4}.png`
    }else if(dieValue === 5){
        return `${baseUrl}${5}.png`
    }else {
        return `${baseUrl}${6}.png`
    }
}

function setImgForPlayer(player, imgUrl){
    if(player === "p1"){
        pOneDieImg.setAttribute("src", imgUrl)
    }else{
        pTwoDieImg.setAttribute("src", imgUrl)
    }
}

function results(p1Roll, p2Roll){
    if(p1Roll > p2Roll){
        return "Player 1 wins!!!"
    }else if(p1Roll < p2Roll){
        return "Player 2 wins!!!"
    }else{
        return "Draw!!!"
    }
}

rollBtn.addEventListener("click", (event) => {
    let playerOneRoll = rollDice(); 
    let playerTwoRoll = rollDice();

    let p1DieImg = getDieImg(playerOneRoll);
    let p2DieImg = getDieImg(playerTwoRoll);

    setImgForPlayer("p1", p1DieImg);
    setImgForPlayer("p2", p2DieImg);

    let result = results(playerOneRoll, playerTwoRoll);

    roundResult.innerText = result;   
})


