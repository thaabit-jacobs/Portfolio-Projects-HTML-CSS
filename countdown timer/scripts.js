//const timerEl = document.querySelector("#timer");

// 8/4/2022
let bday = new Date(2022, 3, 8);
let currentDate = new Date();

let diff = bday.getTime() - currentDate.getTime();
let minutes = Math.floor((diff/1000)/60);

let hours = Math.round(minutes / 60);

let days = Math.floor(hours / 24);


console.log(`${days}:${hours}:${minutes}`);