/**
 *@author Jake O'Connor
 * ISTE-340 Project 1
 */
var imageChanged = false;

function BuildSelectElement(which) {
    document.getElementById("guestName").value = "";

    var newObject = new Object();
    newObject = obj[which.value];

    //Removes other dropdowns if earlier dropdown is changed.
    if (which !== 'start' && which !== which.parentNode.lastChild) {
        removeDropdown(which);
    }

    //Checks to see if function param is not 'start'.
    if (which !== 'start') {
        //Checks if newObject contains options
        if(newObject === undefined) {
            if (which.value.indexOf('select') >= 0) { }
            else {
                setResultImage(which);
            }
        }

        //Create new select elemenent and add listener for selection.
        var selectElement = document.createElement("select");
        selectElement.addEventListener('change', function() { BuildSelectElement(this); }, false);
        selectElement.id = "" + which.value;

        if (obj[which.value] === undefined) { return; }

        //Get select options add new select element to the end of div.
        getOptions(obj[which.value], newObject, selectElement);
        document.getElementById('main').appendChild(selectElement);
    }
    else {
        //Loads users favorite home time stamp.
        loadFavorite();

        var newObject2 = new Object();
        newObject2 = obj['start'];

        //Create new select elemenent and add listener for selection.
        var selectElement = document.createElement("select");
        selectElement.addEventListener('change', function() { BuildSelectElement(this); }, false);
        getOptions(obj['start'], newObject2, selectElement);
    }

    //Add first select element to the end of the div.
    document.getElementById('main').appendChild(selectElement);
}

//Builds the select options.
function getOptions(object, newObject, selectElement) {
    for (i = 0; i < object.length; i++) {
        var optionValue = document.createElement("option");
        optionValue.setAttribute("value", "" + newObject[i]);
        optionValue.textContent = "" + newObject[i];
        selectElement.appendChild(optionValue);
    }
}

//Helper function to remove children dropdowns if user starts over.
function removeDropdown(which) {
    while (which !== which.parentNode.lastChild) {
        which.parentNode.removeChild(which.parentNode.lastChild);
    }
    document.getElementById('result').getElementsByTagName('img')[0].src = "images/default.png";
    imageChanged = false;
}

//Helper function to set the result image when a home has been selected.
function setResultImage(which) {
    document.getElementById('result').getElementsByTagName('img')[0].src = "images/" + which.value + ".png";
    imageChanged = true;
}

//Validates name and uses as param to place the name in the body as welcome message.
function postName() {
    var nameOutput = document.getElementById("guestName").value;
    if (nameOutput === "") {
        alert("Please type your name in.");
        return false;
    }
    setCookie('name', nameOutput);
    placeName(nameOutput);
}

//Displays welcome message with name from form, then removes the form.
function placeName(nameOutput) {
    var outputNode = document.createTextNode("Let's find your home together, " + nameOutput + "!");
    var resultParent = document.getElementById("welcome");
    resultParent.appendChild(outputNode,resultParent.childNodes[0]);
    document.getElementById("guestName").style.display = "none";
    document.getElementById('submitButton').style.display = "none";
    houseSlide();
    moveHouseIn();
}

var today = new Date();
var expire = new Date(today.getTime() + 365 * 24 * 60 * 60 * 1000);
function getCookieVal (offset) {
    var endstr = document.cookie.indexOf (";", offset);
    if (endstr === -1) {
        endstr = document.cookie.length;
    }
    return unescape(document.cookie.substring(offset, endstr));
}

//Gets cookie for saved home.
function getCookie (name) {
    var arg = name + "=";
    var arglen = arg.length;
    var cookielen = document.cookie.length;
    var i = 0;
    while (i < cookielen) {
        var j = i + arglen;
        if (document.cookie.substring(i, j) === arg) {
            return getCookieVal (j);
        }
        i = document.cookie.indexOf(" ", i) + 1;
        if (i === 0) break;
    }
    return null;
}

//Removes cookies.
function deleteCookie (name, path, domain) {
    if (getCookie(name)) {
        document.cookie = name + "=" +
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") +
            "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}

//Sets the cookie.
function setCookie (name, value, expires, path, domain, secure) {
    document.cookie = name + "=" + escape (value) +
        ((expires) ? "; expires=" + expires.toGMTString() : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
}

//Load and display the day that the user last saved a favorite.
function loadFavorite() {
    document.getElementById('time').appendChild(document.createTextNode(getCookie('timestamp')));

    if(getCookie('timestamp') !== null) {
        document.getElementById('time').textContent = "" + getCookie('timestamp');
    }
    else {
        document.getElementById('time').textContent = "No Saved Favorite.";
    }
}

//Set cookie var to the current result so it can be referenced with Show Favorite button.
//Validate name and home has been selected before storing cookie.
function setFavorite() {
    //validate user selected home.
    if (imageChanged === false) {
        alert("You must select a home first.");
        return;
    }

    var dateStamp = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear().toString().substr(2,2);
    setCookie('favorite', "" + document.getElementById('result').getElementsByTagName('img')[0].src);
    setCookie('timestamp', "Date: "+ dateStamp);

    //refresh the date display.
    loadFavorite();
}

//Display the last saved home. Displays "No Saved Favorite" if function has not been used.
function getFavorite() {
    if(getCookie('favorite') !== null) {
        document.getElementById('result').getElementsByTagName('img')[0].src = "" + getCookie('favorite');
    }
}

//clears the favorite by removing the cookies.
function clearFavorite() {
    deleteCookie('favorite');
    deleteCookie('timestamp');
    deleteCookie('name');
    window.location.reload();
}


function houseSlide() {
    var houseEmoji = document.getElementById("houseEmoji");
    var position = 0;
    var id = setInterval(frame, 10);

    function frame() {
        if (position === 130) {
            clearInterval(id);
        }
        else {
            position++;
            houseEmoji.style.left = position + 'px';
        }
    }
}

//Slide element from left to right
function moveHouseIn(){
    var element = document.getElementById('houseEmoji');
    if(parseInt(element.style.left) < 100){
        element.style.left = parseInt(element.style.left) + 1 + 'px';
        setTimeout(function() { moveHouseIn(); }, 0);
    }
}