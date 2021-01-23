    class card {
            
            constructor(title, description, descrText, type){
                this.title = title;
                this.description = description;
                this.type = type;
                this.picked = false;
                this.header = this.title + "header";
                this.id = this.title;
                this.idDROPDOWN = this.title + "DROPDOWN";
                this.idNum = 0;
                this.groupID = "";
                this.descrText = descrText;
            }
                
            updateID(){
                this.id = this.title + this.idNum;
                this.idDROPDOWN = this.title + "DROPDOWN" + this.idNum;
            }
      
}


class dndClass {
            
            constructor(name, HP, d, AC, STR, DEX, CON, INT, WIS, CHAR, save1, save2){
                this.name = name;
                this.d = d;
                this.AC = AC;
                this.STR = STR;
                this.DEX = DEX;
                this.CON = CON;
                this.INT = INT;
                this.WIS = WIS;
                this.CHAR = CHAR;
                        
                this.STRmod = calcModifier(STR);
                this.DEXmod = calcModifier(DEX);
                this.CONmod = calcModifier(CON);
                this.INTmod = calcModifier(INT);
                this.WISmod = calcModifier(WIS);
                this.CHARmod = calcModifier(CHAR);
                
                this.save1 = save1;
                this.save2 = save2; 
                
                this.HP = HP + this.CONmod;  
                
                this.type = "character";
                
                this.charName = "";

            }
      
}
    



 //https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_draggable
    const container = document.querySelector(".container");
        
    var notes = 0; // tracks the number of notes so they all get a unique ID
    var pCardNum = 0; //tracks number of player cards on the table

