writeValue = function(ctx, value, pos) {
    var scale = getScalingFactor(getCanvas(), getBackgroundImage());
    pos = {x: pos.x / scale.x, y: pos.y / scale.y };

    ctx.save();
    ctx.scale(scale.x, scale.y);
    ctx.fillText(value, pos.x, pos.y);
    ctx.restore();
}

getScalingFactor = function(canvas, warcryCardOne) {
    return {
        x: canvas.width  / warcryCardOne.width,
        y: canvas.height / warcryCardOne.height
    };
}

getCanvas = function() {
    return document.getElementById("canvas");
}

getContext = function() {
    return getCanvas().getContext("2d");
}

getBackgroundImage = function() {
    if (document.getElementById('select-bg-dark-102').checked) {
        return document.getElementById('bg-dark-102');

    } else if (document.getElementById('select-bg-dark-302').checked) {
        return document.getElementById('bg-dark-302');

    } else if (document.getElementById('select-bg-fire-102').checked) {
        return document.getElementById('bg-fire-102');

    } else if (document.getElementById('select-bg-light-102').checked) {
        return document.getElementById('bg-light-102');
    }
}

drawBackground = function() {
    getContext().drawImage(
        getBackgroundImage(), 0, 0, getCanvas().width, getCanvas().height);
}

scalePixelPosition = function(pixelPosition) {
    var scalingFactor = getScalingFactor(getCanvas(), getBackgroundImage());
    var scaledPosition = {x: pixelPosition.x * scalingFactor.x, y: pixelPosition.y * scalingFactor.y};
    return scaledPosition;
}

writeScaled = function(value, pixelPos) {
    var scaledPos = scalePixelPosition(pixelPos);
    writeValue(getContext(), value, scaledPos);
}

drawCardElementFromInput = function(inputElement, pixelPosition) {
    var value = inputElement.value;
    writeScaled(value, pixelPosition);
}

drawCardElementFromInputId = function(inputId, pixelPosition) {
    drawCardElementFromInput(document.getElementById(inputId), pixelPosition);
}

// drawToughness = function(value) {
//     writeScaled(value, {x: 545, y: 391});
// }
//
// drawWounds = function(value) {
//     writeScaled(value, {x: 380, y: 510});
// }
//
// drawMove = function(value) {
//     writeScaled(value, {x: 220, y: 391});
// }
//
// drawPointCost = function(value) {
//     writeScaled(value, {x: 805, y: 160});
// }







drawAbility = function(id, pixelPosition) {
    getContext().font = '28px Georgia, serif';
    getContext().fillStyle = 'black';
    getContext().textAlign = 'left';

    var double      = document.getElementById('ability' + id + '-double'),
        triple      = document.getElementById('ability' + id + '-triple'),
        quad        = document.getElementById('ability' + id + '-quad'),
        name        = document.getElementById('ability' + id + '-name').value,
        text        = document.getElementById('ability' + id + '-text').value,
        transDouble = document.getElementById('card-translation-double').value,
        transTriple = document.getElementById('card-translation-triple').value,
        transQuad   = document.getElementById('card-translation-quad').value;

    // https://stackoverflow.com/a/35119260; http://jsfiddle.net/BaG4J/1/
    var textblock = (function() {
        var txt = '';

        if (double.checked) {
            if (transDouble.length) {
                var txt = '[' + transDouble + '] ' + name + ': ' + text;
            } else {
                var txt = '[Double] ' + name + ': ' + text;
            }
        } else if (triple.checked) {
            if (transTriple.length) {
                var txt = '[' + transTriple + '] ' + name + ': ' + text;
            } else {
                var txt = '[Triple] ' + name + ': ' + text;
            }
        } else if (quad.checked) {
            if (transQuad.length) {
                var txt = '[' + transQuad + '] ' + name + ': ' + text;
            } else {
                var txt = '[Quad] ' + name + ': ' + text;
            }
        }

        var lines = txt.split('\n');

        for (var i = 0; i < lines.length; i++) {
            writeScaled(
                lines[i],
                {x: pixelPosition.x, y: pixelPosition.y+(i*35)}
            );
        }
    })();
}

drawCardTranslationAbilities = function(value) {
    getContext().font = '28px Georgia, serif';
    getContext().fillStyle = 'white';
    getContext().textAlign = 'center';
    writeScaled(value, {x: (1772/2), y: 55});
}

drawCardTitle = function(value) {
    getContext().font = '92px rodchenkoctt';
    getContext().fillStyle = 'white';
    getContext().textAlign = 'center';
    writeScaled(value, {x: (1772/2), y: 135});
}







// getWeaponStatblockImage = function() {
//     return document.getElementById("weapon-profile");
// }

// drawWeaponStatblock = function(pixelPosition) {
//     var image = getWeaponStatblockImage();
//     var scaledPosition = scalePixelPosition(pixelPosition);
//     // var scaledSize = scalePixelPosition({x: image.width, y: image.height});
//     // getContext().drawImage(
//     //     image,
//     //     scaledPosition.x,
//     //     scaledPosition.y,
//     //     scaledSize.x,
//     //     scaledSize.y);
// }

