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

    let prayTimes = getPrayTimes(latitude, longitude, currentDateData());
    prayTimes.then(data => console.log(data.data));
}

//if do do not have access to the users location via geo location
//retrive it using a pop up form
//once retrieved data will be saved in localstorage for subsequent request
function getTimesBasedOnUserCity() {
        if(!localStorage.latitude || !localStorage.longitude){
            createCityForm();

            const cityForm = document.querySelector("#city-form");
    
            cityForm.addEventListener("submit", (event) => {
            event.preventDefault();
    
            const selectedCity = cityForm.elements["city-name"].value;
    
            let city = getCity(selectedCity)
            .then(data => {
                localStorage.setItem("latitude", data[0]["latitude"]);
                localStorage.setItem("longitude", data[0]["longitude"]);
                localStorage.setItem("city", data[0]["name"]);

                let prayTimes = getPrayTimes(localStorage.latitude, localStorage.longitude, currentDateData());
                prayTimes.then(data => console.log(data.data));

                document.querySelector(".modal").remove();
            })
            .catch(error => {
                addErrorMsgToInput("Please enter valid city name")
            });
    })
        }else{
            let prayTimes = getPrayTimes(localStorage.latitude, localStorage.longitude, currentDateData());
            prayTimes.then(data => console.log(data.data));
        }
}

function getPrayTimes(latitude, longitude, date){
    return fetch(`http://api.aladhan.com/v1/calendar?latitude=${latitude}&longitude=${longitude}&method=3&month=${date[1]}&year=${date[0]}`)
            .then(response => response.json())
            .catch(error => console.log(error));     
}

function getCity(selectedCity){
    return fetch(`https://api.api-ninjas.com/v1/city?name=${selectedCity}`, {
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': 'pR64g0X81XnhAEuJ5zA0nA==GhjyE9fmWRMOmkDd'
        }
    })
    .then(response => response.json())
}

function createCityForm(){
    let formDiv = document.createElement("div");
    formDiv.className = "modal";

    let form = document.createElement("form");
    form.setAttribute("id", "city-form");

    formDiv.appendChild(form);
    
    let cityInput = document.createElement("input");
    cityInput.setAttribute("id", "city-name");
    cityInput.setAttribute("name", "city-name");
    cityInput.setAttribute("type", "text");
    cityInput.setAttribute("placeholder", "Enter city name i.e Cape Town");
    
    let submitInput = document.createElement("input");
    submitInput.className = "contact-form"
    submitInput.setAttribute("id", "submit-btn");
    submitInput.setAttribute("name", "submit-btn");
    submitInput.setAttribute("type", "submit");

    form.appendChild(cityInput);
    form.appendChild(submitInput);

    document.body.appendChild(formDiv)
}

function addErrorMsgToInput(errorMsg){
    let currentError = document.querySelector(".error");

    if(currentError)  currentError.remove();

    let newError = document.createElement("p");
    newError.className = "error";
    newError.innerText = errorMsg;

    document.querySelector("#city-form").appendChild(newError);
}

function currentDateData(){
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth() + 1;

    return [currentYear, currentMonth]
}

getLocation();

