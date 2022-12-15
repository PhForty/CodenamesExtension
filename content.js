//Syringe operation: Get socket-sniffer into page
var s = document.createElement('script');
s.src = browser.runtime.getURL('socket-sniffer.js');
(document.head || document.documentElement).appendChild(s);


//Store carddata, whenever it is received by socket-sniffer
var storage;
window.addEventListener("message", (event) => {
  if (event.data.direction == "from-page-script") {
      gamedata = JSON.parse((event.data.message).slice(13))[2].G.animTokens;
      if(gamedata.length > 0){
        console.log("[*] Kartenfarben wurden gefunden!")
        storage = gamedata;
      }
  }
});

//Send carddata to popup, whenever requested
browser.runtime.onMessage.addListener(handleMessage);
function handleMessage(request, sender, sendResponse) {
  sendResponse({ response: storage });
}