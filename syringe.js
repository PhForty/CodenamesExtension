//Syringe operation: Get socket-sniffer into page
console.log("[*] ----------Syringe initial load----------")
var s = document.createElement('script');
s.src = browser.runtime.getURL('socket-sniffer.js');
(document.head || document.documentElement).appendChild(s);