//title, description for card, description for madlibs, type
    var situationCards = [new card("BANDITS","They're here to rough you up.", "", "situation"),
                         new card("DEAD BODY","Do you want to investigate? There may be troublesome people about!",  "", "situation"),
                         new card("BURGLAR","He jumps out from the bushes and goes: \"AAAH!!\"",  "", "situation"),
                         new card("FAIRIES","Fluttering around the forest, you think they're all right. For a second.",  "", "situation"),
                         new card("KNIGHT","He challenges you to a duel.",  "", "situation"),
                         new card("KING","He asks you to bring an expensive diamond to the next town over.",  "", "situation"),
                         new card("ABANDONED TOWN","There doesn't seem to be anyone here, but everything's left in place.",  "", "situation"),
                         new card("LOST TRADESMAN","\"Want any wares?\" they ask. \"I've got the wares if you've got the coin.\"",  "", "situation")];
    
    var settingCards = [new card("BOHEMIA","A beautiful place, medieval Europe.",  "", "setting"),
                       new card("TULANE","A countryside in an unknown country.",  "", "setting"),
                       new card("AESHIRE","Hawaii, but only the big island.",  "", "setting"),
                       new card("EELSTRITCH","A group of 10 islands, all about a half hour boat ride apart.",  "", "setting"),
                       new card("WOODLAND","Literally just forests, forests forever.",  "", "setting"),
                       new card("NEW JERSEY","Central jersey.",  "", "setting")];
        
    
        
    var itemCards = [new card("SWORD", "just something cool to swing around",  "", "item"),
                     new card("HEALTH POTION", "lucky for you, you'll be needing it!",  "", "item"),
                     new card("RING FROM MOTHER","No real purpose, but it\'s sentimental.",  "", "item"),
                     new card("A COOL HAT", "It's just a cool tophat, like Professor Layton's.",  "", "item")];
        
    var startingCards = [new card("UNDERGROUND","Where could you be? It's awfully dark down here.",  "being stuck somewhere underground, where it's dark and damp", "starting"),
                       new card("JAIL","Framed for a crime they may or may not have comitted, the players find themselves in a jail cell.",  "being framed for a crime you all may or may not have committed", "starting"),
                       new card("AFTER BATTLE","There's just... blood everywhere. And the players are the only survivors.",  "just winning a battle over the country's capital", "starting"),
                       new card("CASTLE","It's a bustling place, perhaps they're getting ready for a party.",  "meeting eachother in the entrance to a castle", "starting"),
                       new card("HUT IN WOODS","It seems like someone was just here, but you can't remember who it was.",  "meeting each other near a hut in the woords, unsure of what the hut is for", "starting"),
                       new card("TOWN HALL","There seems to be a meeting going on.",  "meeting at a town hall meeting in the center of the community", "starting"),
                       new card("FOREST CLEARING","Lots 'o forests, lots 'o game.",  "finding yourselves in a clearing in the forest, surrounded by tall trees and magical fairies", "starting"),
                       new card("CAVE","Oh how SCARRRIEEE", "finding yourselves stuck together in a cave", "starting"),
                       new card("TAVERN","here's a wee baby tavern!", "drinking together in your favorite local tavern", "starting")];

    var monsterCards = [new card("monster 1","spook",  "", "monster"),
                        new card("monster 2","spook",  "", "monster"),
                       new card("monster 3","spook",  "", "monster"),];

    var goalCards = [new card("BE RICH","Just find all the gold or something.",  "to become pretty rich", "goal"),
                       new card("BE RICHER","Just find all the gold or something.",  "to become even more rich than before", "goal"),
                       new card("BE RICHEST","Just find all the gold or something.",  "to become the richest person in the land", "goal")];
        
        var cardsSHOWING = [];
        
                                    //15 14 13 12 10 8
                                    //name, HP, d, AC, STR, DEX, CON, INT, WIS, CHAR, save1, save2
        var classes = [new dndClass("Barbarian", 12, 8, 0, 15, 12, 14, 10, 8, 13, "STR", "CON"),
                       new dndClass("Bard", 8, 8, 0, 8, 14, 10, 12, 13, 15, "DEX", "CHAR"),
                       new dndClass("Cleric", 8, 8, 0, 12, 10, 15, 14, 13, 8, "WIS", "CHAR"),
                       new dndClass("Druid", 8, 8, 0, 10, 12, 8, 14, 15, 13, "INT", "WIS"),
                       new dndClass("Fighter", 10, 10, 0, 15, 13, 14, 10, 12, 8, "STR", "CON"),
                       new dndClass("Monk", 8, 8, 0, 13, 15, 10, 8, 14, 12, "STR", "DEX"),
                       new dndClass("Paladin", 10, 10, 0, 13, 10, 8, 12, 14, 15, "WIS", "CHAR"),
                       new dndClass("Ranger", 10, 10, 0, 14, 15, 8, 10, 13, 12, "STR", "DEX"),
                       new dndClass("Rogue", 8, 8, 0, 12, 15, 10, 14, 13, 8, "DEX", "INT"),
                       new dndClass("Sorcerer", 6, 6, 0, 10, 8, 14, 12, 13, 15, "CON", "CHAR"),
                       new dndClass("Warlock", 8, 8, 0, 8, 10, 12, 13, 14, 15, "WIS", "CHAR"),
                       new dndClass("Wizard", 6, 6, 0, 8, 13, 12, 15, 14, 10, "INT", "WIS")];
        
        var names = ["Jacob Jacobson","Yelnan","Olman","Otto","Yeller","Carfer", "Blossom", "Anchor", "Stem", "Petal", "Basil", "Lavender", "Victoria", "Rose", "Anthony", "Uthgerd", "Radzig", "Henry"];

        var smells = ["dead bodies", "bread", "flowers", "garlic", "cigars", "animal feces", "rotten fruit", "fresh fruit", "freshly cut wood", "mint and herbs", "sewage", "bacon", "salt water", "fried foods", "smoke", "lemon", "burning rubber", "wine and alcohol"];

        var times = ["one hour", "two hours", "three hours", "four hours", "five hours", "six hours", "seven hours", "eight hours", "nine hours", "ten hours", "one day", "one and a half days", "two days", "two and a half days"];

        var randClass = -1; 
        
        classes = shuffle(classes);        


        var groupID = 0;
        
        var reTry = false;
        
        var cardDropLoc = getOffset(document.getElementById("cardDrop"));
        
