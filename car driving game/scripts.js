//create a fnction to gernrate a new roadline evey interval
//create a function that moves roadlines down the road interval
//check if roadline is off the road and remove if true
const road = document.querySelector("#road");
const playerCar = document.querySelector("#player-car");
const score = document.querySelector("#score");
let currentScore = 0;

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

    updateScore(++currentScore);
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
        if(convertToNumber(playerCar.style.left) !== 330) {
            playerCar.style.left = convertToNumber(playerCar.style.left) + movementSpeed + "px";
        }
    }
}

//moveRoadLineTester();
setInterval(roadLineAnimation, 1);


window.addEventListener("keydown", (event) => {
    let selectedKey = event.key;

    movePlayerCar(selectedKey)
})