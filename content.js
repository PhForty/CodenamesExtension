//Immediate injection
(function() {
    var s = document.createElement('script');
    s.src = browser.runtime.getURL('socket-sniffer.js');
    s.onload = function() {
        console.log("[*] Socket sniffer injected successfully");
    };
    (document.head || document.documentElement).appendChild(s);
})();

//Store carddata, whenever it is received by socket-sniffer
var storage;
window.addEventListener("message", (event) => {
  if (event.data.direction == "from-page-script") {
    try {
      gamedata = JSON.parse((event.data.message).slice(8))[2].state.G;
      console.log("[*] Spielstatus wurden gefunden!")
      storage = gamedata;
    } catch (e) {
      console.log("[*] ERROR during JSON parsing of gamedata.")
    }
  }
});

//Send carddata to popup, whenever requested
browser.runtime.onMessage.addListener(handleMessage);
function handleMessage(request, sender, sendResponse) {
  sendResponse({ response: storage });
}