function addCard(cardArray){
    
    for(var i = 0; i < cardArray.length; i++){
        if(!cardArray[i].picked){
            
            cardsSHOWING.push(cardArray[i]);
            
            container.appendChild(newCard(cardArray[i]));
            
            dragElement(document.getElementById(cardArray[i].id));
            
            cardArray[i].picked=true;
            
            reTry = false;
            
            return true;   
        }
        
        if(reTry){
            cardArray[i].picked = false;
            cardArray[i].idNum++;
            cardArray[i].updateID();
        }
    }
    
    reTry = true;
    cardArray = shuffle(cardArray);
    addCard(cardArray);
    
}
        
      
//make a new card, with a header and a description as outlinted in the array
function newCard(cardObj){
    
    let card = document.createElement("div");

    card.setAttribute("id",cardObj.id);
    card.classList.add("card");
    card.style.position = "absolute";    

      card.innerHTML = `
<div class="CARDheader ${cardObj.type}" id='${cardObj.header}'>
${cardObj.title}
<div class="subtitle">${cardObj.type}</div>
<div id="close" onclick="closeCard(\'${cardObj.id}\')">[X]</div>
</div>



<div class="cardBody" id="${cardObj.id}cardBody">        
${cardObj.description}
    </div>

<input type="checkbox" id="${cardObj.id}CHECKBOX" onclick=groupCheckBox(\'${cardObj.id}\',1)>Group</input>
<button onclick=zCard(\'${cardObj.id}\',1)>▲</button>
<button onclick=zCard(\'${cardObj.id}\',-1)>▼</button>

<div class="dropdown">
  <button class="dropbtn">More Options</button>
  <div class="dropdown-content" id="${cardObj.idDROPDOWN}">
    <a href="#" onclick="changeColor(\'${cardObj.id}\')">Change Color</a>
<a href="#" onclick="resetSize(\'${cardObj.id}\')">Reset Size</a>
  </div>
    `
    ;         
            card.style.top = cardDropLoc[0] + 50 + 'px';
            card.style.left = cardDropLoc[1] + 'px';
            card.style.zIndex = 10;
    
    return card;    
}
        
        
function newNote(title,subtitle,bodyText){
    
    
        let card = document.createElement("div");

    cardID = "NOTE" + notes;
    card.setAttribute("id",cardID);
    card.classList.add("card");
    card.style.position = "absolute"; 
    
    if(title == ""){
        title = "note title";
    }
    
    if(subtitle == ""){
        subtitle = "subtitle";
    }
    
    if(bodyText == "") {
        bodyText = "Start taking notes...";
    }
    
      card.innerHTML = `
<div class="CARDheader note" id='NOTE${notes}header'>

<div id="close" onclick="closeCard(\'NOTE${notes}\')" contenteditable=false>[X]</div>
        
</div>        
<div id='NOTE${notes}header0'  style='background-color:#2196F3;color:white;' contenteditable=true>
${title}     
</div>
<div id='NOTE${notes}header1'  style='background-color:#2196F3;color:white; letter-spacing: 5px; font-size: .7em; font-style: italic;' contenteditable=true>
${subtitle} 
</div> 



<div class="cardBody" id="NOTE${notes}cardBody" contenteditable=true>

${bodyText}


    </div>

<button onclick=zCard(\'${cardID}\',1)>▲</button> 
<button onclick=zCard(\'${cardID}\',-1)>▼</button>

<div class="dropdown">
  <button class="dropbtn">More Options</button>
  <div class="dropdown-content">
    <a href="#" onclick="changeColor(\'${cardID}\')">Change Color</a>
<a href="#" onclick="resetSize(\'${cardID}\')">Reset Size</a>
  </div>
</div>
    `
    ;
    
            card.style.top = cardDropLoc[0] + 50 + 'px';
            card.style.left = cardDropLoc[1] + 'px';
            card.style.zIndex = 10;
    
    container.appendChild(card);
    dragElement(document.getElementById(cardID));
    
    notes++;
    
}

        
function newCharacter(){
            randClass++;
            if( randClass == classes.length){
                randClass = 0;
            }
    
    
        let card = document.createElement("div");

    cardID = "pCard" + pCardNum;
    card.setAttribute("id",cardID);
    card.classList.add("card");
    card.style.position = "absolute"; 
    
    var randomName = Math.floor(Math.random() * names.length);
    classes[randClass].charName = names[randomName];
  
            card.innerHTML = `

<div class="CARDheader player" id='${cardID}header' style="height: 20px;"> </div>
<div id="close" onclick="closeCard(\'${cardID}\')" contenteditable=false>[X]</div>
<div class='CARDheader' contenteditable=true>
${classes[randClass].charName}    
</div>

<div id="pCardcardBody">

<div id="pStats">
${classes[randClass].name}
<div class="subtitle" id='pClass'> class </div>

${classes[randClass].HP}
<div class="subtitle" id='pHP'> Hit Points (HP)</div>

${classes[randClass].d}
<div  class="subtitle" id='pd'> hit die</div>
</div>

<table>
  <tr>
    <th>Ability</th>
    <th>Score</th>
    <th>Modifier</th>
  </tr>
  <tr>
    <td>Strength</td>
    <td>${classes[randClass].STR}</td>
    <td>${classes[randClass].STRmod}</td>
  </tr>
  <tr>
    <td>Dexterity</td>
    <td>${classes[randClass].DEX}</td>
    <td>${classes[randClass].DEXmod}</td>
  </tr>  
  <tr>
    <td>Consitution</td>
    <td>${classes[randClass].CON}</td>
    <td>${classes[randClass].CONmod}</td>
  </tr>
  <tr>
    <td>Intelligence</td>
    <td>${classes[randClass].INT}</td>
    <td>${classes[randClass].INTmod}</td>
  </tr>
  <tr>
    <td>Wisdom</td>
    <td>${classes[randClass].WIS}</td>
    <td>${classes[randClass].WISmod}</td>
  </tr>
  <tr>
    <td>Charisma</td>
    <td>${classes[randClass].CHAR}</td>
    <td>${classes[randClass].CHARmod}</td>
  </tr>

</table>

</div>


<button onclick=zCard(\'${cardID}\',1)>▲</button> 
<button onclick=zCard(\'${cardID}\',-1)>▼</button>

<div class="dropdown">
  <button class="dropbtn">More Options</button>
  <div class="dropdown-content">
    <a href="#" onclick="changeColor(\'${cardID}\')">Change Color</a>
  </div>
</div>
    `
    ;    
        
    
            card.style.top = cardDropLoc[0] + 50 + 'px';
            card.style.left = cardDropLoc[1] + 'px';
            card.style.zIndex = 10;
    
    container.appendChild(card);
    dragElement(document.getElementById(cardID));
    
    pCardNum++;
    
    
    cardsSHOWING.push(classes[randClass]);
    
}



        
function roll(dice){
    console.log(dice);
    return Math.random()*dice+1 | 0;
}
          
        
        
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
        
        
function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return [_y, _x];
}
        
        
//https://bost.ocks.org/mike/shuffle/        
function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}
        
        
function closeCard(cardID){

    var card = document.getElementById(cardID);
    
   card.remove();
    
    updateCards(cardID);
    
}
        
