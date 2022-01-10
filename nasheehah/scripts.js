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

    console.log(praysForCurrentMonth);

    RenderPrayForMonth(praysForCurrentMonth)

    praysForCurrentMonth.forEach(prayTime => {
        if(areDatesEqual(currentDate, extractDate(prayTime.date.gregorian.date))){

            renderUpcomingPray(prayTime.timings);

            renderDates(prayTime.date.hijri,  prayTime.date.gregorian);

            renderPrayTimes(prayTime.timings);

            renderMetaData(prayTime.meta);
        }
    })
}


function RenderPrayForMonth(prayDataForMonth){
    const hijriCalendar = document.querySelector("#hijri-calendar");

    let trHeadings = document.createElement("tr");

    let th1 = document.createElement("th");
    th1.className = "cell";
    th1.innerText = "Gregorian Date";

    let th2 = document.createElement("th");
    th2.className = "cell";
    th2.innerText = "Hijri Date";

    let th3 = document.createElement("th");
    th3.className = "cell";
    th3.innerText = "Fajr";
    
    let th4 = document.createElement("th");
    th4.className = "cell";
    th4.innerText = "Sunrise";

    let th5 = document.createElement("th");
    th5.className = "cell";
    th5.innerText = "Dhuhr";

    let th6 = document.createElement("th");
    th6.className = "cell";
    th6.innerText = "Asr";

    let th7 = document.createElement("th");
    th7.className = "cell";
    th7.innerText = "Magrib";

    let th8 = document.createElement("th");
    th8.className = "cell";
    th8.innerText = "Isha";

    trHeadings.appendChild(th1);
    trHeadings.appendChild(th2);
    trHeadings.appendChild(th3);
    trHeadings.appendChild(th4);
    trHeadings.appendChild(th5);
    trHeadings.appendChild(th6);
    trHeadings.appendChild(th7);
    trHeadings.appendChild(th8);

    hijriCalendar.appendChild(trHeadings);

    prayDataForMonth.forEach(prayData => {
        let tr = document.createElement("tr");
        
        let td1 = document.createElement("td");
        td1.innerText = prayData.date.gregorian.date;

        let td2 = document.createElement("td");
        td2.innerText = prayData.date.hijri.date;

        let td3 = document.createElement("td");
        td3.className = "bg-white font-weight-none";
        td3.innerText = prayData.timings.Fajr;

        let td4 = document.createElement("td");
        td4.className = "bg-white font-weight-none";
        td4.innerText = prayData.timings.Sunrise;

        let td5 = document.createElement("td");
        td5.className = "bg-white font-weight-none";
        td5.innerText = prayData.timings.Dhuhr;

        let td6 = document.createElement("td");
        td6.className = "bg-white font-weight-none";
        td6.innerText = prayData.timings.Asr;

        let td7 = document.createElement("td");
        td7.className = "bg-white font-weight-none";
        td7.innerText = prayData.timings.Maghrib;

        let td8 = document.createElement("td");
        td8.className = "bg-white font-weight-none";
        td8.innerText = prayData.timings.Isha;

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);
        tr.appendChild(td8);

        hijriCalendar.appendChild(tr);
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
    let currentDateMinutes = Number(new Date().getMinutes()) + currentDateHours * 60;
    let lowestPrayHour = 1000;
    let prayTimeResult = "";
    let prayNameResult = "";

    for(let prayName in timings){
        if(!(prayName === "Sunset" || prayName === "Imsak" || prayName === "Midnight")){
            let currentPrayTime = timings[prayName];
            let formattedPrayHour = getPrayTimeHoursAndMins(currentPrayTime)[0];
            let formattedPrayMin = getPrayTimeHoursAndMins(currentPrayTime)[1] + formattedPrayHour * 60;
            
            if(formattedPrayMin > currentDateMinutes){
                if(formattedPrayHour < lowestPrayHour){
                    lowestPrayHour = formattedPrayHour;
                    prayTimeResult = currentPrayTime;
                    prayNameResult = prayName; 
                }
            }
        }
    }

    return [prayNameResult, prayTimeResult];
}

function renderUpcomingPray(prayTimings){
    const prayTimeEl = document.querySelector("#upcoming-pray-time"); 
    const prayNameEl = document.querySelector("#upcoming-pray-name");

    let upcomingPray = nextPray(prayTimings);
    
    setInterval(() => {
        prayTimeEl.innerText = upcomingPray[1];
        prayNameEl.innerText = upcomingPray[0];
    }, 1000);
}


function praytimeFormatter(upcomingPrayTime){
    return upcomingPrayTime.substring(0, upcomingPrayTime.indexOf(" "));
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

if(localStorage.latitude !== undefined && localStorage.longitude !== undefined){
    getLocation();
}

renderPrayDataForToday();

const form = document.querySelector("#date-picker-form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    let dateInfo = form["month-year-picker"].value;

    let praysForCurrentMonth = await getPrayTimesCurrentMonthForYearInfo(localStorage.latitude, localStorage.longitude, extractDateInfo(dateInfo));

    const hijriCalendar = document.querySelector("#hijri-calendar");
    [...hijriCalendar .childNodes].forEach(children => children.remove())
    //console.log(praysForCurrentMonth);

    RenderPrayForMonth(praysForCurrentMonth);
})

function extractDateInfo(date){
    return [date.substring(0, date.indexOf("-")), date.substring(date.indexOf("-") + 1)];
}

async function getPrayTimesCurrentMonthForYearInfo(latitude, longitude, date){
    
    let url = `http://api.aladhan.com/v1/calendar?latitude=${latitude}&longitude=${longitude}&method=3&month=${date[1]}&year=${date[0]}`;
    
    try{
        let response = await fetch(url);
        let results = await response.json();
        return results.data;
    }catch(error) {
        console.log(error);
    }
}

let isHidden = false;

const showButton = document.querySelector("#show-button");
showButton.addEventListener("click", (event) => {
    const table = document.querySelector("table");

    if(!isHidden){
        table.className = "bg-off-white hide";
        showButton.innerText = "show";
        isHidden = true;
    }else{
        table.className = "bg-off-white";
        showButton.innerText = "hide";
        isHidden = false;
    }

})
