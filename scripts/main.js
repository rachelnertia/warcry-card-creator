writeValue = function(ctx, value, pos) {
    var scale = getScalingFactor(getCanvas(), getBackgroundImage());
    pos = {x: pos.x / scale.x, y: pos.y / scale.y };
    
    ctx.save();    
    ctx.scale(scale.x, scale.y);
    ctx.fillText(value, pos.x, pos.y);
    ctx.restore();
}

getScalingFactor = function(canvas, cardBackground) {
    return {
        x: canvas.width  / cardBackground.width,
        y: canvas.height / cardBackground.height
    };
}

getCanvas = function() {
    return document.getElementById("myCanvas");
}

getContext = function() {
    return getCanvas().getContext("2d");
}

getBackgroundImage = function() {
    return document.getElementById("cardBackground");
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

drawToughness = function(value) {
    writeScaled(value, {x: 257, y: 174});
}

drawWounds = function(value) {
    writeScaled(value, {x: 205, y: 240});
}

drawMove = function(value) {
    writeScaled(value, {x: 106, y: 174});
}

drawPointCost = function(value) {
    writeScaled(value, {x: 494, y: 90});
}

getWeaponStatblockImage = function() {
    return document.getElementById("weaponStatBlock");
}

drawWeaponStatblock = function(pixelPosition) {
    var image = getWeaponStatblockImage();
    var scaledPosition = scalePixelPosition(pixelPosition);
    var scaledSize = scalePixelPosition({x: image.width, y: image.height});
    getContext().drawImage(
        image,
        scaledPosition.x, 
        scaledPosition.y, 
        scaledSize.x, 
        scaledSize.y);
}

drawWeapon = function(weaponData, pixelPosition) {
    drawWeaponStatblock(pixelPosition);

    var statsPosY = pixelPosition.y + 91;

    var range = (weaponData.rangeMin > 0 ? (weaponData.rangeMin + "-") : "") + weaponData.rangeMax; 

    getContext().textAlign = "center";

    writeScaled(range, {x: pixelPosition.x + 175, y: statsPosY});

    writeScaled(
        weaponData.attacks, 
        {x: pixelPosition.x + 270, y: statsPosY});
    
    writeScaled(
        weaponData.strength, 
        {x: pixelPosition.x + 365, y: statsPosY});

    writeScaled(
        weaponData.damageBase + "/" + weaponData.damageCrit, 
        {x: pixelPosition.x + 460, y: statsPosY});

    if (weaponData.runemark != null)
    {
        var position = scalePixelPosition({x: pixelPosition.x + 20, y: pixelPosition.y + 30});
        var size = scalePixelPosition({x: 90, y: 90});
        getContext().drawImage(weaponData.runemark, position.x, position.y, size.x, size.y);    
    }
}

function getWeapon(weaponId) {
    return $(weaponId).find("#weaponEnabled")[0].checked ? $(weaponId) : null;
}

function getWeapon1() {
    return getWeapon("#weapon1");
} 

function getWeapon2() {
    return getWeapon("#weapon2");
}

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
        return getImage(getLabel(checked[0]));
    }
    return null;
}

function setSelectedRunemark(radioDiv, runemark)
{
    // uncheck all
    var checked = $(radioDiv).find('input:checked');
    for (var i = 0; i < checked.length; i++)
    {
        checked[i].checked = false;
    }

    if (runemark != null)
    {
        var queryString = "img[src='"+ runemark.getAttribute("src") +"']";
        var img = $(radioDiv).find(queryString);
        if (img.length > 0)
        {
            var radioButton = $(img[0].parentNode.parentNode).find("input")[0]; 
            radioButton.checked = true;
            // TODO: make sure all the other radio buttons are reset to the background colour.
            img[0].style.backgroundColor = "darkred"; 
        }
    }
}

function getSelectedFactionRunemark() {
    return getSelectedRunemark($('#factionRunemarkSelect')[0]);
}

function setSelectedFactionRunemark(runemark) {
    setSelectedRunemark($('#factionRunemarkSelect')[0], runemark);
}

function drawTagRunemark(index, runemark) {
    var positions = [{x: 330, y: 290}, {x: 440, y: 290}, {x: 385, y: 200}]; 
    if (index >= positions.length) return;

    var img = $("#runemarkBg")[0];

    var position = scalePixelPosition(positions[index]);
    var size = scalePixelPosition({x: 90, y: 90});
    getContext().drawImage(img, position.x, position.y, size.x, size.y);

    position = scalePixelPosition({x: positions[index].x + 10, y: positions[index].y + 10});
    size = scalePixelPosition({x: 70, y: 70});
    getContext().drawImage(runemark, position.x, position.y, size.x, size.y);
}