function updateCards(cardID){
    
    for(var i = 0; i < cardsSHOWING.length; i++){
        if(cardsSHOWING[i].id == cardID){
            cardsSHOWING.splice(i, 1);
        }
    }
    
}
        
function groupCheckBox(cardID){
    
       for(var i = 0; i < cardsSHOWING.length; i++){
        if(cardsSHOWING[i].id == cardID){
            cardsSHOWING[i].grouping = !cardsSHOWING[i].grouping;
        }
    }
    
    
    groupCards();
    
}
        
function groupCards(){
//    console.log("GROUPING...");
    var count = 0;
    var groupARRAY = [];
    var groupSTRING = "";
    
    for(var i = 0; i < cardsSHOWING.length; i++){
        if(cardsSHOWING[i].grouping){
            count++;
            groupARRAY.push(i);
            groupSTRING += cardsSHOWING[i].title + " (" + cardsSHOWING[i].type + ")\n"; 
        }
    }
    
    if(count > 1){
           var tempConfirm = confirm("Do you want to group these cards together?\n" + groupSTRING + "\n To group more cards together, select [CANCEL] and select the next card to add to your group. Only select [OK] once all the cards you'd like in your group are selected (listed above).");
 
    }
    
    if(tempConfirm){
        groupID++;
        
        let groupDIV = document.createElement("div");
        
        groupDIV.classList.add("card");
        groupDIV.classList.add("group");
        groupDIV.style.position = "absolute";
        
        groupDIV.setAttribute("id","group" + groupID);
        
        container.appendChild(groupDIV);
        
        newChild = 0;
        
        for (var i = 0; i < groupARRAY.length; i++){
        
            newChild = document.getElementById(cardsSHOWING[groupARRAY[i]].id);
            
            cardsSHOWING[groupARRAY[i]].groupID = "group" + groupID;

            newChildDROPDOWN = document.getElementById(cardsSHOWING[groupARRAY[i]].idDROPDOWN);
            
            newChildDROPDOWN.innerHTML = '<a href="#" onclick="changeColor(\'' + cardsSHOWING[i].id + '\')">Change Color</a>' +
                                         '<a href="#" onclick="resetSize(\'' + cardsSHOWING[i].id + '\')">Reset Size</a>' + 
                                         "<a href='#' onclick='unGroup(\"" + cardsSHOWING[groupARRAY[i]].id + "\")'>UNGROUP</a>";
          
            groupDIV.appendChild(newChild);

            
            cardsSHOWING[groupARRAY[i]].grouping = false;
            document.getElementById(cardsSHOWING[groupARRAY[i]].id + "CHECKBOX").checked = false;
        }
        
        groupDIV.style.left = container.style.left;
        groupDIV.style.top = container.style.top;
        
        dragElement(groupDIV);
    
    }
    
    cleanUpGroups();

    
    
}

