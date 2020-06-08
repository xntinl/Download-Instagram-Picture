// content.js
function download(content, filename)
{
    var a = $("<a>")
        .attr("href", content)
        .attr("target", "_blank")
        .attr("download", filename)
        .appendTo("body");

    a[0].click();

    a.remove();
    if (content.indexOf('whatsapp') === -1) {
        chrome.runtime.sendMessage({"message": "open_new_tab", "content": content, "filename":filename});
    }
}

document.addEventListener('contextmenu', (event) => {
    const elements = document.elementsFromPoint(event.clientX, event.clientY);
    const mediaSource = elements.find(element => /img|video/gi.test(element.tagName)).getAttribute('src');

var fileName = mediaSource.split('/').pop().split('?')[0];
    if (mediaSource.indexOf('instagram') > -1 || mediaSource.indexOf('scontent') > -1 || mediaSource.indexOf('whatsapp') > -1) {
        download(mediaSource, fileName);
    }

/** Para abrir en otra ventana **/
//uriContent = "data:application/octet-stream," + mediaSource;
//newWindow = window.open(uriContent, 'neuesDokument');
//mediaSource && window.open(uriContent, 'neuesDokument');

});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if( request.message === "clicked_browser_action" ) {
            var firstHref = $("a[href^='http']").eq(0).attr("href");

            console.log(firstHref);

            // This line is new!
            chrome.runtime.sendMessage({"message": "open_new_tab", "url": firstHref});
        }
    if( request.message === "completed" ){
        chrome.tabs.remove(request.TabId, function() { });
    }
    }
);