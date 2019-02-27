

function build(value){

    var dest;
    var destinations = new Object();
    var imgs = new Object();
    //data
    destinations['init'] = ['Choose a Destination!', 'Mainland', 'Island'];
        destinations['Mainland'] = ['Choose Country', 'Mexico', 'Costa Rica', 'Belize', 'Panama'];
            destinations['Mexico'] = ['Choose Resort', 'Hard Rock Hotel, Cancun', 'Mexican Resort 2'];
            destinations['Costa Rica'] = ['Choose Resort','Costa Rican Resort 1', 'Costa Rican Resort 2'];
            destinations['Belize'] = ['Choose Resort','Belizian Resort 1', 'Belizian Resort 2'];
            destinations['Panama'] = ['Choose Resort','Panamanian', 'Panamanian Resort 2'];
        destinations['Island'] = ['Choose Country', 'Dominican Republic', 'Puerto Rico', 'Cuba', 'Jamaica', 'Haiti', 'Barbados', 'Aruba', 'Cayman Islands'];
            destinations['Dominican Republic'] = ['Choose Resort', 'Dominican Resort 1', 'Dominican Resort 2'];
            destinations['Puerto Rico'] = ['Choose Resort', 'Puerto Rican Resort 1', 'Puerto Rican Resort 2'];
            destinations['Cuba'] = ['Choose Resort', 'Cuban Resort 1', 'Cuban Resort 2'];
            destinations['Jamaica'] = ['Choose Resort', 'Jamacian Resort 1', 'Jamaican Resort 2'];
            destinations['Haiti'] = ['Choose Resort', 'Hatian Resort 1', 'Hatian Resort 2'];
            destinations['Barbados'] = ['Choose Resort', 'Barbadosian Resort 1', 'Barbadosian Resort 2'];
            destinations['Aruba'] = ['Choose Resort', 'Aruban Resort 1', 'Aruban Resort 2'];
            destinations['Cayman Islands'] = ['Choose Resort', 'Cayman Resort 1', 'Cayman Resort 2'];
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
        //var main = document.createElement('div');
        //main.setAttribute('class', 'main');

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
    //as long as dest is defined, keep going down the tree
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
            
            //var option = new Option(dest[i], dest[i]);
            
            option.value = dest[i];
            //option.text = dest[i];
            option.innerHTML = dest[i];
            if(option.value == 'Choose a Destination!' || option.value == 'Choose Country' || option.value == 'Choose Resort'){
                option.disabled = true;
                option.selected = 'selected';
            }
            select.appendChild(option);
        }
        document.getElementsByTagName('form')[0].appendChild(select);
        
        //show images as you click through --NOT WORKING IN IE
        var img = document.createElement('img');
        img.setAttribute('src', 'images/destinationimages/'+ value.value + 'small.jpg');
        img.setAttribute('alt', value.value);
        img.setAttribute('class', 'image');
        img.setAttribute('id', value.value);
        document.getElementsByTagName('form')[0].appendChild(img);
        showImages(value.value);//shows and animates image
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

        document.getElementsByTagName('body')[0].appendChild(infoForm);

            document.getElementsByTagName('form')[1].appendChild(nameLabel);
            document.getElementsByTagName('form')[1].appendChild(formName);

            document.getElementsByTagName('form')[1].appendChild(emailLabel);
            document.getElementsByTagName('form')[1].appendChild(formEmail);

            document.getElementsByTagName('form')[1].appendChild(submit);
        

        //document.getElementsByTagName('label')[0].textContent='Enter your name!';
        //document.getElementsByTagName('label')[1].textContent='Enter your email address!';
        document.getElementsByTagName('label')[0].innerHTML='Enter your name!';
        document.getElementsByTagName('label')[1].innerHTML='Enter your email address!';
        
        console.log(value.value);
        //createImage(value);
        showResortImage(value.value);
    }
}
function showImages(selection){
    //console.log('passing to showImages: ' + selection);
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
    //console.log(parseInt(which.style.right));
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
        //console.log(parseInt(which.style.right));
    }
}
var deg = 0;
function moveImagesRight(which){
    //console.log(parseInt(which.style.left));
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
        //console.log(parseInt(which.style.left));
        //console.log(deg);
        
    } 
}
function undoMoveImagesRight(which){
    //console.log(which);
    //console.log(document.getElementById('island').style.left);
    if(parseInt(which.style.left) > 199){
        //console.log('triggered');
        which.style.left=parseInt(which.style.left)-10+'px';
        which.style.transform='rotate(-10deg)';
        setTimeout(function(){undoMoveImagesRight(which)},20);
        //console.log(parseInt(which.style.left));
    }
}
function undoMoveImagesLeft(){
    //console.log(parseInt(island.style.right));
    if(parseInt(which.style.right) > 199){
        which.style.right=parseInt(which.style.right)-10+'px';
        which.style.transform='rotate(10deg)';
        setTimeout(function(){undoMoveImagesLeft(which)},20);
        //console.log(parseInt(which.style.right));
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

    function moveDestImage(which){
        if(parseInt(imag.style.height) < 500){
            console.log(parseInt(imag.style.height));
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