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

                renderMostUsedWords(findTopFiveUsedWord(mostUsedWords(bookContents)));
            });
    })
})

//////////////////////////////////////Most used words////////////////////////////////

function mostUsedWords(text){
    let wordCount = {};
    
    text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
        .split(" ")
        .filter(str => str !== "\n" && str !== "")
        .forEach(word => {
            if(wordCount[word] !== undefined) 
                wordCount[word] = ++wordCount[word];
            else
                wordCount[word] = 1;     
        });

    console.log(wordCount);

    return wordCount;    
}

function findTopFiveUsedWord(wordCount){
    let topFiveUsedWord = {};

    for(let currentWord in wordCount){
        if(Object.keys(topFiveUsedWord).length !== 5){
            topFiveUsedWord[currentWord] = wordCount[currentWord];
        }else{
            for(let currentMostUsedWord in topFiveUsedWord){
                if(topFiveUsedWord[currentMostUsedWord] < wordCount[currentWord] && topFiveUsedWord[currentWord] === undefined){
                    delete topFiveUsedWord[currentMostUsedWord];
                    topFiveUsedWord[currentWord] = wordCount[currentWord];
                }
            }
        }
    }

    return topFiveUsedWord;
}

function renderMostUsedWords(topFiveMostUsedWords){
    const mostUsedWordsContainer = document.querySelector("#mostUsedWords");

    removeAllChildrenFromElement(mostUsedWordsContainer, "li");

    let wordArray = sortWordArray(convertWordObjToWordArray(topFiveMostUsedWords));

    wordArray.forEach(word => {
        let li = document.createElement("li");
        li.innerHTML = `<p>${wordCountTemplate(word[0], word[1])}</p>`;
        mostUsedWordsContainer.appendChild(li);
    });
}

////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////Most least words////////////////////////////////


/*
function renderMostUsedWords(topFiveMostUsedWords){
    const mostUsedWordsContainer = document.querySelector("#mostUsedWords");

    removeAllChildrenFromElement(mostUsedWordsContainer, "li")

    for(let word in topFiveMostUsedWords){
        let li = document.createElement("li");
        li.innerHTML = `<p>${wordCountTemplate(word, topFiveMostUsedWords[word])}</p>`;
        mostUsedWordsContainer.appendChild(li);
    }
}
*/
////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////Utilities////////////////////////////////
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
    return wordArray.sort((a, b) => b[1] - a[1]);
}

///////////////////////////////////////////////////////////////////////////////