// drawWeapon = function(weaponData, pixelPosition) {
//     drawWeaponStatblock(pixelPosition);
//
//     var statsPosY = pixelPosition.y + 95;
//
//     var range = (weaponData.rangeMin > 0 ? (weaponData.rangeMin + "-") : "") + weaponData.rangeMax;
//
//     getContext().textAlign = "center";
//
//     writeScaled(range, {x: pixelPosition.x + 250, y: statsPosY});
//
//     writeScaled(
//         weaponData.attacks,
//         {x: pixelPosition.x + 440, y: statsPosY});
//
//     writeScaled(
//         weaponData.strength,
//         {x: pixelPosition.x + 620, y: statsPosY});
//
//     writeScaled(
//         weaponData.damageBase + "/" + weaponData.damageCrit,
//         {x: pixelPosition.x + 790, y: statsPosY});
//
//     var position = scalePixelPosition({x: pixelPosition.x + 20, y: pixelPosition.y + 30});
//     var size = scalePixelPosition({x: 120, y: 120});
//     drawImageSrc(position, size, weaponData.runemark);
// }

// function getWeapon(weaponId) {
//     return $(weaponId).find("#weaponEnabled")[0].checked ? $(weaponId) : null;
// }
//
// function getWeapon1() {
//     return getWeapon("#weapon1");
// }
//
// function getWeapon2() {
//     return getWeapon("#weapon2");
// }

function getLabel(element)
{
    return $(element).prop("labels")[0];
}

function getImage(element)
{
    return $(element).find("img")[0];
}

function getSelectedRunemark(radioDiv) {
    var checked = $(radioDiv).find('input:checked');
    if (checked.length > 0)
    {
        //console.log(getImage(getLabel(checked[0])).getAttribute("src"));
        return getImage(getLabel(checked[0])).getAttribute("src");
    }
    return null;
}

function setSelectedRunemark(radioDiv, runemark, radioGroupName, bgColor)
{
    // uncheck all
    {
        var checked = $(radioDiv).find('input:checked');
        for (var i = 0; i < checked.length; i++)
        {
            checked[i].checked = false;
        }
        var icons = $(radioDiv).find('img');
        for (var i = 0; i < icons.length; i++)
        {
            icons[i].style.backgroundColor = bgColor;
        }
    }

    if (runemark != null)
    {
        var queryString = "img[src='"+ runemark +"']";
        var img = $(radioDiv).find(queryString);
        if (img.length > 0)
        {
            var radioButton = $(img[0].parentNode.parentNode).find("input")[0];
            radioButton.checked = true;
            // img[0].style.backgroundColor = "tomato";
            img[0].style.backgroundColor = "#00bc8c";
        }
        else
        {
            var newDiv =
                addToImageRadioSelector(
                    runemark,
                    radioDiv,
                    radioGroupName,
                    bgColor);
            // $(newDiv).find("img")[0].style.backgroundColor = "tomato";
            $(newDiv).find("img")[0].style.backgroundColor = "#00bc8c";
            $(newDiv).find("input")[0].checked = true;
        }
    }
}

function getSelectedFactionRunemark() {
    return getSelectedRunemark($('#factionRunemarkSelect')[0]);
}

function setSelectedFactionRunemark(runemark) {
    setSelectedRunemark($('#factionRunemarkSelect')[0], runemark, "faction", "black");
}

function drawImage(scaledPosition, scaledSize, image)
{
    if (image != null)
    {
        if (image.complete)
        {
            getContext().drawImage(image, scaledPosition.x, scaledPosition.y, scaledSize.x, scaledSize.y);
        }
        else
        {
            image.onload = function(){ drawImage(scaledPosition, scaledSize, image); };
        }
    }
}

function drawImageSrc(scaledPosition, scaledSize, imageSrc)
{
    if (imageSrc != null)
    {
        var image = new Image();
        image.onload = function(){ drawImage(scaledPosition, scaledSize, image); };
        image.src = imageSrc;
    }
}



function drawTagRunemark(index, runemark, row) {
    // draw the runemarks
    var positions = []

    if (row == 1 && document.getElementById('ability1-toggle').checked) {
        positions = [{x: 227.5, y: 185}, {x: 400, y: 185}];
    } else if (row == 2 && document.getElementById('ability2-toggle').checked) {
        positions = [{x: 227.5, y: 362.5}, {x: 400, y: 362.5}];
    } else if (row == 3 && document.getElementById('ability3-toggle').checked) {
        positions = [{x: 227.5, y: 540}, {x: 400, y: 540}];
    } else if (row == 4 && document.getElementById('ability4-toggle').checked) {
        positions = [{x: 227.5, y: 717.5}, {x: 400, y: 717.5}];
    } else if (row == 5 && document.getElementById('ability5-toggle').checked) {
        positions = [{x: 227.5, y: 895}, {x: 400, y: 895}];
    } else if (row == 6 && document.getElementById('ability6-toggle').checked) {
        positions = [{x: 227.5, y: 1072.5}, {x: 400, y: 1072.5}];
    }

    if (index >= positions.length) return;

    var img = $("#circle")[0],
        position = scalePixelPosition(positions[index]),
        size = scalePixelPosition({x: 160, y: 160});

    // position = scalePixelPosition({x: positions[index].x + 15, y: positions[index].y + 15});
    // size = scalePixelPosition({x: 130, y: 130});
    position = scalePixelPosition({x: positions[index].x, y: positions[index].y});

    drawImage(position, {x: 165, y: 165}, img);
    drawImageSrc(position, size, runemark);
}




