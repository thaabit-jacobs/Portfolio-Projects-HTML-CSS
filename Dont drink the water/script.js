// count how there are of each letter 
// create arrays based on that 

let oil = [];
let alcohol = [];
let water = [];
let honey = [];

function createArrays(glassArray){
    return glassArray.forEach(array => {
        array.forEach(liquid => {
            if(liquid === "O"){
                oil.push("O");
            }else if(liquid === "A"){
                alcohol.push("A");
            }else if(liquid === "W"){
                water.push("W");
            }else{
                honey.push("H");
            }
        })
    })
}

createArrays([['H', 'H', 'W', 'O'],['W','W','O','W'],['H','H','O','O']]);

let result = [];
  
if(oil.length !== 0){
    result.push(oil);
}

if(alcohol.length !== 0){
    result.push(alcohol);
}
if(water.length !== 0){
    result.push(water);
}
if(honey.length !== 0){
    result.push(honey);
}

console.log(result) ;