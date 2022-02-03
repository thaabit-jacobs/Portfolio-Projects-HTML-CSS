const bookContent = document.querySelector("#book-content");
const allBtns = document.querySelectorAll(".list button");

allBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        let baseUrl = "books/";
        let bookTitle = btn.getAttribute("data-book");
        
        console.log(`${baseUrl}${bookTitle}.txt`);

        fetch(`${baseUrl}${bookTitle}.txt`)
            .then(data => data.text())
            .then(bookContents => {
                bookContents = bookContents.trim();
                bookContent.innerText = bookContents;
            });
    })
})


function mostUsedWords(text){
    let wordCount = {};
    let topFiveUsedWord = {}

    text.split(" ")
        .filter(str => str !== "\n")
        .forEach(word => {
            if(wordCount[word] !== undefined) 
                wordCount[word] = ++wordCount[word];
            else
                wordCount[word] = 1;     
        });
    
    function findTopFiveUsedWord(){
        for(let currentWord in wordCount){
            if(Object.keys(topFiveUsedWord) < 5){
                topFiveUsedWord[currentWord] = wordCount[currentWord]; 
            }else{
                for(let currentMostUsedWord in topFiveUsedWord){
                    if(topFiveUsedWord[currentMostUsedWord] < wordCount[currentWord]){
                        delete topFiveUsedWord[currentMostUsedWord];
                        topFiveUsedWord[currentWord] = wordCount[currentWord];
                    }
                }
            }
        }
    }

    findTopFiveUsedWord();

    return topFiveUsedWord;    
}

console.log(
    mostUsedWords("This is going to be a long sentence. \nHopefully a person will understand. \nwho is this person")
)