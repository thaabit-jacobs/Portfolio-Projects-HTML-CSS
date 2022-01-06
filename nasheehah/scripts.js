`use strict`

//get user location either from device they have to inoout there address
//we will use method2 with an option to change later
//current date will be used
function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(getTimesBasedOnUserCoordinates, getTimesBasedOnUserCity);
    }else{
        //implement fall back for devices that do not support geolocation
        console.log("Geolocation not supported");
    }
}

//get user location if geolocation is enabled and allowed
function getTimesBasedOnUserCoordinates(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    saveLatAndLongToLocalStorage(latitude, longitude);
}

//if do do not have access to the users location via geo location
//use default data
//once retrieved data will be saved in localstorage for subsequent request
function getTimesBasedOnUserCity() {
        if(!localStorage.latitude || !localStorage.longitude){
            saveLatAndLongToLocalStorage(-26.0025, 28.0244);
        }
}

function saveLatAndLongToLocalStorage(latitude, longitude){
    localStorage.longitude = longitude;
    localStorage.latitude = latitude;

    return [latitude, longitude];
}

async function getPrayTimesCurrentMonthForYear(latitude, longitude, date){
    let [year, month] = date();

    let url = `http://api.aladhan.com/v1/calendar?latitude=${latitude}&longitude=${longitude}&method=3&month=${month}&year=${year}`;
    
    try{
        let response = await fetch(url);
        let results = await response.json();
        return results.data;
    }catch(error) {
        console.log(error);
    }
}


async function renderPrayDataForToday(){
    let praysForCurrentMonth = await getPrayTimesCurrentMonthForYear(localStorage.latitude, localStorage.longitude, currentDateData);
    let currentDate = new Date();

    praysForCurrentMonth.forEach(prayTime => {
        if(areDatesEqual(currentDate, extractDate(prayTime.date.gregorian.date))){
            console.log(prayTime);

            renderDates(prayTime.date.hijri,  prayTime.date.gregorian);

            renderPrayTimes(prayTime.timings);

            renderMetaData(prayTime.meta);
        }
    })
}

function coOrdinateFormater(lat, long){
    return `${lat}, ${long}`;
}

function paramsFormatter(paramsObj){
    return `Fajr ${paramsObj.Fajr}.0 degrees, Isha ${paramsObj.Isha}.0 degrees`
}

function prayNameFormatter(prayName){
    prayName = prayName.toLowerCase();
    prayName = prayName.substring(0, 1).toUpperCase() + prayName.substring(1); 
    return prayName;
}

function renderDates(hirijiDateObj, gregorianDateObj){
    const hirijiDateEl = document.querySelector("#hijiri-date");
    hirijiDateEl.innerText = dateBuilder(hirijiDateObj.day, hirijiDateObj.month.en, hirijiDateObj.year);

    let gregorianDateEl = document.querySelector("#gregorian-date");
    gregorianDateEl.innerText = dateBuilder(gregorianDateObj.day, gregorianDateObj.month.en, gregorianDateObj.year);
}

function renderPrayTimes(prayTimings){
    document.querySelectorAll(".pray").forEach(pray => {
        let currentPray = prayNameFormatter(pray.querySelector(".pray-name").innerText);
        pray.querySelector(".pray-time").innerText = prayTimings[currentPray]; 
    })
}

function renderMetaData(metaObj){
    let methodEl = document.querySelector("#method");
    methodEl.innerText = metaObj.method.name;

    let paramsEl = document.querySelector("#params");
    paramsEl.innerText = paramsFormatter(metaObj.method.params);

    let schoolEl = document.querySelector("#school");
    schoolEl.innerText = metaObj.school;

    let coOrdinatesEl = document.querySelector("#co-ordinates");
    coOrdinatesEl.innerText = coOrdinateFormater(metaObj.latitude, metaObj.longitude);
}

function dateBuilder(day, month, year){
    return `${day} ${month}, ${year}`;
}

function areDatesEqual(date1, date2){
    return (date1.getFullYear() === date2.getFullYear()) && (date1.getMonth() === date2.getMonth()) &&
     (date1.getDate() === date2.getDate());
}

function currentDateData(){
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth() + 1;
    let currentDay = days[currentDate.getDay()];

    return [currentYear, currentMonth, currentDay, currentDate.getDay()];
}

function extractDate(strDate){
    let day = Number(strDate.substring(0, strDate.indexOf("-")));
    let month = Number(strDate.substring(strDate.indexOf("-") + 1, strDate.lastIndexOf("-")));
    let year = Number(strDate.substring(strDate.lastIndexOf("-") + 1));

    return new Date(year, --month, day);
}

let minute = 1;
let second = 10;

function nextPrayCountDownTimer(){

    let int = setInterval(() => {
        if(second-- === 0) {
            if(minute !== 0){
                minute--;
                second = 10;
            }
        }

        if(second === 0 && minute === 0){
            console.log("Done!!"); 
            clearInterval(int)
        }else{
            console.log(minute, ":", second);
        }
    }, 1000);
}

nextPrayCountDownTimer()

//getLocation();

//renderPrayDataForToday();