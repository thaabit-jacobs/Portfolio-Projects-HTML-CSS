const clickableBoxes = document.querySelectorAll(".popup");
const msgContainer = document.querySelector("#msg-container");

function createCloseBtn(msgContainer){
    const closeBtn = document.createElement("button");
    closeBtn.id = "close";
    closeBtn.innerText = "close"; 

    closeBtn.addEventListener("click", (event) => {
            closeBtn.remove();
            closeBtn.remove();
    });

    return closeBtn;
} 

function createMsgP() {
    const msg = document.createElement("p");
    msg.id = "msg";

    return msg;
}


function creatdMsgContainer(){
    const btnContainer = document.createElement("div");
    btnContainer.className = "btn-container";

    btnContainer.appendChild(createCloseBtn(msgContainer));
    msgContainer.appendChild(createMsgP());
    msgContainer.appendChild(btnContainer);

    return msgContainer;
}

function isMsgBoxChildrenCreated(){
    if(msgContainer.childNodes.length !== 0) return true;

    return false;
}

clickableBoxes.forEach(clickable => {
    clickable.addEventListener("click", (event) => {
        let clickableBoxMsg = event.target["attributes"]["data-msg"].textContent;
        const msg = document.querySelector("#msg");
        
        if(isMsgBoxChildrenCreated()){
            msg.innerText = clickableBoxMsg;
        }

        creatdMsgContainer();

        msg.innerText = clickableBoxMsg;
    })
})