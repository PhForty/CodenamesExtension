//Syringe operation: Get socket-sniffer into page
console.log("[*] ----------Syringe initial load----------")
var s = document.createElement('script');
s.src = browser.runtime.getURL('socket-sniffer.js');
(document.head || document.documentElement).appendChild(s);


var storage;
window.addEventListener("message", (event) => {
  if (event.data.direction == "from-page-script") {
      console.log("Got message");
      gamedata = JSON.parse((event.data.message).slice(13))[2].G.animTokens;
      if(gamedata.length > 0){
        console.log("!!!!!Found valid animTokens!!!!!")
        storage = gamedata;
      }
  }
});

browser.runtime.onMessage.addListener(handleMessage);
function handleMessage(request, sender, sendResponse) {
  console.log(`A popup script sent a message: ${request.greeting}`);
  sendResponse({ response: storage });
}


