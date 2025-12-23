# What does this thing do?

> [!WARNING]
> This project no longer works, because codesnames.game now only send color information to the spymaster.

This is a firefox browser extension that displays the cardcolours for https://codenames.game.

When Codenames is initialized or reloaded, information about the colours of cards is submitted in the background. 
This extension listens to the websocket traffic and displays the content coloured in a popup.

I don't endorse cheating, what you do with this extension is up to you. For me it was a fun project to learn about extensions.


# How do I install it?
The simple way: https://addons.mozilla.org/en-US/firefox/addon/codenames-revealer/

The manual way:
1. Clone this repo or just download and unzip the zip file
2. In Firefox, go to `about:debugging` => "This Firefox" => "Load temporary Add-on"
3. Click on any file of the extension to choose it (e.g. the manifest.json)
4. A new icon should have appeared in the bar on the top right!
5. Load into a new game at https://codenames.game and click on the new icon
6. Profit! (Because it is a temporary extension, you need to reload it after restarting Firefox)