// function drawModel(imageUrl, imageProps)
// {
//     if (imageUrl != null)
//     {
//         var image = new Image();
//         image.onload = function(){
//             var position = scalePixelPosition({x: 590 + imageProps.offsetX, y: imageProps.offsetY});
//             var scale = imageProps.scalePercent/100.0;
//             var width = image.width * scale;
//             var height = image.height * scale;
//             getContext().drawImage(image, position.x, position.y, width, height);
//
//             URL.revokeObjectURL(image.src);
//         };
//         image.src = imageUrl;
//     }
// }

function getName()
{
    var textInput = $("#saveNameInput")[0];
    return textInput.value;
}

function setName(name)
{
    var textInput = $("#saveNameInput")[0];
    textInput.value = name;
}

// function getModelImage()
// {
//     var imageSelect = $("#imageSelect")[0];
//
//     // if (imageSelect.files.length > 0)
//     // {
//     //     return URL.createObjectURL(imageSelect.files[0]);
//     // }
//
//     return null;
// }

// function setModelImage(image)
// {
//     var imageSelect = $("#imageSelect")[0];
//
//     if (image != null)
//     {
//         // TODO: Not sure how to do this. It might not even be possible! Leave it for now...
//         // imageSelect.files[0] = image;
//     }
//     else
//     {
//         // imageSelect.value = null;
//     }
// }

// function getDefaultModelImageProperties()
// {
//     return {
//         offsetX: 0,
//         offsetY: 0,
//         scalePercent: 100
//     };
// }

// function getModelImageProperties()
// {
//     return {
//         // offsetX: $("#imageOffsetX")[0].valueAsNumber,
//         // offsetY: $("#imageOffsetY")[0].valueAsNumber,
//         // scalePercent: $("#imageScalePercent")[0].valueAsNumber
//     };
// }

// function setModelImageProperties(modelImageProperties)
// {
//     // $("#imageOffsetX")[0].value = modelImageProperties.offsetX;
//     // $("#imageOffsetY")[0].value = modelImageProperties.offsetY;
//     // $("#imageScalePercent")[0].value = modelImageProperties.scalePercent;
// }

// function getDefaultWeaponData()
// {
//     var weaponData = new Object;
//     weaponData.enabled = true;
//     weaponData.rangeMin = 0;
//     weaponData.rangeMax = 1;
//     weaponData.attacks = 1;
//     weaponData.strength = 3;
//     weaponData.damageBase = 1;
//     weaponData.damageCrit = 2;
//     weaponData.runemark = null;
//     return weaponData;
// }
//
// function getDefaultWeaponData1()
// {
//     var data = getDefaultWeaponData();
//     data.enabled = true;
//     return data;
// }
//
// function getDefaultWeaponData2()
// {
//     var data = getDefaultWeaponData();
//     data.enabled = false;
//     return data;
// }
//
// function readWeaponControls(weaponId)
// {
//     var weaponData = new Object;
//     var weaponDiv = $(weaponId);
//     // weaponData.enabled = weaponDiv.find("#weaponEnabled")[0].checked;
//     // weaponData.rangeMin = weaponDiv.find("#rangeMin")[0].value;
//     // weaponData.rangeMax = weaponDiv.find("#rangeMax")[0].value;
//     // weaponData.attacks = weaponDiv.find("#attacks")[0].value;
//     // weaponData.strength = weaponDiv.find("#strength")[0].value;
//     // weaponData.damageBase = weaponDiv.find("#damageBase")[0].value;
//     // weaponData.damageCrit = weaponDiv.find("#damageCrit")[0].value;
//     weaponData.runemark = getSelectedRunemark(weaponDiv.find("#weaponRunemarkSelect")[0]);
//     return weaponData;
// }
//
// function writeWeaponControls(weaponId, weaponData, weaponName)
// {
//     weaponDiv = $(weaponId);
//     // weaponDiv.find("#weaponEnabled")[0].checked = weaponData.enabled;
//     // weaponDiv.find("#weaponInputs")[0].style.display = weaponData.enabled ? "block" : "none";
//     // weaponDiv.find("#rangeMin")[0].value = weaponData.rangeMin;
//     // weaponDiv.find("#rangeMax")[0].value = weaponData.rangeMax;
//     // weaponDiv.find("#attacks")[0].value = weaponData.attacks;
//     // weaponDiv.find("#strength")[0].value = weaponData.strength;
//     // weaponDiv.find("#damageBase")[0].value = weaponData.damageBase;
//     // weaponDiv.find("#damageCrit")[0].value = weaponData.damageCrit;
//     setSelectedRunemark(
//         weaponDiv.find("#weaponRunemarkSelect")[0],
//         weaponData.runemark,
//         weaponName,
//         "white");
// }


