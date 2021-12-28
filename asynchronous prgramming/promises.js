function getPeopleData(){
    return fetch("/data.json")
    .then(data => data);
}

console.log(getPeopleData());