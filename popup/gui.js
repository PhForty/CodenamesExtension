//tabs[0].id

/*
Listen for messages from the page.
If the message was from the page script, show an alert.
*/
function paintTable(gamedata){
  gamedata.forEach(element => {
    console.log(element);
    if (element.id.split('/')[0] === "coverCard"){
      color = element.id.split('/')[1];
      number = element.id.split('/')[2];
      document.getElementById("f"+number).setAttribute("class", color);
    }
  });
}

function getInfo(){
  var query = browser.tabs.query({currentWindow: true, active : true});
  var tab = query.then(getTab,onError);

  function getTab(tabs) {
      for (let tab of tabs){
          send(tab.id);
      }
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  function send(tab){
    browser.tabs
      .sendMessage(tab, {greeting: "Greeting from the popup script"})
      .then((response) => {
        console.log("Response from content-skript!");
        paintTable(response.response);
      })
      .catch(onError);
  }
}
window.onload = getInfo();
