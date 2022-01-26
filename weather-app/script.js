`use strict`

const apiKey = "cf580544875b4f54906162956222401";
const baseUrl = "http://api.weatherapi.com/v1";

const tempElement = document.querySelector("#temp-celsius");
const cloudStatElement = document.querySelector("#cloudy-stat");
const humidityStatElement = document.querySelector("#humidity-stat");
const windStatElement = document.querySelector("#wind-stat");
const cityElement = document.querySelector("#city");
const dateElement = document.querySelector("#date");

const currentDayConditionIconElement = document.querySelector("#current-day-condition-icon");
const currentDayConditionElement = document.querySelector("#current-day-condition");

const currentDay1ConditionIconElement = document.querySelector("#next-day-1-condition-icon");
const currentDay1ConditionElement = document.querySelector("#next-day-1-condition");
const currentDay1TempElement = document.querySelector("#next-day-1-temp");
const currentDay1DateElement = document.querySelector("#next-day-1-date");

const currentDay2ConditionIconElement = document.querySelector("#next-day-2-condition-icon");
const currentDay2ConditionElement = document.querySelector("#next-day-2-condition");
const currentDay2TempElement = document.querySelector("#next-day-2-temp");
const currentDay2DateElement = document.querySelector("#next-day-2-date");

const form = document.querySelector("#search-city-form");

const buttons = document.querySelectorAll("button");

function saveUserLocation(){
    let lat = localStorage.latitude;
    let long = localStorage.longitude;

    function success(position){
        localStorage.latitude  = position.coords.latitude;
        localStorage.longitude = position.coords.longitude;
    }

    function error(){
        setDefaultCoordinates();
    }

    if(!navigator.geolocation) {
        setDefaultCoordinates();
      } else {
        navigator.geolocation.getCurrentPosition(success, error);
      }
}

function setDefaultCoordinates(){
    localStorage.latitude  = "-33.92528";
    localStorage.longitude = "18.42389";
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let cityName = form["city-name"].value;

    console.log(cityName);

    renderForeCastBySearch(cityName);
})

buttons.forEach(btn => btn.addEventListener("click", (event) => {
    renderForeCastBySearch(btn.innerText);
}));

function renderForeCastByCorordinates(lat, long){
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${long}&days=5`)
        .then(response => response.json())
        .then(data => {
            setWeatherData(data);
        });
}

function renderForeCastBySearch(cityName){
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=5`)
        .then(response => response.json())
        .then(data => {
            setWeatherData(data);
        })
}

function setWeatherData(data){
    let currentDayForecast = data.current;
    let nextDaysForecast = data.forecast.forecastday;

    tempElement.innerHTML = `${currentDayForecast["temp_c"]}&deg;`
    dateElement.innerHTML = data.location["localtime"];
    cityElement.innerText = data.location.name;

    cloudStatElement.innerText =  `${currentDayForecast["cloud"]}%`;
    humidityStatElement.innerText = `${currentDayForecast["humidity"]}%`;
    windStatElement.innerText = `${currentDayForecast["wind_kph"]}km/h`;

    currentDayConditionElement.innerText = currentDayForecast.condition.text;
    currentDayConditionIconElement.setAttribute("src", currentDayForecast.condition.icon);

    currentDay1ConditionIconElement.setAttribute("src", nextDaysForecast[1].day.condition.icon);
    currentDay1ConditionElement.innerText = nextDaysForecast[1].day.condition.text;
    currentDay1TempElement.innerHTML = `${nextDaysForecast[1].day["avgtemp_c"]}&deg;`;
    currentDay1DateElement.innerText = nextDaysForecast[1].date;

    currentDay2ConditionIconElement.setAttribute("src", nextDaysForecast[2].day.condition.icon);
    currentDay2ConditionElement.innerText = nextDaysForecast[2].day.condition.text;
    currentDay2TempElement.innerHTML = `${nextDaysForecast[2].day["avgtemp_c"]}&deg;`;
    currentDay2DateElement.innerText = nextDaysForecast[2].date;

    changeBackgroundByCondition(data);

    console.log(data);
}

function changeBackgroundByCondition(data){
    let hour = Number(extractTime(data.current["last_updated"]));
    let condition = data.current.condition.text;
    
    console.log(condition);
    console.log(hour);

    if(hour > 5 && hour < 19){
        if(condition.indexOf("Sunny") !== -1){
            setBackgroundImg("clear", "day")
            console.log("sunny day");
        }else if(condition.indexOf("cloud") !== -1 || condition.indexOf("overcast") !== -1){
            setBackgroundImg("cloudy", "day")
            console.log("cloudy day");
        }else if(condition.indexOf("rain") !== -1){
            setBackgroundImg("rainy", "day")
            console.log("rainy day");
        }else{
            setBackgroundImg("snow", "day")
            console.log("snow day");
        }
    }else{
        if(condition.indexOf("Sunny") !== -1){
            setBackgroundImg("clear", "night")
            console.log("sunny night");
        }else if(condition.indexOf("cloud") !== -1 || condition.indexOf("overcast") !== -1){
            setBackgroundImg("cloudy", "night")
            console.log("cloudy night");
        }else if(condition.indexOf("rain") !== -1){
            setBackgroundImg("rainy", "night")
            console.log("rainy night");
        }else{
            setBackgroundImg("snow", "night")
            console.log("snow night");
        }
    }
}

function setBackgroundImg(condition, timeOfDay){
    let body = document.querySelector("body");
    body.style.background =  `url(images/${timeOfDay}/${condition}.jpg)`;
    body.style["background-position"] = "center";
    body.style["background-size"] = "cover";
    body.style["background-repeat"] = "no-repeat";
}

function extractTime(date){
    return date.substring(date.indexOf(" ") + 1, date.indexOf(":"));
}
function getFormattedDate(){
    let date = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    let currentDay = days[date.getDay()];
    let currentDate = date.getDate();
    let currentMonth = Number(date.getMonth());
    let currentYear = date.getFullYear();
    let currentHour = date.getHours();
    let currentMin = date.getMinutes();

    return `${currentHour}:${currentMin} - ${currentDay} ${currentDate},<br> ${++currentMonth} ${currentYear}`;
}

if(localStorage.latitude === undefined && localStorage.longitude === undefined ){
    saveUserLocation();
}

renderForeCastByCorordinates(localStorage.latitude, localStorage.longitude);