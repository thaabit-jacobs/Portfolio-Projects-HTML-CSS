let keysPressed = {};
const displayHead = document.querySelector(".container-heading");
const displayText = document.querySelector(".container-text");
const textarea = document.querySelector("textarea");
const addBtn = document.querySelector("#add-note");
const notesContainer = document.querySelector(".all-notes-container-narrow");

///////////////add note listener ///////////////
addBtn.addEventListener("click", (event) => {
    displayHead.value = "New note";
    displayText.value = "A new note";

    setActiveNoteId("");

    let changeBgNote = document.querySelector(".note-gray-background");
    if(changeBgNote !== null){
        changeBgNote.className = "note";
    }
});


///////////////textearea///////////////
textarea.addEventListener('input', autoResize, false);

function autoResize() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
}

///////////////save heading and text///////////////

window.addEventListener("keydown", (event) => {
    keysPressed[event.key] = true;
    
    if (keysPressed['Alt'] && (event.key == 's' || event.key == 'S')) {
        let note = {
            heading: displayHead.value,
            text: displayText.value,
            date: formatDate(new Date()),
            timestamp: new Date(),
            id: getNextId()
        }

        displayHead.value = "";
        displayText.value = "";
        
        saveNote(note);
    }
})

window.addEventListener('keyup', (event) => {
    delete keysPressed[event.key];
});

///////////////localstorage DB ///////////////

localStorage.idSequence = "0";
localStorage.activeId = "";

function getNextId(){
    let currenId = localStorage.idSequence;
    currenId = Number(currenId);
    localStorage.idSequence = "" + ++currenId;
    return currenId;
}

function setActiveNoteId(id){
    localStorage.activeId = id;
}

function saveNote(note){    
    if(localStorage.notes === undefined){
        localStorage.notes = "" + JSON.stringify(note);
    }else if(localStorage.notes === ""){
        localStorage.notes = "" + JSON.stringify(note);
    }else{
        let currentActiveId = localStorage.activeId;

        if(currentActiveId === ""){
            localStorage.notes += "splitIndicator" + JSON.stringify(note);
        }else{
            let foundNote = localStorage.notes.split("splitIndicator")
                                              .map(n => JSON.parse(n))
                                              .find(n => n.id === Number(currentActiveId));

                                              deleteNote(foundNote);
            foundNote.heading = note.heading;                                    
            foundNote.text = note.text;                                    
            foundNote.date = formatDate(new Date());
            foundNote.timestamp = new Date();
            
            localStorage.notes += "splitIndicator" + JSON.stringify(foundNote);
        }
    }
    renderNotes();
}

function deleteNote(note){
    let notes = localStorage.notes;

    if(notes.indexOf("splitIndicator") === -1){
        console.log("hello")
        localStorage.notes = "";

        location.reload()
    }else{
        notes = notes.split("splitIndicator")
        .filter(savedNote => savedNote !== JSON.stringify(note))
        .join("splitIndicator");

        localStorage.notes = notes;
    }
    
    renderNotes();
}

///////////////utilities ///////////////
function renderNotes(){
    let notes = localStorage.notes;
    
    if(notes !== undefined && notes !== ""){
        [...notesContainer.childNodes]
                      .filter(child => child.id !== "add-note")
                      .forEach(child => child.remove());

        notes.split("splitIndicator")
             .map(note => JSON.parse(note))
             .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
             .forEach(note => {
                 console.log(note)
                notesContainer.appendChild(createNote(note));
             })
    }else{
        localStorage.notes = "";
    }
}

function noteTextShortener(noteText){
    if(noteText.length > 20){
        return noteText.substring(0, 20).concat("...");
    }

    return noteText;
}

function createNote(note){
    let noteDiv = document.createElement("div");
    noteDiv.className = "note";

    let h2 = document.createElement("h2");
    h2 = note["heading"];
    
    let textContent = document.createElement("p");
    textContent.className = "note-text";
    textContent.innerText = noteTextShortener(note["text"]);

    let textDate = document.createElement("p");
    textDate.className = "note-date";
    textDate.innerText = note["date"]

    noteDiv.append(h2);
    noteDiv.appendChild(textContent);
    noteDiv.appendChild(textDate);

    ///////////////delete note event listener ///////////////
    noteDiv.addEventListener("dblclick", (event) => {
        alert("You about to delete note");
        deleteNote(note);
    })

    ///////////////selected note event listener ///////////////
    noteDiv.addEventListener("click", (event) => {
        let changeBgNote = document.querySelector(".note-gray-background");
        if(changeBgNote !== null){
            changeBgNote.className = "note";
        }
        
        noteDiv.className = "note note-gray-background"
        displayHead.value = note.heading;
        displayText.value = note.text;  
        
        setActiveNoteId(note.id);
    })

    return noteDiv;
}

function formatDate(date){
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let currentDay = days[date.getDay()];
    let currentDate = date.getDate();
    let currentMonth = months[date.getMonth()];
    let currentYear = date.getFullYear();
    let currentHour = date.getHours();
    let currentMin = date.getMinutes();
    let currentSeconds = date.getSeconds();


    return `${currentDay}, ${currentDate} ${currentMonth} ${currentYear} at ${currentHour}:${currentMin}:${currentSeconds}`;
}

//localStorage.clear()
renderNotes();
