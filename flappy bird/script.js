let topPipe = document.querySelector(".top-pipe");
let bottomPipe = document.querySelector(".bottom-pipe");
let gameArea = document.querySelector("#game-area");
let player = document.querySelector("#player");
let isRunning = true;

let intervalForPipeCreation = 0;

function createPipesLength(){
    let possibleLengths = [
        ["420px", "80px"], ["80px", "420px"], ["255px", "255px"],
        ["180px", "330px"], ["330px", "180px"], ["155px", "355px"], 
        ["355px", "155px"]
    ];

    function randomLength(){
        let min = 0
        let max = possibleLengths.length;

        let result = Math.floor(Math.random() * (max - min) + min);
      
        return result
    }

    return possibleLengths[randomLength()];
}

//setting initial left properties but wait lets do it programmtically (maybe)
topPipe.style.left = "1432px";
bottomPipe.style.left = "1432px";


//setting player initial left properties
player.style.bottom = "320px";
player.style.left = "100px";

function createPipes(){
    let lengths = createPipesLength();
    let topLenght = lengths[0];
    let bottomLength = lengths[1];


    let topPipe = document.createElement("div");
    topPipe.className = "top-pipe pipe";
    topPipe.style.height = topLenght;
    topPipe.style.left = "1432px";

    let bottomPipe = document.createElement("div");
    bottomPipe.className = "bottom-pipe pipe";
    bottomPipe.style.height = bottomLength;
    bottomPipe.style.left = "1432px";

    gameArea.appendChild(topPipe);
    gameArea.appendChild(bottomPipe);
}

//get back to this later
function collisionDetection(){
    let payerCurrentPosition = player.getBoundingClientRect();
    let pipes = document.querySelectorAll(".pipe");

    pipes.forEach(pipe => {
        let pipeCarCurretnPosition = pipe.getBoundingClientRect();

        if(!((payerCurrentPosition.bottom < pipeCarCurretnPosition.top) || (payerCurrentPosition.top > pipeCarCurretnPosition.bottom)
        || (payerCurrentPosition.right < pipeCarCurretnPosition.left) || (payerCurrentPosition.left > pipeCarCurretnPosition.right)) || 
            Number(player.style.bottom.replace("px", "")) <= 0){

            isRunning = false;
        }
    })
}

function movePlayer(){
    player.style.bottom = Number(player.style.bottom.replace("px", "")) + 20 + "px";
}

function playerFall(){
    player.style.bottom = Number(player.style.bottom.replace("px", "")) - 1 + "px";
}

let keyDownLstener = function(event){
    let selectedKey = event.key.replace("Arrow", "");

    if(selectedKey === "Up"){
        movePlayer()
    }

    if(selectedKey === "Enter"){
        window.location.reload(true);
    }
}


function animatePipes(timestamp){

    playerFall()

    window.addEventListener("keydown", keyDownLstener);

    collisionDetection()

    if(++intervalForPipeCreation % 300 === 0) createPipes();

    let allPipes = document.querySelectorAll(".pipe");

    allPipes.forEach(pipe => {
        pipe.style.left = Number(pipe.style.left.replace("px", "")) - 2 + "px";

        if(pipe.style.left === "2px") pipe.remove();
    })


    if(isRunning){
        requestAnimationFrame(animatePipes);
    }
}

window.requestAnimationFrame(animatePipes)
