/*
Listen for messages from the page.
If the message was from the page script, show an alert.
*/
window.addEventListener("message", (event) => {
  console.log(JSON.stringify(event));
  console.log(JSON.stringify(event.data.direction));
  if (event.data.direction == "from-page-script") {
      console.log("Got message");
      console.log(JSON.stringify(event.data.message));
      console.log(JSON.stringify(event.data.message.data));
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