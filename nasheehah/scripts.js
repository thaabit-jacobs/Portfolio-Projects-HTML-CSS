let testetch = fetch("http://api.aladhan.com/v1/calendar?latitude=51.508515&longitude=-0.1254872&method=2&month=4&year=2017")
                    .then(response => response.json())
                    .then(data => console.log(data))