function readTagRunemarksOne() {
    var array = new Array;

    var checkedBoxes = $("#tagRunemarkSelect_abilitiesCollapseThreeOne").find('input:checked');

    for (i = 0; i < checkedBoxes.length; i++) {
        array.push(getImage(getLabel(checkedBoxes[i])).getAttribute("src"));
    }
    return array;
}
function readTagRunemarksTwo() {
    var array = new Array;

    var checkedBoxes = $("#tagRunemarkSelect_abilitiesCollapseThreeTwo").find('input:checked');

    for (i = 0; i < checkedBoxes.length; i++) {
        array.push(getImage(getLabel(checkedBoxes[i])).getAttribute("src"));
    }
    return array;
}
function readTagRunemarksThree() {
    var array = new Array;

    var checkedBoxes = $("#tagRunemarkSelect_abilitiesCollapseThreeThree").find('input:checked');

    for (i = 0; i < checkedBoxes.length; i++) {
        array.push(getImage(getLabel(checkedBoxes[i])).getAttribute("src"));
    }
    return array;
}
function readTagRunemarksFour() {
    var array = new Array;

    var checkedBoxes = $("#tagRunemarkSelect_abilitiesCollapseThreeFour").find('input:checked');

    for (i = 0; i < checkedBoxes.length; i++) {
        array.push(getImage(getLabel(checkedBoxes[i])).getAttribute("src"));
    }
    return array;
}
function readTagRunemarksFive() {
    var array = new Array;

    var checkedBoxes = $("#tagRunemarkSelect_abilitiesCollapseThreeFifth").find('input:checked');

    for (i = 0; i < checkedBoxes.length; i++) {
        array.push(getImage(getLabel(checkedBoxes[i])).getAttribute("src"));
    }
    return array;
}
function readTagRunemarksSix() {
    var array = new Array;

    var checkedBoxes = $("#tagRunemarkSelect_abilitiesCollapseThreeSixth").find('input:checked');

    for (i = 0; i < checkedBoxes.length; i++) {
        array.push(getImage(getLabel(checkedBoxes[i])).getAttribute("src"));
    }
    return array;
}

function setSelectedTagRunemarks(selectedRunemarksArray){
    // var tagRunemarksDiv = $('#tagRunemarkSelect');
    var tagRunemarksDiv = $("[id^='tagRunemarkSelect_']");
    {
        var checked = tagRunemarksDiv.find('input:checked');
        for (var i = 0; i < checked.length; i++) {
            checked[i].checked = false;
        }
        var icons = tagRunemarksDiv.find('img');
        for (var i = 0; i < icons.length; i++) {
            icons[i].style.backgroundColor = 'white';
        }
    }
    for (var i = 0; i < selectedRunemarksArray.length; i++) {
        var runemark = selectedRunemarksArray[i];
        var queryString = "img[src='"+ runemark +"']";
        var imgs = tagRunemarksDiv.find(queryString);
        if (imgs.length > 0) {
            var checkbox = $(imgs[0].parentNode.parentNode).find('input')[0];
            checkbox.checked = true;
            imgs[0].style.backgroundColor = "#00bc8c";
        } else {
            var newDiv = addToImageCheckboxSelector(runemark, tagRunemarksDiv[0], 'white');
            $(newDiv).find('img')[0].style.backgroundColor = "#00bc8c";
            $(newDiv).find('input')[0].checked = true;
        }
    }
}

function readControls()
{
    var data = new Object;
    data.name = getName();
    // data.imageUrl = getModelImage();
    // data.imageProperties = getModelImageProperties();

    data.cardTranslationAbilities = document.getElementById('card-translation-abilities').value;
    data.cardTitle = document.getElementById('card-title').value;

    data.factionRunemark = getSelectedFactionRunemark();

    data.ability1Name = document.getElementById('ability1-name').value;
    data.ability2Name = document.getElementById('ability2-name').value;
    data.ability3Name = document.getElementById('ability3-name').value;
    data.ability4Name = document.getElementById('ability4-name').value;
    data.ability5Name = document.getElementById('ability5-name').value;
    data.ability6Name = document.getElementById('ability6-name').value;

    data.ability1Text = document.getElementById('ability1-text').value;
    data.ability2Text = document.getElementById('ability2-text').value;
    data.ability3Text = document.getElementById('ability3-text').value;
    data.ability4Text = document.getElementById('ability4-text').value;
    data.ability5Text = document.getElementById('ability5-text').value;
    data.ability6Text = document.getElementById('ability6-text').value;

    // data.toughness = document.getElementById("toughness").value;
    // data.wounds = document.getElementById("numWounds").value;
    // data.move = document.getElementById("movement").value;
    // data.pointCost = document.getElementById("pointCost").value;

    data.tagRunemarksOne = readTagRunemarksOne();
    data.tagRunemarksTwo = readTagRunemarksTwo();
    data.tagRunemarksThree = readTagRunemarksThree();
    data.tagRunemarksFour = readTagRunemarksFour();
    data.tagRunemarksFive = readTagRunemarksFive();
    data.tagRunemarksSix = readTagRunemarksSix();

    // data.weapon1 = readWeaponControls("#weapon1");
    // data.weapon2 = readWeaponControls("#weapon2");
    return data;
}

