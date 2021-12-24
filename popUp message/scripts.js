const clickableBoxes = document.querySelectorAll(".popup");
const msgContainer = document.querySelector(".msg-container");
const closeBtn = document.querySelector(".close");

function isMsgContainerHidden(msgContainerElement){
    return msgContainerElement.classList.value.includes("hidden");
}

function unhideMsgContainerAndCloseBtn(msgContainerElement, closeBtnElement){
    msgContainerElement.className = "msg-container";
    closeBtnElement.className = "close";
    return true;
}

function hideMsgContainerAndCloseBtn(msgContainerElement, closeBtnElement){
    msgContainerElement.className = "msg-container hidden";
    closeBtnElement.className = "close hidden";
    return true;
}

function updateMsgContainerMsg(updatedMsg){
    const msgElement = document.querySelector("#msg");
    msgElement.innerText = updatedMsg;
}

closeBtn.addEventListener("click", (event) => {
    hideMsgContainerAndCloseBtn(msgContainer, closeBtn);
})

clickableBoxes.forEach(clickable => {
    clickable.addEventListener("click", (event) => {
        let clickableBoxMsg = event.target["attributes"]["data-msg"].textContent;
        
        if(isMsgContainerHidden(msgContainer)){
            unhideMsgContainerAndCloseBtn(msgContainer, closeBtn);
            updateMsgContainerMsg(clickableBoxMsg);
        }else{
            updateMsgContainerMsg(clickableBoxMsg);
        }
    })
})