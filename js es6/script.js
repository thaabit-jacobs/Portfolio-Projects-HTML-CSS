//Destructing arrays
 let arr1 = [1, 2, 3];
 let arr2 = [4, 5, 6];

let arr3 = [...arr1, ...arr2];

console.log(arr3);

//Destructing obj
let obj1  = {
    name: "thaabit"
}

let obj2 = {
    age: 22
}

let obj3 = {
    ...obj1,
    ...obj2
}

console.log(obj3)
