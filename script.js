function build(value){
    //check if user has old browser
    if(document.all && !window.XMLHttpRequest){
        var page = document.createElement('div');
        
        page.setAttribute('id', 'main');
        var oldBrowserH1 = document.createElement('h1');
        var h1Content = document.createTextNode('Welcome!');
        oldBrowserH1.setAttribute('style', 'text-align:center');
        oldBrowserH1.appendChild(h1Content);

        var oldBrowserP = document.createElement('p');
        var pContent = document.createTextNode('Unfortunately your browser is not supported, ');
        oldBrowserP.appendChild(pContent);

        var oldBrowserA = document.createElement('a');
        oldBrowserA.href = 'https://www.mozilla.org/firefox';
        var oldBrowserAcontent = document.createTextNode('please upgrade your browser!');
        oldBrowserA.appendChild(oldBrowserAcontent);

        oldBrowserP.appendChild(oldBrowserA);
        document.getElementsByTagName('body')[0].appendChild(page);
        page.appendChild(oldBrowserH1);
        page.appendChild(oldBrowserP);
    }
    //user has modern browser, let er rip
    else{
        //user has already been here, show the welcome back screen
        if(localStorage.getItem('name') || document.cookie.indexOf('name') != -1){
            var wName;
            var wEmail;
            var wDest;
            //user's browser supports localStorage
            if(localStorage.getItem('name')){
                wName = localStorage.getItem('name');
                wEmail = localStorage.getItem('email');
                wDest = localStorage.getItem('destination');
            }
            //user's browser doesn't support localStorage, use cookies instead
            else if(document.cookie.indexOf('name') != -1){
                cook = document.cookie;
                var nam = cook.split(';');
                var nams = [];
                for(var i=0; i<nam.length; i++){
                    nams.push(nam[i].split('='));
                }
                wName = nams[0][1];
                wEmail = nams[1][1];
                wDest = nams[2][1];
            }
            //welcome back elements
            var page = document.createElement('div');
            page.setAttribute('id', 'main');
            var welcomeName = document.createElement('p');
            var welcomeEmail = document.createElement('p');
            var welcomeDest = document.createElement('p');
    
            welcomeName.appendChild(document.createTextNode('Welcome back '+wName+'!'));
            welcomeEmail.appendChild(document.createTextNode('We have your email as '+wEmail+'. This is the address we will email your choice, assuming you still want to go to '+wDest+'!'));
    
            page.appendChild(welcomeName);
            page.appendChild(welcomeEmail);
            document.getElementsByTagName('body')[0].appendChild(page);
    
            var picForm = document.createElement('form');
            
            var clearMyStuff = document.createElement('input');
            clearMyStuff.setAttribute('type', 'submit');
            clearMyStuff.setAttribute('value', 'I change my mind!');
            if(ieSeven){
                clearMyStuff.setAttribute('onclick', function(){
                    clearAll();
                });
            }
            else{
                clearMyStuff.setAttribute('onclick', 'clearAll()');
                
            }
            
            var keepMyStuff = document.createElement('input');
            keepMyStuff.setAttribute('type', 'submit');
            keepMyStuff.setAttribute('value', 'That is correct, send me another email.');
            if(ieSeven){
                keepMyStuff.setAttribute('onclick', function(){
                    alert('this would send an email');
                });
            }
            else{
                keepMyStuff.setAttribute('onclick', 'alert(\'this would send and email\')');
                
            }
            
            document.getElementsByTagName('body')[0].appendChild(picForm);
            picForm.appendChild(clearMyStuff);
            picForm.appendChild(keepMyStuff);
            showResortImage(wDest);
        }
        //first time to the site, main section of code
        else{
            var dest;
            var destinations = new Object();
            var imgs = new Object();
            //data
            destinations['init'] = ['Choose a Destination!', 'Mainland', 'Island'];
                destinations['Mainland'] = ['Choose Country', 'Mexico', 'Costa Rica', 'Belize', 'Panama'];
                    destinations['Mexico'] = ['Choose Resort', 'Hard Rock Hotel, Cancun', 'Hard Rock Hotel, Xcaret'];
                    destinations['Costa Rica'] = ['Choose Resort','Baldi, Costa Rica', 'Finca Rosa Blanca, Costa Rica'];
                    destinations['Belize'] = ['Choose Resort','Turtle Inn, Belize', 'Cayo Espanto, Belize'];
                    destinations['Panama'] = ['Choose Resort','Isla Secas, Panama', 'El Porvenir, Panama'];
                destinations['Island'] = ['Choose Country', 'Dominican Republic', 'Puerto Rico', 'Cuba', 'Jamaica', 'Haiti', 'Bahamas', 'Aruba'];
                    destinations['Dominican Republic'] = ['Choose Resort', 'Bayahibe, Dominican Republic', 'Bahia, Dominican Republic'];
                    destinations['Puerto Rico'] = ['Choose Resort', 'La Concha, Puerto Rico', 'El Conquistador, Puerto Rico'];
                    destinations['Cuba'] = ['Choose Resort', 'Sandals, Cuba', 'Casilda, Cuba'];
                    destinations['Jamaica'] = ['Choose Resort', 'Sandals, Jamaica', 'Enchanted Gardens, Jamaica'];
                    destinations['Haiti'] = ['Choose Resort', 'Labadee, Haiti', 'Club Orient, Haiti'];
                    destinations['Bahamas'] = ['Choose Resort', 'Blue Lagoon, Bahamas', 'Atlantis, Bahamas'];
                    destinations['Aruba'] = ['Choose Resort', 'Hotel Tamarjin, Aruba', 'Hotel Riu Palace, Aruba'];
            backgroundImgs = ['images/backgroundimages/1.jpg','images/backgroundimages/2.jpg','images/backgroundimages/3.jpg','images/backgroundimages/4.jpg','images/backgroundimages/5.jpg','images/backgroundimages/6.jpg',
                            'images/backgroundimages/7.jpg','images/backgroundimages/8.jpg','images/backgroundimages/9.jpg','images/backgroundimages/16.jpg','images/backgroundimages/11.jpg','images/backgroundimages/12.jpg',
                            'images/backgroundimages/13.jpg','images/backgroundimages/14.jpg','images/backgroundimages/15.jpg','images/backgroundimages/10.jpg','images/backgroundimages/17.jpg','images/backgroundimages/18.jpg',
                            'images/backgroundimages/19.jpg','images/backgroundimages/20.jpg','images/backgroundimages/21.jpg','images/backgroundimages/22.jpg','images/backgroundimages/23.jpg','images/backgroundimages/24.jpg',
                            'images/backgroundimages/25.jpg','images/backgroundimages/26.jpg','images/backgroundimages/27.jpg','images/backgroundimages/28.jpg','images/backgroundimages/29.jpg','images/backgroundimages/30.jpg',
                            'images/backgroundimages/31.jpg','images/backgroundimages/32.jpg','images/backgroundimages/33.jpg','images/backgroundimages/34.jpg','images/backgroundimages/35.jpg','images/backgroundimages/36.jpg',
                            'images/backgroundimages/37.jpg','images/backgroundimages/38.jpg','images/backgroundimages/39.jpg','images/backgroundimages/40.jpg'];
            //reverse for better pics on top layers
            backgroundImgsRev = backgroundImgs.reverse();
    
            //checks if value is set(passed in). If set, we're on the second select menu, so grab new info and keep going
            if(value){
                dest = destinations[value.value];
                
                while(value!== value.parentNode.lastChild){
                    value.parentNode.removeChild(value.parentNode.lastChild);
    
                    if(document.getElementById('details')){
                        var contact = document.getElementById('details');
                        contact.parentNode.removeChild(contact);
                    }
                }
            }
            //this is the initial pass through the form. Create the form, set the name, stick it on the page
            else{
                dest = destinations['init'];
    
                var form = document.createElement('form');
                
                form.setAttribute('name', 'my-form');
                document.getElementsByTagName('body')[0].appendChild(form);
    
                var intro = document.createElement('h2');
                intro.appendChild(document.createTextNode('Add a memory to your collection!'));
                form.appendChild(intro);
                
                //background pictures setup
                var vPositions = [];
                var hPositions = [];
                var rPositions = [];
                for(var j = 0; j < 41; j++){
                    var vPositions;
                    var vRand = Math.random()*73;
                    var hRand = Math.random()*67;
                    var rRand = Math.floor(Math.random() * 35) - 10;
                    vPositions.push(vRand);
                    hPositions.push(hRand);
                    rPositions.push(rRand);
                }
    
                //put background pictures on the page
                for(var i = 0; i < backgroundImgs.length; i++){
                    var backgroundImg = document.createElement('img');
                    backgroundImg.setAttribute('src', backgroundImgsRev[i]);
                    backgroundImg.setAttribute('alt', 'BackgroundImages');
                    backgroundImg.setAttribute('class', 'backgroundImage');
                    document.getElementsByTagName('body')[0].appendChild(backgroundImg);
                    backgroundImg.style.position='absolute'
                    backgroundImg.style.top=vPositions[i]+'%';
                    backgroundImg.style.left=hPositions[i]+'%';
                    backgroundImg.style.transform='rotate('+rPositions[i]+'deg)';
                    backgroundImg.style.zIndex='-3';
                    backgroundImg.style.border='1px solid black';
                    backgroundImg.style.boxShadow='.5px .5px #333';
                }
                
            }
            //as long as dest is defined(dest becomes undefined at the end of the data), keep going down the tree
            if(typeof(dest) !== 'undefined'){
                var select = document.createElement('select');
                if(ieSeven){
                    select.setAttribute('onchange', function(){
                        build(this);
                    });
                }
                else{
                    select.setAttribute('onchange', 'build(this)');
                }
                
                for (var i = 0; i < dest.length; i++) {
                    var option = document.createElement("option");
                    option.value = dest[i];
                    var opt = document.createTextNode(dest[i]);
                    //disables first value in each select
                    if(option.value == 'Choose a Destination!' || option.value == 'Choose Country' || option.value == 'Choose Resort'){
                        option.disabled = true;
                        option.selected = 'selected';
                    }
                    select.appendChild(option);
                    option.appendChild(opt);
                }
                document.getElementsByTagName('form')[0].appendChild(select);
                
                //show images as you click through
                if(typeof(value) !== 'undefined'){
                    var img = document.createElement('img');
                    img.setAttribute('src', 'images/destinationimages/'+ value.value + 'small.jpg');
                    img.setAttribute('alt', value.value);
                    img.setAttribute('class', 'image');
                    img.setAttribute('id', value.value);
                    document.getElementsByTagName('form')[0].appendChild(img);
                    //shows and animates image
                    showImages(value.value);
                }
                
            }
            //dest is undefined at the end of the data tree
            else{
                //show the contact form at the end of the tree
                var infoForm = document.createElement('form');
                infoForm.setAttribute('name', 'user-details');
                infoForm.setAttribute('id', 'details');
    
                var formName   = document.createElement('input');
                var nameLabel  = document.createElement('label');
                
                var formEmail  = document.createElement('input');
                var emailLabel = document.createElement('label');
                
                var submit = document.createElement('input');
                submit.setAttribute('type', 'submit');
                submit.setAttribute('value', 'Save my info!');
                submit.onclick = function(event){
                    if(ieSeven){
                        var naim = document.getElementsByTagName('input')[0].value;
                        var emale = document.getElementsByTagName('input')[1].value;
                        document.cookie = 'name=' + naim;
                        document.cookie = 'email=' + emale;
                        document.cookie = 'destination=' + value.value;
                    }
                    else{
                        localStorage.setItem('name', document.getElementsByTagName('input')[0].value);
                        localStorage.setItem('email', document.getElementsByTagName('input')[1].value);
                        localStorage.setItem('destination', value.value);
                    }
                }
                
                //formatting breaks
                var brake = document.createElement('br');
                var brake2 = document.createElement('br');
                
                //contact form
                document.getElementsByTagName('body')[0].appendChild(infoForm);
    
                    document.getElementsByTagName('form')[1].appendChild(nameLabel);
                    document.getElementsByTagName('form')[1].appendChild(formName);
    
                    document.getElementsByTagName('form')[1].appendChild(brake);
    
                    document.getElementsByTagName('form')[1].appendChild(emailLabel);
                    document.getElementsByTagName('form')[1].appendChild(formEmail);
    
                    document.getElementsByTagName('form')[1].appendChild(brake2);
    
                    document.getElementsByTagName('form')[1].appendChild(submit);
    
                var name = document.createTextNode('Enter your name!');
                var email = document.createTextNode('Enter your email address!');
                document.getElementsByTagName('label')[0].appendChild(name);
                document.getElementsByTagName('label')[1].appendChild(email);

                //shows and animates the final image for the resort
                showResortImage(value.value);
            }
        }
    }
}
function showImages(selection){
    var whichImage = document.getElementById(selection);
    whichImage.style.display = 'block';
    whichImage.style.position = 'absolute';
    
    if(selection === 'Mainland' || selection === 'Island'){
        whichImage.style.left='0px';
        whichImage.style.zIndex='-1';
        moveImagesRight(whichImage);    
    }
    else{
        whichImage.style.right='0px';
        whichImage.style.zIndex='-2';
        moveImagesLeft(whichImage);
    }
}

