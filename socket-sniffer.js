(function() {
    console.log("[*] Codenames Websocket-Sniffer loaded")
    var OrigWebSocket = window.WebSocket;
    
    window.WebSocket = function WebSocket(url, protocols) {
      console.log("[*] WebSocket Constructor Called");
      console.log("[*] URL:", url);
      console.log("[*] Protocols:", protocols);
      console.log("[*] Arguments:", arguments);
      
      var ws;
      try {
        if (!(this instanceof WebSocket)) {
          console.log("[*] Called without 'new'");
          ws = OrigWebSocket.apply(null, arguments);
        } else if (protocols !== undefined) {
          console.log("[*] Creating with protocols");
          ws = new OrigWebSocket(url, protocols);
        } else {
          console.log("[*] Creating without protocols");
          ws = new OrigWebSocket(url);
        }
        
        console.log("[*] WebSocket created successfully");
        
        ws.addEventListener('message', function(event) {
          console.log("[*] WebSocket Message:", event.data);
          messageContentScript(event);
        });
        
        ws.addEventListener('error', function(event) {
          console.error("[*] WebSocket Error Event:", event);
        });
        
        ws.addEventListener('open', function(event) {
          console.log("[*] WebSocket Opened Successfully");
        });
        
        ws.addEventListener('close', function(event) {
          console.log("[*] WebSocket Closed:", event.code, event.reason);
        });
        
        return ws;
        
      } catch(e) {
        console.error("[*] Error creating WebSocket:", e);
        console.error("[*] Error stack:", e.stack);
        throw e;
      }
    };
    
    window.WebSocket.prototype = OrigWebSocket.prototype;
    window.WebSocket.prototype.constructor = window.WebSocket;
    
    // Copy static properties
    var staticProps = Object.getOwnPropertyNames(OrigWebSocket);
    staticProps.forEach(function(prop) {
      if (prop !== 'prototype' && prop !== 'length' && prop !== 'name') {
        try {
          window.WebSocket[prop] = OrigWebSocket[prop];
        } catch(e) {}
      }
    });
})();

function messageContentScript(myevent) {
  window.postMessage({
    direction: "from-page-script",
    message: JSON.parse(JSON.stringify(myevent.data))
  }, "*");
}