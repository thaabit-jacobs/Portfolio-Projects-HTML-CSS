const emailExtractorForm = document.querySelector("#text-extractor");
const resultArea = document.querySelector("#results");
const resultText = document.querySelector("#resultText");

emailExtractorForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = emailExtractorForm.elements["text"].value;

    let result = [];
    let textArray = text.split(" ")
                        .filter(str => str.includes("@"))
                        .forEach(email => {
                            if(!result.includes(email))result.push(email);   
                        });

    let resultLength = result.length;

    result = result.join(";\n");                    
    
    resultText.innerText = `Found ${resultLength} unique emails`
    resultArea.innerText = result;
})