function moveImagesLeft(which){
    if(parseInt(which.style.right) < 200){
        which.style.right=parseInt(which.style.right)+10+'px';
        which.style.transform = "rotate(-"+ deg +"deg)";
        if(deg > 80){
            deg = 20;
        }
        else{
            deg = deg + 15;
        }
        setTimeout(function(){moveImagesLeft(which)},20);
    }
}
var deg = 0;
function moveImagesRight(which){
    if(parseInt(which.style.left) < 200){
        which.style.left=parseInt(which.style.left)+10+'px';
        which.style.transform = "rotate("+ deg +"deg)";
        if(deg > 80){
            deg = 20;
        }
        else{
            deg = deg + 15;
        }
        setTimeout(function(){moveImagesRight(which)},20);
    } 
}
function showResortImage(imge){
    var imag = document.createElement('img');
        imag.setAttribute('src', 'images/destinationimages/'+ imge + 'small.jpg');
        imag.setAttribute('alt', imge);
        imag.setAttribute('class', 'image');
        imag.setAttribute('id', imge);
        document.getElementsByTagName('form')[0].appendChild(imag);
    
    imag.style.display = 'block';
    imag.style.position = 'absolute';
    imag.style.zIndex = '-1';
    imag.style.left = '0px';
    imag.style.top = '0px';
    imag.style.border = '3px solid black';
    imag.style.height = '100px';
    imag.style.width = '350px';
    moveDestImage(imag);

    //yeah i know, if this is still here I never got around to fixing it
    function moveDestImage(which){
        if(parseInt(imag.style.height) < 500){
            //console.log(parseInt(imag.style.height));
            imag.style.height=parseInt(imag.style.height)+10+'px';
            imag.style.width=parseInt(imag.style.height)+10+'px';
            imag.style.left=parseInt(imag.style.left)+10+'px';
            imag.style.top=parseInt(imag.style.top)+10+'px';
            imag.style.transform = "rotate("+ deg +"deg)";
            if(deg > 80){
                deg = 20;
            }
            else{
                deg = deg + 15;
            }
            setTimeout(function(){moveDestImage(which)},20);
        } 
    }
    imag.style.border = '20px solid white';
}
function clearAll(){
    if(ieSeven){
        document.cookie = 'name=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = 'email=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = 'destination=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    }
    else{
        localStorage.clear();
    }
}