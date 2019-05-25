// background.js

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
    // Send a message to the active tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
    });

});

// This block is new!
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request.message);
        if( request.message === "open_new_tab" ) {

            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

                var ruta = request.content;

                var enlace = document.createElement('a');

                enlace.href = ruta;

                enlace.download = ruta;

                document.body.appendChild(enlace);

                enlace.click();

                //Borrrar el elemento
                enlace.parentNode.removeChild(enlace);

                var activeTab = tabs[0];
                //chrome.tabs.sendMessage(activeTab.id, {"message": "completed", 'TabId':activeTab.id});
                var ext = request.filename.split('.').filter(x=> x.indexOf('mp4') >=0);
                if(ext.length === 0){
                    chrome.tabs.remove(activeTab.id, function() { });
                }
            });

        }
    }
);