function drawFactionRunemark(image) {
    // drawImageSrc({x: 57.5, y: 57.5}, {x: 100, y: 100}, image);
    drawImageSrc({x: 92.5, y: 50}, {x: 75, y: 75}, image);

    if (document.getElementById('ability1-toggle').checked) {
        var positions = {x: 50, y: 185},
            replacedImage = image.replace('white', 'black');
        drawImage(positions, {x: 165, y: 165}, $("#circle")[0]);
        drawImageSrc(positions, {x: 160, y: 160}, replacedImage);
    }

    if (document.getElementById('ability2-toggle').checked) {
        var positions = {x: 50, y: 362.5},
            replacedImage = image.replace('white', 'black');
        drawImage(positions, {x: 165, y: 165}, $("#circle")[0]);
        drawImageSrc(positions, {x: 160, y: 160}, replacedImage);
    }

    if (document.getElementById('ability3-toggle').checked) {
        var positions = {x: 50, y: 540},
            replacedImage = image.replace('white', 'black');
        drawImage(positions, {x: 165, y: 165}, $("#circle")[0]);
        drawImageSrc(positions, {x: 160, y: 160}, replacedImage);
    }

    if (document.getElementById('ability4-toggle').checked) {
        var positions = {x: 50, y: 717.5},
            replacedImage = image.replace('white', 'black');
        drawImage(positions, {x: 165, y: 165}, $("#circle")[0]);
        drawImageSrc(positions, {x: 160, y: 160}, replacedImage);
    }

    if (document.getElementById('ability5-toggle').checked) {
        var positions = {x: 50, y: 895},
            replacedImage = image.replace('white', 'black');
        drawImage(positions, {x: 165, y: 165}, $("#circle")[0]);
        drawImageSrc(positions, {x: 160, y: 160}, replacedImage);
    }

    if (document.getElementById('ability6-toggle').checked) {
        var positions = {x: 50, y: 1072.5},
            replacedImage = image.replace('white', 'black');
        drawImage(positions, {x: 165, y: 165}, $("#circle")[0]);
        drawImageSrc(positions, {x: 160, y: 160}, replacedImage);
    }
}

render = function(cardData) {
    drawBackground();
    // drawModel(cardData.imageUrl, cardData.imageProperties);

    drawCardTranslationAbilities(cardData.cardTranslationAbilities);
    drawCardTitle(cardData.cardTitle);

    drawFactionRunemark(cardData.factionRunemark);

    // getContext().font = "92px rodchenkoctt";
    // getContext().fillStyle = "white";

    // getContext().textBaseline = "middle";
    // getContext().textAlign = "left";

    // drawMove(cardData.move);
    // drawWounds(cardData.wounds);

    // getContext().textBaseline = "middle";
    // getContext().textAlign = "right";

    // drawToughness(cardData.toughness);

    if (document.getElementById('ability1-toggle').checked) {
        drawAbility(1, {x: 600, y:  225});
    }

    if (document.getElementById('ability2-toggle').checked) {
        drawAbility(2, {x: 600, y:  400});
    }

    if (document.getElementById('ability3-toggle').checked) {
        drawAbility(3, {x: 600, y:  575});
    }

    if (document.getElementById('ability4-toggle').checked) {
        drawAbility(4, {x: 600, y:  750});
    }

    if (document.getElementById('ability5-toggle').checked) {
        drawAbility(5, {x: 600, y:  925});
    }

    if (document.getElementById('ability6-toggle').checked) {
        drawAbility(6, {x: 600, y: 1100});
    }

    // getContext().textBaseline = "middle";
    // getContext().textAlign = "center";

    // drawPointCost(cardData.pointCost);

    // getContext().font = "70px rodchenkoctt";
    // getContext().textBaseline = "top";
    // getContext().textAlign = "left";
    // getContext().fillStyle = "black";

    // if (cardData.weapon1.enabled && cardData.weapon2.enabled)
    // {
    //     drawWeapon(cardData.weapon1, {x: 50, y: 750}); // Default was x:29, y:397
    //     drawWeapon(cardData.weapon2, {x: 50, y: 950}); // Default was x:29, y:564
    // }
    // else if (cardData.weapon1.enabled)
    // {
    //     drawWeapon(cardData.weapon1, {x: 50, y: 850}); // Default was x:29, y:463
    // }
    // else if (cardData.weapon2.enabled)
    // {
    //     drawWeapon(cardData.weapon2, {x: 50, y: 850}); // Default was x:29, y:463
    // }

    for (i = 0; i < cardData.tagRunemarksOne.length; i++) {
        drawTagRunemark(i, cardData.tagRunemarksOne[i], 1);
    }
    for (i = 0; i < cardData.tagRunemarksTwo.length; i++) {
        drawTagRunemark(i, cardData.tagRunemarksTwo[i], 2);
    }
    for (i = 0; i < cardData.tagRunemarksThree.length; i++) {
        drawTagRunemark(i, cardData.tagRunemarksThree[i], 3);
    }
    for (i = 0; i < cardData.tagRunemarksFour.length; i++) {
        drawTagRunemark(i, cardData.tagRunemarksFour[i], 4);
    }
    for (i = 0; i < cardData.tagRunemarksFive.length; i++) {
        drawTagRunemark(i, cardData.tagRunemarksFive[i], 5);
    }
    for (i = 0; i < cardData.tagRunemarksSix.length; i++) {
        drawTagRunemark(i, cardData.tagRunemarksSix[i], 6);
    }

};