function unGroup(cardID){
    
    for(var i = 0; i < cardsSHOWING.length; i++){
        if(cardsSHOWING[i].id == cardID){
           tempGroupID = cardsSHOWING[i].groupID;
           }
    }
    
    for(var i = 0; i < cardsSHOWING.length; i++){
        if(cardsSHOWING[i].groupID == tempGroupID){
           var tempDIV = document.getElementById(cardsSHOWING[i].id);
            cardsSHOWING[i].groupID = "";
            
            newChildDROPDOWN = document.getElementById(cardsSHOWING[i].idDROPDOWN);
            
            newChildDROPDOWN.innerHTML = '<a href="#" onclick="changeColor(\'' + cardsSHOWING[i].id + '\')">Change Color</a>' +
                                         '<a href="#" onclick="resetSize(\'' + cardsSHOWING[i].id + '\')">Reset Size</a>';
            
            container.appendChild(tempDIV);
        }
    }

    cleanUpGroups();
    
}
        
   function cleanUpGroups() {
//       console.log("CLEANING...");
           if(groupID > 0){
        for (var i = 0; i <= groupID; i++){
            
            if(document.getElementById("group" + i) != null){ //Since groups can be deleted but the IDs still go up, this checks to see if the div has already been deleted (=null), and if it hasn't been deleted (!=null), go on to check if it should be
            
            deleteGroupDIV = document.getElementById("group" + i);

            if (!deleteGroupDIV.hasChildNodes()){
                deleteGroupDIV.remove();
//                console.log("deleted");
            } else if (deleteGroupDIV.childElementCount == 1){
                for(var c = 0; c < cardsSHOWING.length; c++){
                    if(cardsSHOWING[c].groupID == "group"+i){
                        unGroup(cardsSHOWING[i].id);
                    }
                }
            }
        }
     }
    }
   }     
        

