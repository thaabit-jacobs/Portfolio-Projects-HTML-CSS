`use strict`

//function retrieves users geo location
function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(getTimesBasedOnUserCoordinates, getTimesBasedOnUserCity);
    }else{
        //implement fall back for devices that do not support geolocation
        console.log("Geolocation not supported");
    }
}

//getting user co-ordinates if enabled
function getTimesBasedOnUserCoordinates(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    saveLatAndLongToLocalStorage(latitude, longitude);
}

//if do do not have access to the users location via geo location
//use default data
function getTimesBasedOnUserCity() {
        if(!localStorage.latitude || !localStorage.longitude){
            saveLatAndLongToLocalStorage(-26.0025, 28.0244);
        }
}

//save location to localstorage
function saveLatAndLongToLocalStorage(latitude, longitude){
    localStorage.longitude = longitude;
    localStorage.latitude = latitude;

    return [latitude, longitude];
}

//retrieve pray times for current month of that year
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


//render all pray data to screen for month
async function renderPrayDataForToday(){
    let praysForCurrentMonth = await getPrayTimesCurrentMonthForYear(localStorage.latitude, localStorage.longitude, currentDateData);
    let currentDate = new Date();

    praysForCurrentMonth.forEach(prayTime => {
        if(areDatesEqual(currentDate, extractDate(prayTime.date.gregorian.date))){
            console.log(prayTime);

            renderPrayCountDownTimer(prayTime.timings);

            renderDates(prayTime.date.hijri,  prayTime.date.gregorian);

            renderPrayTimes(prayTime.timings);

            renderMetaData(prayTime.meta);
        }
    })
}

function currentDateData(){
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth() + 1;
    let currentDay = days[currentDate.getDay()];

    return [currentYear, currentMonth, currentDay, currentDate.getDay()];
}

function nextPray(timings){
    let currentDateHours = Number(new Date().getHours());
    let currentDateMinutes = Number(new Date().getMinutes());
    let lowestPrayHour = 100;
    let prayTimeResult = "";
    let prayNameResult = "";

    for(let prayName in timings){
        if(!(prayName === "Sunset" || prayName === "Imsak" || prayName === "Midnight")){
            let currentPrayTime = timings[prayName];
            let formattedPrayHour = getPrayTimeHoursAndMins(currentPrayTime)[0];
            let formattedPrayMin = getPrayTimeHoursAndMins(currentPrayTime)[1];

            if(formattedPrayHour > currentDateHours){
                if(formattedPrayHour < lowestPrayHour){
                    lowestPrayHour = formattedPrayHour;
                    prayTimeResult = currentPrayTime;
                    prayNameResult = prayName; 
                }
            }

            if(formattedPrayHour === currentDateHours){
                
            }
        }
    }

    return [prayNameResult, prayTimeResult];
}

function renderPrayCountDownTimer(prayTimings){
    const prayTimeEl = document.querySelector("#upcoming-pray-time"); 
    const prayNameEl = document.querySelector("#upcoming-pray-name");

    let upcomingPray = nextPray(prayTimings);
    
    setInterval(() => {
        prayTimeEl.innerText = upcomingPray[1];
        prayNameEl.innerText = upcomingPray[0];

        if(prayTimeEl.innerText === "00:00:00"){
            upcomingPray = nextPray(prayTimings);
        }
    }, 1000);
}


function subtractTime(upcomingPrayTime, seconds){
    let currentHour = new Date().getHours();
    let currentMinute = new Date().getMinutes();

    upcomingPrayTime = praytimeFormatter(upcomingPrayTime);

    console.log(`${new Date().getHours()} ${new Date().getMinutes()}`);
}


/*
12:14:00
11:23:00
*/

function praytimeFormatter(upcomingPrayTime){
    return upcomingPrayTime.substring(0, upcomingPrayTime.indexOf(" "));
}

function checkIfTimeLengthOfTwo(value){
    value = "" + value;

    if(value.length === 1){
        value = "0" + value;
        return value;
    }

    return value;
}

function getPrayTimeHoursAndMins(prayTime){
    console.log(prayTime)
    let hours = Number(prayTime.substring(0, prayTime.indexOf(":"))); 
    let mins = Number(prayTime.substring(prayTime.indexOf(":") + 1, prayTime.indexOf(" "))); 
    return [hours, mins];
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

function extractDate(strDate){
    let day = Number(strDate.substring(0, strDate.indexOf("-")));
    let month = Number(strDate.substring(strDate.indexOf("-") + 1, strDate.lastIndexOf("-")));
    let year = Number(strDate.substring(strDate.lastIndexOf("-") + 1));

    return new Date(year, --month, day);
}

getLocation();

renderPrayDataForToday();