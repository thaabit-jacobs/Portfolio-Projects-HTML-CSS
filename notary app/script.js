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

                let wordCount = wordCounter(bookContents);
                let sortedWordArray = sortWordArray(convertWordObjToWordArray(wordCount));

                renderWordsToContainer(findTopFiveMostUsedWord(sortedWordArray, 5) ,"mostUsedWords");

                renderWordsToContainer(findTopFiveLeastUsedWord(sortedWordArray, 5) ,"leastUsedWords");

                const wordCountEl = document.querySelector("#wordCount");
                wordCountEl.innerText = `word count:${Object.keys(wordCount).length}`;

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
    
    text.replace(/[""();:-_.,!?\n[]]/g, " ")
        .split(" ")
        .forEach(word => {        
            if(wordCount[word] !== undefined) 
                wordCount[word] = ++wordCount[word];
            else
                wordCount[word] = 1; 
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

///////////////////////////////////////////////////////////////////////////////