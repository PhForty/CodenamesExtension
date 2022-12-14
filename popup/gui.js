//tabs[0].id

/*
Listen for messages from the page.
If the message was from the page script, show an alert.
*/
//TODO: gui.js sieht nicht gui.html und kann dementsprechend dort keine Attribute setzen.
  //Theorie: gui.js wird im manifest als content_script geladen, ist also bereits vorher da? Das ist aber notwendig, damit es Nachrichten empfangen kann.
  //Evt. muss die Nachrichtenstruktur vollständig umgestellt werden?
  //Evt. ist es über die browser.tabs API möglich, dass popup zu verändern
window.addEventListener("message", (event) => {
  if (event.data.direction == "from-page-script") {
      console.log("Got message");
      gamedata = JSON.parse((event.data.message).slice(13))[2].G.animTokens;
      if(gamedata.length > 0){
        console.log("!!!!!Found valid animTokens!!!!!")
        gamedata.forEach(element => {
          console.log(element);
          if (element.id.split('/')[0] === "coverCard"){
            color = element.id.split('/')[1];
            number = element.id.split('/')[2];
            
            //console.log(number+ " exists: "+tabs[0].id.getElementById("title"));
          }
        });
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