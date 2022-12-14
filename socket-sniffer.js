(function() {
    console.log("[*] Snifferfunction inside initial load")
    var OrigWebSocket = window.WebSocket;
    var callWebSocket = OrigWebSocket.apply.bind(OrigWebSocket);
    var wsAddListener = OrigWebSocket.prototype.addEventListener;
    wsAddListener = wsAddListener.call.bind(wsAddListener);
    console.log("[*] value: "+window.WebSocket);
    window.WebSocket = function WebSocket(url, protocols) {
      var ws;
      if (!(this instanceof WebSocket)) {
        // Called without 'new' (browsers will throw an error).
        ws = callWebSocket(this, arguments);
      } else if (arguments.length === 1) {
        ws = new OrigWebSocket(url);
      } else if (arguments.length >= 2) {
        ws = new OrigWebSocket(url, protocols);
      } else { // No arguments (browsers will throw an error)
        ws = new OrigWebSocket();
      }
      wsAddListener(ws, 'message', function(event) {
        //console.log("Received:", event);
        messageContentScript(event);

      });
      return ws;
    }.bind();
    console.log("[*] Checkpoint 3");
    window.WebSocket.prototype = OrigWebSocket.prototype;
    window.WebSocket.prototype.constructor = window.WebSocket;
  
    var wsSend = OrigWebSocket.prototype.send;
    wsSend = wsSend.apply.bind(wsSend);
    OrigWebSocket.prototype.send = function(data) {
      console.log("Sent:", data);
      return wsSend(this, arguments);
    };
  })();


function messageContentScript(myevent) {
  window.postMessage({
    direction: "from-page-script",
    message: JSON.parse(JSON.stringify(myevent.data))
  }, "*");
}

/*window.addEventListener("message", function(event) {
  if (event.source == window &&
      event.data.direction &&
      event.data.direction == "from-content-script") {
    alert("Page script received message: \"" + event.data.message + "\"");
  }
});*/