function removeDIV(divID){
    tempDIV = document.getElementById(divID);
    tempDIV.remove();
}

        
function zCard(cardID, zMove){
    try {
         tempEl = document.getElementById(cardID);
            tempEl.style.zIndex = parseInt(tempEl.style.zIndex) + zMove;
    } catch(err) {
        console.log("?");
        console.log(err.message);
    }
    
}
        
function changeColor(cardID){
   
    var tempEl = document.getElementById(cardID + 'header');
    var color = window.prompt("Enter in the new hex code for the new color.","#fffff");
    
    tempEl.style.backgroundColor = color;

    if(cardID.indexOf("NOTE") >= 0){
        var tempEl = document.getElementById(cardID + 'header0');
        tempEl.style.backgroundColor = color;
        
        var tempEl = document.getElementById(cardID + 'header1');
        tempEl.style.backgroundColor = color;
    }
    
}
        
        
function resetSize(cardID){
    tempEl = document.getElementById(cardID + 'cardBody');
    tempEl.style.width = '200px';
    tempEl.style.height = 'auto';
}



function resizeOffset(){
    console.log("hi hey hello");
    cardDropLoc = getOffset(document.getElementById("cardDrop"));
    
}

function calcModifier(mod){
            modifier = 0;
            modifier = (mod - 10)/2 | 0;             
            return modifier;
}


function startMadLibs(){
    
    settingCard = "";
    startingCard = "";
    goalCard = "";
    
    for (var i = 0; i < cardsSHOWING.length; i++){
        if(settingCard == "" && cardsSHOWING[i].type == "setting"){
           settingCard = cardsSHOWING[i].title;
           }
        if(startingCard == "" && cardsSHOWING[i].type == "starting"){
            startingCard = cardsSHOWING[i].descrText;
        }
        if(goalCard == "" && cardsSHOWING[i].type == "goal"){
            goalCard = cardsSHOWING[i].descrText;
        }
        console.log(cardsSHOWING[i].type);
    }
    
    if(settingCard == ""){
            addCard(settingCards);
     }
    if(startingCard == ""){
        addCard(startingCards);
        }
        if(goalCard == ""){
            addCard(goalCards);
        }
    
        for (var i = 0; i < cardsSHOWING.length; i++){
        if(settingCard == "" && cardsSHOWING[i].type == "setting"){
           settingCard = cardsSHOWING[i].title;
           }
        if(startingCard == "" && cardsSHOWING[i].type == "starting"){
            startingCard = cardsSHOWING[i].descrText;
        }
        if(goalCard == "" && cardsSHOWING[i].type == "goal"){
            goalCard = cardsSHOWING[i].descrText;
        }
    }
    
    
    //export to "note" card option!!
    var finalMadLib = "The game begins with all of you, the players, living within the land of " + settingCard + ". As you live your everyday lives, you're brought together by one big event: " + startingCard + ". This event changes you each as individuals, as you also come to realize there's a bigger adventure waiting for you: " + goalCard + ". It is up to you, adventurers, to take up this quest and fulfill your duties.";

    newNote("Start Description", "Madlib generated", finalMadLib);
}