function drawModel(imageUrl, imageProps)
{
    if (imageUrl != null)
    {
        var image = new Image();
        image.onload = function(){
            var position = scalePixelPosition({x: 590 + imageProps.offsetX, y: imageProps.offsetY});
            var scale = imageProps.scalePercent/100.0;
            var width = image.width * scale;
            var height = image.height * scale;
            getContext().drawImage(image, position.x, position.y, width, height);

            URL.revokeObjectURL(image.src);
        };
        image.src = imageUrl;
    }
}

function getModelImage()
{
    var imageSelect = $("#imageSelect")[0];
    
    if (imageSelect.files.length > 0)
    {
        return URL.createObjectURL(imageSelect.files[0]);
    }

    return null;
}

function setModelImage(image)
{
    var imageSelect = $("#imageSelect")[0];

    // TODO: not sure how to do this
    // imageSelect.files[0] = image;
}

function getDefaultModelImageProperties()
{
    return {
        offsetX: 0,
        offsetY: 0,
        scalePercent: 100
    };
}

function getModelImageProperties()
{
    return {
        offsetX: $("#imageOffsetX")[0].valueAsNumber,
        offsetY: $("#imageOffsetY")[0].valueAsNumber,
        scalePercent: $("#imageScalePercent")[0].valueAsNumber
    };
}

function setModelImageProperties(modelImageProperties)
{
    $("#imageOffsetX")[0].value = modelImageProperties.offsetX;
    $("#imageOffsetY")[0].value = modelImageProperties.offsetY;
    $("#imageScalePercent")[0].value = modelImageProperties.scalePercent;
}

function getDefaultWeaponData()
{
    var weaponData = new Object;
    weaponData.enabled = true;
    weaponData.rangeMin = 0;
    weaponData.rangeMax = 1;
    weaponData.attacks = 1;
    weaponData.strength = 3;
    weaponData.damageBase = 1;
    weaponData.damageCrit = 2;
    weaponData.runemark = null;
    return weaponData;
}

function getDefaultWeaponData1()
{
    var data = getDefaultWeaponData();
    data.enabled = true;
    return data;
}

function getDefaultWeaponData2()
{
    var data = getDefaultWeaponData();
    data.enabled = false;
    return data;
}

function readWeaponControls(weaponId)
{
    var weaponData = new Object;
    var weaponDiv = $(weaponId);
    weaponData.enabled = weaponDiv.find("#weaponEnabled")[0].checked;
    weaponData.rangeMin = weaponDiv.find("#rangeMin")[0].value;
    weaponData.rangeMax = weaponDiv.find("#rangeMax")[0].value;
    weaponData.attacks = weaponDiv.find("#attacks")[0].value;
    weaponData.strength = weaponDiv.find("#strength")[0].value;
    weaponData.damageBase = weaponDiv.find("#damageBase")[0].value;
    weaponData.damageCrit = weaponDiv.find("#damageCrit")[0].value;
    weaponData.runemark = getSelectedRunemark(weaponDiv.find("#weaponRunemarkSelect")[0]); 
    return weaponData;
}

function writeWeaponControls(weaponId, weaponData)
{
    weaponDiv = $(weaponId);
    weaponDiv.find("#weaponEnabled")[0].checked = weaponData.enabled;
    weaponDiv.find("#rangeMin")[0].value = weaponData.rangeMin;
    weaponDiv.find("#rangeMax")[0].value = weaponData.rangeMax;
    weaponDiv.find("#attacks")[0].value = weaponData.attacks;
    weaponDiv.find("#strength")[0].value = weaponData.strength;
    weaponDiv.find("#damageBase")[0].value = weaponData.damageBase;
    weaponDiv.find("#damageCrit")[0].value = weaponData.damageCrit;
    setSelectedRunemark(weaponDiv.find("#weaponRunemarkSelect")[0], weaponData.runemark);
}

function readTagRunemarks()
{
    var array = new Array;
    var checkedBoxes = $("#tagRunemarkSelect").find('input:checked');
    for (i = 0; i < checkedBoxes.length; i++)
    {
        array.push(getImage(getLabel(checkedBoxes[i])));
    }
    return array;
}

function setSelectedTagRunemarks(selectedRunemarksArray)
{
    // TODO.
}

