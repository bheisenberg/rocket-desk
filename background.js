// A function to use as callback
function printContent (content) {
    console.log('Received:\n' + content);
}

function format (tabId) {
	chrome.tabs.sendMessage(tabId, {text: 'update'}, printContent);
}

// When the browser-action button is clicked...
chrome.browserAction.onClicked.addListener(function (tab) {
    format(tab.id);
});

function getDOM(url)
{
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET",url,false);
    xmlhttp.send();
    parser = new DOMParser();
    return parser.parseFromString(xmlhttp.responseText,"text/html");
}

function inMyBR(myBRPage)
{
    var results = myBRPage.getElementsByClassName('list-group-item-heading');
    return (results.length > 0);
}

function getFirstResult(DOM)
{
    var result = myBRPage.getElementsByClassName('col-md-10')[0].outerHTML;
    console.log(result);
    return result;
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    //setTimeout(format, 1000, tabId
      myBRPage = getDOM('http://my.blackrocket.com/users?search=eisenberg');
      console.log('Found in myBR: '+inMyBR(myBRPage));
      getFirstResult(myBRPage);
      format(tab.id);
  }
});