function challengeMadLibs(){    
    
    situationPlace = "";
    monsterCard = "";
    characterCard = "";
    
    var r = Math.floor(Math.random() * times.length);
    timeCard = times[r];
    enemyCard = "";
    relocationCard = "";
    
    var r = Math.floor(Math.random() * times.length);
    timeCard2 = times[r];
    
    var r = Math.floor(Math.random() * smells.length);
    smell = smells[r];
    
    var situationFIRST = false;
    var characterFIRST = false;
    var locationFIRST = false;
    
    for (var i = 0; i < cardsSHOWING.length; i++){

        if(!situationFIRST && situationPlace == ""){
            situationFIRST = true;
        } else if (situationPlace == "" && cardsSHOWING[i].type == "setting") {
            situationPlace = cardsSHOWING[i].title;
        }
        
        if(monsterCard == "" && cardsSHOWING[i].type == "monster"){
            monsterCard = cardsSHOWING[i].title;
        }
        
        if(characterCard == "" && cardsSHOWING[i].type == "character" && !characterFIRST){
            characterCard = cardsSHOWING[i].charName;
            characterFIRST = true;
        } else if (enemyCard == "" && cardsSHOWING[i].type == "character"){
               enemyCard = cardsSHOWING[i].charName;        
        }
        
        if(cardsSHOWING[i].type == "setting" && !locationFIRST && relocationCard == ""){
            locationFIRST = true;
        } else if(cardsSHOWING[i].type == "setting" && relocationCard == ""){
            relocationCard = cardsSHOWING[i].title;
        }
        
    }

    
    if(situationPlace == ""){
        addCard(settingCards);
    }
    
    if (monsterCard == ""){
        addCard(monsterCards);
    }
    
    if (characterCard == ""){
        newCharacter();
    }
    
    if (enemyCard == ""){
        newCharacter();
    }
    
    if (relocationCard == ""){
        addCard(settingCards);
    }
    
    
        for (var i = 0; i < cardsSHOWING.length; i++){

        if(!situationFIRST && situationPlace == ""){
            situationFIRST = true;
        } else if (situationPlace == "" && cardsSHOWING[i].type == "setting") {
            situationPlace = cardsSHOWING[i].title;
        }
        
        if(monsterCard == "" && cardsSHOWING[i].type == "monster"){
            monsterCard = cardsSHOWING[i].title;
        }
        
        if(characterCard == "" && cardsSHOWING[i].type == "character" && !characterFIRST){
            characterCard = cardsSHOWING[i].charName;
            characterFIRST = true;
        } else if (enemyCard == "" && cardsSHOWING[i].type == "character"){
               enemyCard = cardsSHOWING[i].charName;        
        }
        
        if(cardsSHOWING[i].type == "setting" && !locationFIRST && relocationCard == ""){
            locationFIRST = true;
        } else if(cardsSHOWING[i].type == "setting" && relocationCard == ""){
            relocationCard = cardsSHOWING[i].title;
        }
        
    }
    
    
    //export to "note" card option!!
    var finalMadLib = "As you all continue on your quest, you quickly realize your journey will not be easy. Eventually on your travels you come across " + situationPlace + ", and you see some " + monsterCard + " you must fight and survive. " + 
        "\n -- \n" + 
        "After you've finished, you all meet " + characterCard + ". They're pretty knowledgeable about your quest, and let you know that you only have " + timeCard + " to complete your quest. They also knwo that " + enemyCard + " is coming to stop you.\n" + 
        "\n -- \n" + 
        "If " + enemyCard + " captures the players.... \n" +
        enemyCard + " manages to snag you all, and takes you away. Waking up, you find yourselves in " + relocationCard + ", which is " + timeCard2 + " away from where you were. The ground is hard and the air smells of " + smell + ". You hear some noises nearby, but realie you're all tied up together in the middle of the cave.";
    
    
    
    newNote("Challenge Description", "Madlib generated", finalMadLib);    
}



