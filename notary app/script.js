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
                bookContent.innerHTML = bookContents.replaceAll("\r", "</br>");

                let wordCount = wordCounter(bookContents);
                let sortedWordArray = sortWordArray(convertWordObjToWordArray(wordCount));

                renderWordsToContainer(findTopFiveMostUsedWord(sortedWordArray, 5) ,"mostUsedWords");

                renderWordsToContainer(findTopFiveLeastUsedWord(sortedWordArray, 5) ,"leastUsedWords");

                const wordCountEl = document.querySelector("#wordCount");
                wordCountEl.innerText = `word count:${calculateNumberOfWords(wordCount)}`;

                const bookTitletEl = document.querySelector("#book-title");
                bookTitletEl.innerText = bookTitle;
            });
    })
})

//////////////////////////////////////Most used words////////////////////////////////

function findTopFiveMostUsedWord(sortedWordArray, noOfWords){
    let lastIndex = sortedWordArray.length - 1;

    return sortedWordArray.slice(lastIndex - noOfWords, lastIndex);
}

////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////least words////////////////////////////////

function findTopFiveLeastUsedWord(sortedWordArray, noOfWords){
    return sortedWordArray.slice(0, noOfWords);
}

////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////Utilities////////////////////////////////

function wordCounter(text){
    let wordCount = {};

    console.log()

    text.replace(/[\n\r]/g, " ").split(" ")
        .forEach(word => {
            if(isNaN(word)){
                if(wordCount[word] !== undefined) 
                    wordCount[word] = ++wordCount[word];
                else{
                    wordCount[word] = 1;
                }
            }   
        });

    return wordCount;    
}

function wordCountTemplate(word, count){
    return `${word}: ${count} time(s)`;
}

function removeAllChildrenFromElement(parentElement, childElementSelectorToBeRemoved){
    parentElement.querySelectorAll(childElementSelectorToBeRemoved).forEach(child => child.remove());
}

function convertWordObjToWordArray(wordObj){
    let result = [];

    for(let word in wordObj){
        result.push([word, wordObj[word]]);
    }

    return result;
}

function sortWordArray(wordArray){
    return wordArray.sort((a, b) => a[1] - b[1]);
}

function renderWordsToContainer(wordArray, elementId){
    const wordsContainer = document.querySelector(`#${elementId}`);

    removeAllChildrenFromElement(wordsContainer, "li");

    wordArray.forEach(word => {
        let li = document.createElement("li");
        li.innerHTML = `<p>${wordCountTemplate(word[0], word[1])}</p>`;
        wordsContainer.appendChild(li);
    });
}

function calculateNumberOfWords(wordObj){
    return Object.values(wordObj).reduce((a ,b) => a + b);
}

///////////////////////////////////////////////////////////////////////////////

/////////////////////////////search word for,/////////////////////////////////
const bookSearchForm = document.querySelector("#bookSearchForm");
bookSearchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let wordCount = 0;

    let searchWord = bookSearchForm["word"].value;
    let bookText = bookContent.innerText;

    if(bookText !== ""){
        bookText
                .replace(/[\n\r]/g, " ")
                .split(" ")
                .forEach(word => {
                    if(searchWord === word){
                        wordCount++;
                    };
                }) 

        const searchWordCount = document.querySelector("#searchWordCount");
        searchWordCount.innerText = wordCountTemplate(searchWord, wordCount);

        bookSearchForm.reset();
    }
})