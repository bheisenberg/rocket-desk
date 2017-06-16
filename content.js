// Listen for messages
var nameDiv = "name ng-binding";

function update(sendResponse)
{
    if(document.getElementsByClassName(nameDiv).length > 0)
    {
        var text = document.getElementsByClassName("name ng-binding")[0].innerText;
        var name = getName(text);
        var url = "http://my.blackrocket.com/users?search=" + name;
        var code = '<a href=' +url+ ' target="_blank">' + text + '</a>';
        document.getElementsByClassName("name ng-binding")[0].innerHTML = code;
        //sendResponse(inMyBR(getDOM(url)));
        sendResponse(url);
    }
}

function getName(text)
{
    var name_split = text.split(" ");
    if(name_split.length === 2)
    {
        return name_split[1] + name_split[0].charAt(0);
    }
    else if (name_split.length > 2)
    {
        if(name_split[0].includes(".")) return name_split[2] + name_split[1].charAt(0);
        else return name_split[2] + name_split[0].charAt(0);
    }
    else
    {
        return text;
    }
}

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


chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse)
{
    if (msg.text === 'update') {
        //send = sendResponse;
    	update(sendResponse);
    }
});