//create a fnction to gernrate a new roadline evey interval
//create a function that moves roadlines down the road interval
//check if roadline is off the road and remove if true
const road = document.querySelector("#road");
const playerCar = document.querySelector("#player-car");
const score = document.querySelector("#score");
const gameOver = document.querySelector("#game-over");

let currentScore = 0;
let roadLineInterval;
let enemyCarInterval;

function updateScore(currentScore) {
    score.innerText = `Score: ${currentScore}`;
    return score;
}

function createRoadLine() {
    let roadLine = document.createElement("div");
    roadLine.className = "road-line";

    return roadLine;
}

function addNewRoadLineToRoad(roadLine) {
    return road.appendChild(roadLine);
}

function roadLineAnimation() {
    let interval = setInterval(() => addNewRoadLineToRoad(createRoadLine()), 50);
}

function moveRoadLine(roadLine) {
    roadLine.style.top = Number(roadLine.style.top.replace("px", "")) + 1 + "px";
    return roadLine;
}

function roadLineAnimation() {
    const roadLines = document.querySelectorAll(".road-line");


    roadLines.forEach(roadLine => {
        moveRoadLine(roadLine);

        if (roadLine.style.top === "150px") {
            addNewRoadLineToRoad(createRoadLine());
        }

        if (roadLine.style.top === "520px") {
            roadLine.remove();
        }
    })

}

function collisionDetection(){
    let payerCurrentPosition = playerCar.getBoundingClientRect();
    let enemyCars = document.querySelectorAll(".enemy");

    enemyCars.forEach(enemyCar => {
        let enemyCarCurretnPosition = enemyCar.getBoundingClientRect();

        if(!((playerCar.getBoundingClientRect().bottom < enemyCarCurretnPosition.top) || (playerCar.getBoundingClientRect().top > enemyCarCurretnPosition.bottom)
        || (playerCar.getBoundingClientRect().right < enemyCarCurretnPosition.left) || (playerCar.getBoundingClientRect().left > enemyCarCurretnPosition.right))){

            console.log("HIT!!!");
            clearInterval(roadLineInterval);
            clearInterval(enemyCarInterval);

            gameOver.className = "";
            gameOver.innerText = "Game Over"
        }
    })
}

function movePlayerCar(direction) {
    direction = direction.replace("Arrow", "");

    function convertToNumber(val) {
        return Number(val.replace("px", ""));
    }

    let movementSpeed = 10;

    if (direction === "Up") {
        if(convertToNumber(playerCar.style.top) !== 0){
            playerCar.style.top = convertToNumber(playerCar.style.top) - movementSpeed + "px";
        }
    }

    if (direction === "Down") {
        if(convertToNumber(playerCar.style.top) !== 540){
            playerCar.style.top = convertToNumber(playerCar.style.top) + movementSpeed + "px";
        }
    }

    //0
    if (direction === "Left") {
        if(convertToNumber(playerCar.style.left) !== 0) {
            playerCar.style.left = convertToNumber(playerCar.style.left) - movementSpeed + "px";
        }
    }

    //329
    if (direction === "Right") {
        if(convertToNumber(playerCar.style.left) !== 400) {
            playerCar.style.left = convertToNumber(playerCar.style.left) + movementSpeed + "px";
        }
    }

    collisionDetection();
}

function createEnemyCar(){
    let enemyColors = ["red", "blue", "green"];
    let randomEnemyColor = enemyColors[Math.floor(Math.random() * (3 - 0) + 0)];
    let appearanceLocation = [["10px", "10px"], ["25px", "190px"], ["35px", "280px"]]
    let locations = appearanceLocation[Math.floor(Math.random() * (3 - 0) + 0)];

    let enemyCarDiv = document.createElement("div");
    enemyCarDiv.className = `car ${randomEnemyColor} enemy`;

    enemyCarDiv.style.top =  locations[0];
    enemyCarDiv.style.left =  locations[1];

    return road.appendChild(enemyCarDiv);
}

function moveEenemyCar(enemyCar) {
    enemyCar.style.top = Number(enemyCar.style.top.replace("px", "")) + 1 + "px";
    return enemyCar;
}

function enemyCarAnimation() {
    const enemyCars = document.querySelectorAll(".enemy");

    enemyCars.forEach(enemy => {
        moveEenemyCar(enemy);

        if (enemy.style.top === "200px") {
            createEnemyCar();
        }

        if (enemy.style.top === "500px") {
            enemy.remove();
        }
    })

    updateScore(++currentScore);
}

window.addEventListener("keydown", (event) => {
    let selectedKey = event.key;


    if(selectedKey === "Enter"){
        roadLineInterval = setInterval(roadLineAnimation, 1);
        enemyCarInterval =  setInterval(enemyCarAnimation, 10);
    }

    movePlayerCar(selectedKey)
})