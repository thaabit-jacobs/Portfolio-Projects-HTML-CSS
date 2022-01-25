`use strict`

const apiKey = "cf580544875b4f54906162956222401";
const baseUrl = "http://api.weatherapi.com/v1";

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
form.addEventListener("submit", (event) => {
    event.preventDefault();

    let cityName = form["city-name"].value;

    console.log(cityName);

    renderForeCastBySearch(cityName);
})

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
    dateElement.innerHTML = getFormattedDate();
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