function readControls()
{
    var data = new Object;
    data.imageUrl = getModelImage();
    data.imageProperties = getModelImageProperties();
    data.factionRunemark = getSelectedFactionRunemark();
    data.toughness = document.getElementById("toughness").value;
    data.wounds = document.getElementById("numWounds").value;
    data.move = document.getElementById("movement").value;
    data.pointCost = document.getElementById("pointCost").value;
    data.tagRunemarks = readTagRunemarks();
    data.weapon1 = readWeaponControls("#weapon1");
    data.weapon2 = readWeaponControls("#weapon2");

    return data;
}

function drawFactionRunemark(image)
{
    if (image != null)
    {
        if (image.complete)
        {
            var position = scalePixelPosition({x: 45, y: 45});
            var size = scalePixelPosition({x: 80, y: 80});
    
            getContext().drawImage(image, position.x, position.y, size.x, size.y);
        }
        else
        {
            // come back once it's loaded.
            image.onload = function(){ drawFactionRunemark(image); };
        }    
    }
}

render = function(fighterData) {
    drawBackground();

    drawModel(fighterData.imageUrl, fighterData.imageProperties);
    drawFactionRunemark(fighterData.factionRunemark);

    getContext().font = "50px rodchenkoctt";
    getContext().fillStyle = "white";
    getContext().textBaseline = "top";
    getContext().textAlign = "left";

    drawToughness(fighterData.toughness);
    drawWounds(fighterData.wounds);
    drawMove(fighterData.move);

    getContext().textBaseline = "middle";
    getContext().textAlign = "center";
    
    drawPointCost(fighterData.pointCost);
    
    getContext().textBaseline = "top";
    getContext().textAlign = "left";
    getContext().fillStyle = "black";

    if (fighterData.weapon1.enabled && fighterData.weapon2.enabled)
    {
        drawWeapon(fighterData.weapon1, {x: 29, y: 397});
        drawWeapon(fighterData.weapon2, {x: 29, y: 564});
    }
    else if (fighterData.weapon1.enabled)
    {
        drawWeapon(fighterData.weapon1, {x: 29, y: 463});
    }
    else if (fighterData.weapon2.enabled)
    {
        drawWeapon(fighterData.weapon2, {x: 29, y: 463});
    }

    for (i = 0; i < fighterData.tagRunemarks.length; i++)
    {
        drawTagRunemark(i, fighterData.tagRunemarks[i]);
    }
}

function writeControls(fighterData)
{
    setModelImage(fighterData.imageUrl);
    setModelImageProperties(fighterData.imageProperties);
    setSelectedFactionRunemark(fighterData.factionRunemark);
    $("#toughness")[0].value = fighterData.toughness;
    $("#numWounds")[0].value = fighterData.wounds;
    $("#movement")[0].value = fighterData.move;
    $("#pointCost")[0].value = fighterData.pointCost;
    setSelectedTagRunemarks(fighterData.tagRunemarks);
    writeWeaponControls("#weapon1", fighterData.weapon1);
    writeWeaponControls("#weapon2", fighterData.weapon2);
}

function defaultFighterData()
{
    var fighterData = new Object;
    fighterData.imageUrl = null;
    fighterData.imageProperties = getDefaultModelImageProperties();
    fighterData.factionRunemark = new Image();
    fighterData.factionRunemark.src = "runemarks/iron-golems.svg";
    fighterData.toughness = 3;
    fighterData.wounds = 10;
    fighterData.move = 4;
    fighterData.pointCost = 100;
    fighterData.tagRunemarks = new Array;
    fighterData.weapon1 = getDefaultWeaponData1();
    fighterData.weapon2 = getDefaultWeaponData2();
    return fighterData;
}

function loadFighterData()
{
    // TODO.
    return defaultFighterData();
}

function saveFighterData(fighterData)
{
    // TODO
}

window.onload = function() {
    //var fighterData = readControls();
    var fighterData = loadFighterData();
    writeControls(fighterData);
    render(fighterData);
}

onAnyChange = function() {
    var fighterData = readControls();
    render(fighterData);
    saveFighterData(fighterData);
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

    getImage(getLabel(radioButton)).style.backgroundColor = "darkred"; 

    onAnyChange();
}

onTagRunemarkSelectionChanged = function(checkbox, backgroundColor)
{
    getImage(getLabel(checkbox)).style.backgroundColor = checkbox.checked ? "darkred" : backgroundColor;

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
    grid.appendChild(div);
}

function onTagRunemarkFileSelect()
{
    var imageSelect = $("#additionalTagMarkSelect")[0];
    var selectGrid = $("#tagRunemarkSelect")[0];

    for (i = 0; i < imageSelect.files.length; i++)
    {
        addToImageCheckboxSelector(URL.createObjectURL(imageSelect.files[i]), selectGrid, "white");
    }
}