function writeControls(cardData)
{
    setName(cardData.name);
    // setModelImage(cardData.imageUrl);
    // setModelImageProperties(cardData.imageProperties);

    $('#card-title')[0].value = cardData.cardTitle;
    $('#card-translation-abilities')[0].value = cardData.cardTranslationAbilities;
    $('#card-translation-double')[0].value = cardData.cardTranslationDouble;
    $('#card-translation-triple')[0].value = cardData.cardTranslationTriple;
    $('#card-translation-quad')[0].value = cardData.cardTranslationQuad;

    setSelectedFactionRunemark(cardData.factionRunemark);

     $('#ability1-name')[0].value = cardData.ability1Name;
     $('#ability2-name')[0].value = cardData.ability2Name;
     $('#ability3-name')[0].value = cardData.ability3Name;
     $('#ability4-name')[0].value = cardData.ability4Name;
     $('#ability5-name')[0].value = cardData.ability5Name;
     $('#ability6-name')[0].value = cardData.ability6Name;

     $('#ability1-text')[0].value = cardData.ability1Text;
     $('#ability2-text')[0].value = cardData.ability2Text;
     $('#ability3-text')[0].value = cardData.ability3Text;
     $('#ability4-text')[0].value = cardData.ability4Text;
     $('#ability5-text')[0].value = cardData.ability5Text;
     $('#ability6-text')[0].value = cardData.ability6Text;

    // $("#toughness")[0].value = cardData.toughness;
    // $("#numWounds")[0].value = cardData.wounds;
    // $("#movement")[0].value = cardData.move;
    // $("#pointCost")[0].value = cardData.pointCost;

    var runes_one = cardData.tagRunemarksOne,
        runes_two = cardData.tagRunemarksTwo,
        runes_three = cardData.tagRunemarksThree,
        runes_four = cardData.tagRunemarksFour,
        runes_five = cardData.tagRunemarksFive,
        runes_six = cardData.tagRunemarksSix

    var tagRuneMarks = $.merge(runes_one, runes_two, runes_three, runes_four, runes_five, runes_six)

    setSelectedTagRunemarks(tagRuneMarks);

    // writeWeaponControls("#weapon1", cardData.weapon1, "weapon1");
    // writeWeaponControls("#weapon2", cardData.weapon2, "weapon2");
}

function defaultCardData() {
    var cardData = new Object;
    cardData.name = 'Default';
    // cardData.imageUrl = null;
    // cardData.imageProperties = getDefaultModelImageProperties();

    cardData.cardTitle = 'Iron Golem';
    cardData.cardTranslationAbilities = 'Abilities';
    cardData.cardTranslationDouble = 'Double';
    cardData.cardTranslationTriple = 'Triple';
    cardData.cardTranslationQuad = 'Quad';

    cardData.factionRunemark = 'runemarks/white/factions-chaos-iron-golems.svg';

    cardData.ability1Name = 'First ability name';
    cardData.ability2Name = 'Second ability name';
    cardData.ability3Name = 'Third ability name';
    cardData.ability4Name = 'Fourth ability name';
    cardData.ability5Name = 'Fifth ability name';
    cardData.ability6Name = 'Sixth ability name';

    cardData.ability1Text = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\nAenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis\ndis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque\neu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel.';
    cardData.ability2Text = 'Lorem ipsum dolor sit amet,\nconsectetuer adipiscing elit.\nAenean commodo ligula eget dolor.';
    cardData.ability3Text = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\nAenean commodo ligula eget dolor.';
    cardData.ability4Text = 'Lorem ipsum dolor sit amet,\nconsectetuer adipiscing elit.\nAenean commodo ligula eget dolor.';
    cardData.ability5Text = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\nAenean commodo ligula eget dolor.';
    cardData.ability6Text = 'Lorem ipsum dolor sit amet,\nconsectetuer adipiscing elit.\nAenean commodo ligula eget dolor.';

    // cardData.toughness = 4;
    // cardData.wounds = 15;
    // cardData.move = 5;
    // cardData.pointCost = 125;

    cardData.tagRunemarksOne = new Array;
    cardData.tagRunemarksOne.push('runemarks/black/fighters-berserker.svg');

    cardData.tagRunemarksTwo = new Array;
    cardData.tagRunemarksThree = new Array;
    cardData.tagRunemarksFour = new Array;
    cardData.tagRunemarksFive = new Array;
    cardData.tagRunemarksSix = new Array;

    // cardData.weapon1 = getDefaultWeaponData1();
    // cardData.weapon2 = getDefaultWeaponData2();
    return cardData;
}

function saveCardDataMap(newMap)
{
    window.localStorage.setItem("cardDataMap", JSON.stringify(newMap));
}

