//given an array of carddata, fill the popup table with colors
function paintTable(gameData) {
  gameData.coverCards.forEach(card => {
    const { index, color } = card;
    if (typeof index !== "number" || !color) return;
    const element = document.getElementById("f" + index);
    if (element) {
      element.className = color;
    }
  });
}


//whenever the popup is opened: Request gamedata. If available, paintTable
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