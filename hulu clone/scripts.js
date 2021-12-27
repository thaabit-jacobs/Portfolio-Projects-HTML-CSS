const newBtn = document.querySelector("#news-channel");
const basketBallBtn = document.querySelector("#basketball-channel");
const eventsBtn =document.querySelector("#events-channel");
const channelHeading = document.querySelector("#channel-heading");
const channelText = document.querySelector("#channel-text");
const channelSection = document.querySelector("#channels");

const iconOne = document.querySelector("#icon-1");
const iconTwo = document.querySelector("#icon-2");
const iconThree = document.querySelector("#icon-3");
const iconFour = document.querySelector("#icon-4");

basketBallBtn.addEventListener("click", (event) => {
    channelHeading.innerText = "Live Sports";
    channelText.innerHTML = "Catch your games at home or on the go.<br> Stream live games from major college and<br> pro leagues including the NCAA®, NBA,<br> NHL, NFL, and more.";
    basketBallBtn.className = "channel-btn active-btn";
    
    newBtn.className = "channel-btn"
    eventsBtn.className = "channel-btn";

    channelSection.style.background = "url(images/channels/basketball-bg.jpg)";
    channelSection.style["background-size"] = "cover";
    channelSection.style["background-position"] = "center";

    iconOne.setAttribute("src", "images/channels/b-channel/cbs-logo.png");
    iconTwo.setAttribute("src", "images/channels/b-channel/espn-logo.png");
    iconThree.setAttribute("src", "images/channels/b-channel/fs1-logo.svg");
    iconFour.setAttribute("src", "images/channels/b-channel/nfl-logo.png");

    /*
    images/channels/b-channel/cbs-logo.png
    */
})


newBtn.addEventListener("click", (event) => {
    channelHeading.innerText = "Breaking News";
    channelText.innerHTML = "Keep pace with what's going on locally and<br> globally with trusted opinions from all<br> the top news networks.";
    newBtn.className = "channel-btn active-btn"

    basketBallBtn.className = "channel-btn";
    eventsBtn.className = "channel-btn";

    channelSection.style.background = "url(images/channels/news-bg.jpg)";
    channelSection.style["background-size"] = "cover";
    channelSection.style["background-position"] = "center";

    iconOne.setAttribute("src", "images/channels/n-logo/abc-logo.png");
    iconTwo.setAttribute("src", "images/channels/n-logo/cnn-logo.svg");
    iconThree.setAttribute("src", "images/channels/n-logo/fox-logo.svg");
    iconFour.setAttribute("src", "images/channels/n-logo/msnb-logo.png");

})

eventsBtn.addEventListener("click", (event) => {
    channelHeading.innerText = "Biggest Events";
    channelText.innerHTML = "Spectacular, can't-miss moments like the<br> Olympics, Grammys®, Oscars®, Emmys®,<br> and more.";
    eventsBtn.className = "channel-btn  active-btn";

    newBtn.className = "channel-btn"
    basketBallBtn.className = "channel-btn";

    channelSection.style.background = "url(images/channels/biggest-events-bg.jpg)";
    channelSection.style["background-size"] = "cover";
    channelSection.style["background-position"] = "center";

    iconOne.setAttribute("src", "images/channels/be-logo/golden-logo.png");
    iconTwo.setAttribute("src", "images/channels/be-logo/grammy-logo.png");
    iconThree.setAttribute("src", "images/channels/be-logo/lady-logo.png");
    iconFour.setAttribute("src", "images/channels/be-logo/oscars-logo.png");
})