function loadCardDataMap()
{
    var storage = window.localStorage.getItem("cardDataMap");
    if (storage != null)
    {
        return JSON.parse(storage);
    }
    // Set up the map.
    var map = new Object;
    map["Default"] = defaultCardData();
    saveCardDataMap(map);
    return map;
}

function loadLatestCardData()
{
    var latestFighterName = window.localStorage.getItem("latestFighterName");
    if (latestFighterName == null)
    {
        latestFighterName = "Default";
    }

    console.log("Loading '" + latestFighterName + "'...");

    var data = loadCardData(latestFighterName);

    if (data)
    {
        console.log("Loaded data:");
        console.log(data);
    }
    else
    {
        console.log("Failed to load a fighter data.");
    }

    return data;
}

function saveLatestCardData()
{
    var cardData = readControls();
    if (!cardData.name)
    {
        return;
    }

    window.localStorage.setItem("latestFighterName", cardData.name);
    saveCardData(cardData);
}

function loadCardData(cardDataName)
{
    if (!cardDataName)
    {
        return null;
    }

    var map = loadCardDataMap();
    if (map[cardDataName])
    {
        return map[cardDataName];
    }

    return null;
}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL;
}

function onload2promise(obj){
    return new Promise((resolve, reject) => {
        obj.onload = () => resolve(obj);
        obj.onerror = reject;
    });
}

async function getBase64ImgFromUrl(imgUrl){
    let img = new Image();
    let imgpromise = onload2promise(img); // see comment of T S why you should do it this way.
    img.src = imgUrl;
    await imgpromise;
    var imgData = getBase64Image(img);
    return imgData;
}

async function handleImageUrlFromDisk(imageUrl)
{
    if (imageUrl &&
        imageUrl.startsWith("blob:"))
    {
        // The image was loaded from disk. So we can load it later, we need to stringify it.
        imageUrl = await getBase64ImgFromUrl(imageUrl);
    }

    return imageUrl;
}

async function saveCardData(cardData)
{
    var finishSaving = function()
    {
        var map = loadCardDataMap();
        map[cardData.name] = cardData;
        window.localStorage.setItem("cardDataMap", JSON.stringify(map));
    };

    if (cardData != null &&
        cardData.name)
    {
        // handle images we may have loaded from disk...
        cardData.imageUrl = await handleImageUrlFromDisk(cardData.imageUrl);
        cardData.factionRunemark = await handleImageUrlFromDisk(cardData.factionRunemark);

        for (i = 0; i < cardData.tagRunemarksOne.length; i++)
        {
            cardData.tagRunemarksOne[i] = await handleImageUrlFromDisk(cardData.tagRunemarksOne[i]);
        }
        for (i = 0; i < cardData.tagRunemarksTwo.length; i++)
        {
            cardData.tagRunemarksTwo[i] = await handleImageUrlFromDisk(cardData.tagRunemarksTwo[i]);
        }
        for (i = 0; i < cardData.tagRunemarksThree.length; i++)
        {
            cardData.tagRunemarksThree[i] = await handleImageUrlFromDisk(cardData.tagRunemarksThree[i]);
        }
        for (i = 0; i < cardData.tagRunemarksFour.length; i++)
        {
            cardData.tagRunemarksFour[i] = await handleImageUrlFromDisk(cardData.tagRunemarksFour[i]);
        }
        for (i = 0; i < cardData.tagRunemarksFive.length; i++)
        {
            cardData.tagRunemarksFive[i] = await handleImageUrlFromDisk(cardData.tagRunemarksFive[i]);
        }
        for (i = 0; i < cardData.tagRunemarksSix.length; i++)
        {
            cardData.tagRunemarksSix[i] = await handleImageUrlFromDisk(cardData.tagRunemarksSix[i]);
        }

        // cardData.weapon1.runemark = await handleImageUrlFromDisk(cardData.weapon1.runemark);
        // cardData.weapon2.runemark = await handleImageUrlFromDisk(cardData.weapon2.runemark);

        finishSaving();
    }
}

function getLatestCardDataName()
{
    return "latestCardData";
}

window.onload = function() {
    //window.localStorage.clear();
    var cardData = loadLatestCardData();
    writeControls(cardData);
    render(cardData);
    refreshSaveSlots();
}

onAnyChange = function() {
    var cardData = readControls();
    render(cardData);
    saveLatestCardData();
}

function onWeaponControlsToggled(weaponCheckbox) {
    var controlsDiv = $(weaponCheckbox.parentNode).find("#weaponInputs")[0];
    controlsDiv.style.display = weaponCheckbox.checked ? "block" : "none";

    onAnyChange();
}

onWeaponMinRangeChanged = function(minRange) {
    var maxRange = $(minRange.parentNode).find("#rangeMax")[0];
    maxRange.value = Math.max(minRange.value, maxRange.value);

    onAnyChange();
}

onWeaponMaxRangeChanged = function(maxRange) {
    var minRange = $(maxRange.parentNode).find("#rangeMin")[0];
    minRange.value = Math.min(maxRange.value, minRange.value);

    onAnyChange();
}

