let  people = {
    "thaabit": {    "name": "thaabit",
                    "age": 23
                },

    "kauthar": {
        "name": "kauthar",
        "age": 22
    },

    "peter" :   {
        "name": "Peter",
        "age": 34
    }         

}


function getPerson(name){
    if(people.hasOwnProperty(name))
        return Promise.resolve(people[name]);
    return Promise.resolve(new Error("Name does not exist"));       
}

let person = getPerson("lee")
                .then(p => {
                    p["surname"] = "Jacobs";
                    return Promise.resolve(p);
                })  
                .then(p2 => console.log(p2))
                .catch(err => console.log(err))
      
let timeOut = 