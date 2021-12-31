let topPipe = document.querySelector(".top-pipe");
let bottomPipe = document.querySelector(".bottom-pipe");
let gameArea = document.querySelector("#game-area");

let xPos = 0;
let intervalForPipeCreation = 0;

function createPipesLength(){
    let possibleLengths = [
        ["440px", "100px"], ["100px", "440px"], ["275px", "275px"],
        ["200px", "350px"], ["350px", "200px"], ["175px", "375px"], 
        ["375px", "175px"]
    ];

    function randomLength(){
        let min = 0
        let max = possibleLengths.length;

        let result = Math.floor(Math.random() * (max - min) + min);
      
        return result
    }

    return possibleLengths[randomLength()];
}

//setting initial left properties but wait lets do it programmtically
topPipe.style.left = "1432px";
bottomPipe.style.left = "1432px";

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


function animatePipes(timestamp){
    xPos += 1;

    if(++intervalForPipeCreation % 200 === 0) createPipes();

    let allPipes = document.querySelectorAll(".pipe");

    allPipes.forEach(pipe => {
        pipe.style.left = Number(pipe.style.left.replace("px", "")) - 2 + "px";

        if(pipe.style.left === "2px") pipe.remove();
    })

    //let gameAreaWindowLimit = gameArea.clientWidth - 90;
    //console.log(gameAreaWindowLimit);

    if(true){
        requestAnimationFrame(animatePipes);
    }
}

window.requestAnimationFrame(animatePipes)