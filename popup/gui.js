/*
Listen for messages from the page.
If the message was from the page script, show an alert.
*/
window.addEventListener("message", (event) => {
  console.log("gui.js RECEIVED:", event);
  if (event.data.direction == "from-page-script") {
      console.log("Got message");
      //console.log(event.data.message);
      //console.log("4: "+JSON.parse((event.data.message).slice(13))[2].G.animTokens);

      gamedata = JSON.parse((event.data.message).slice(13))[2].G.animTokens;
      console.log("Gamedata2: "+gamedata);
      if(gamedata.length > 0){
        console.log("!!!!!Found valid animTokens!!!!!")
      }
  }
});


/*
Send a message to the page script.
*/
function messagePageScript() {
  window.postMessage({
    direction: "from-content-script",
    message: "Message from the content script"
  }, "https://codenames.game");
}