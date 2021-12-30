

function fn(...promises) {
	let promisesResults = promises 
                                .map(async promise => {
                                    let result = await promise;
                                    return result;
                                })
                                .map(async result => {
                                    let promisedResult = Promise.resolve((await result) * 2);
                                    return promisedResult
                                })
                                 
    console.log(Promise.all(promisesResults))                               
    return Promise.all(promisesResults);                              
}

console.log(fn(Promise.resolve(2), Promise.resolve(4)))