onRunemarkSelectionChanged = function(radioButton, backgroundColor)
{
    var radioSection = radioButton.parentNode.parentNode;
    var allRadioButtons = $('input', radioSection);

    for (i = 0; i < allRadioButtons.length; i++)
    {
        getImage(getLabel(allRadioButtons[i])).style.backgroundColor = backgroundColor;
    }

    // getImage(getLabel(radioButton)).style.backgroundColor = "tomato";
    getImage(getLabel(radioButton)).style.backgroundColor = "#00bc8c";

    onAnyChange();
}

onTagRunemarkSelectionChanged = function(checkbox, backgroundColor)
{
    // getImage(getLabel(checkbox)).style.backgroundColor = checkbox.checked ? "tomato" : backgroundColor;
    getImage(getLabel(checkbox)).style.backgroundColor = checkbox.checked ? "#00bc8c" : backgroundColor;
    onAnyChange();
}

addToImageRadioSelector = function(imageSrc, imageSelector, radioGroupName, bgColor)
{
    var div = document.createElement('div');
    div.setAttribute('class', 'mr-0');
    div.innerHTML = `
        <label for="${ radioGroupName }-${ imageSrc }"><img src="${ imageSrc }" width="50" height="50" alt="" style="background-color:${ bgColor };"></label>
        <input type="radio" style="display:none;" name="${ radioGroupName }" id="${ radioGroupName }-${ imageSrc }" onchange="onRunemarkSelectionChanged(this, '${ bgColor }')">
    `;
    imageSelector.appendChild(div);
    return div;
}

onFactionRunemarkFileSelect = function()
{
    var imageSelect = $("#additionalFactionMarkSelect")[0];
    var selectGrid = $("#factionRunemarkSelect")[0];

    for (i = 0; i < imageSelect.files.length; i++)
    {
        addToImageRadioSelector(URL.createObjectURL(imageSelect.files[i]), selectGrid, "faction", "black");
    }
}

onWeaponRunemarkFileSelect = function(input, weaponName)
{
    var grid = $(input.parentNode).find("#weaponRunemarkSelect")[0];

    for (i = 0; i < input.files.length; i++)
    {
        addToImageRadioSelector(URL.createObjectURL(input.files[i]), grid, weaponName, "white");
    }
}

function addToImageCheckboxSelector(imgSrc, grid, bgColor)
{
    var div = document.createElement('div');
    div.setAttribute('class', 'mr-0');
    div.innerHTML = `
    <label for="checkbox-${ imgSrc }">
        <img src="${ imgSrc }" width="50" height="50" alt="" style="background-color:${ bgColor };">
    </label>
    <input type="checkbox" style="display:none;" id="checkbox-${ imgSrc }" onchange="onTagRunemarkSelectionChanged(this, '${ bgColor }')">
    `;
    // grid.appendChild(div);
    return div;
}

function onTagRunemarkFileSelect()
{
    var imageSelect = $("#additionalTagMarkSelect")[0];
    // var selectGrid = $("#tagRunemarkSelect")[0];
    var selectGrid = $("[id^='tagRunemarkSelect_']")[0];

    for (i = 0; i < imageSelect.files.length; i++)
    {
        addToImageCheckboxSelector(URL.createObjectURL(imageSelect.files[i]), selectGrid, "white");
    }
}

function onClearCache()
{
    window.localStorage.clear();
    location.reload();
    return false;
}

function onResetToDefault()
{
    var cardData = defaultCardData();
    writeControls(cardData);
    render(cardData);
}

function refreshSaveSlots()
{
    // Remove all
    $('select').children('option').remove();

    var cardDataName = readControls().name;

    var map = loadCardDataMap();

    for (let [key, value] of Object.entries(map)) {
        var selected = false;
        if (cardDataName &&
            key == cardDataName)
        {
            selected = true;
        }
        var newOption = new Option(key, key, selected, selected);
        $('#saveSlotsSelect').append(newOption);
    }
}

function onSaveClicked()
{
    var cardData = readControls();
    console.log("Saving '" + cardData.name + "'...");
    saveCardData(cardData);
    refreshSaveSlots();
}

function onLoadClicked()
{
    var cardDataName = $('#saveSlotsSelect').find(":selected").text();
    console.log("Loading '" + cardDataName + "'...");
    cardData = loadCardData(cardDataName);
    writeControls(cardData);
    render(cardData);
    refreshSaveSlots();
}

function onDeleteClicked()
{
    var cardDataName = $('#saveSlotsSelect').find(":selected").text();

    console.log("Deleting '" + cardDataName + "'...");

    var map = loadCardDataMap();
    delete map[cardDataName];

    saveCardDataMap(map);

    refreshSaveSlots();
}

// …
// …
// …

function saveCardAsImage() {
    var element = document.createElement('a');
    element.setAttribute('href', document.getElementById('canvas').toDataURL('image/png'));
    element.setAttribute('download', 'warcry-ability-card.png');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

$(document).ready(function() {
    var c=document.getElementById('canvas');
    var ctx=c.getContext('2d');
    ctx.beginPath();
    ctx.arc(95,50,40,0,2*Math.PI);
    // ctx.stroke();
});
