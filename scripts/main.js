writeValue = function(ctx, value, pos) {
    ctx.fillText(value, pos.x, pos.y);
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

drawToughness = function() {
    drawCardElementFromInputId("toughness", {x: 257, y: 174});
}

drawWounds = function() {
    drawCardElementFromInputId("numWounds", {x: 210, y: 240});
}

drawMove = function() {
    drawCardElementFromInputId("movement", {x: 106, y: 174});
}

drawPointCost = function() {
    drawCardElementFromInputId("pointCost", {x: 494, y: 90});
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

drawWeapon = function(weaponDiv, pixelPosition) {
    drawWeaponStatblock(pixelPosition);

    var statsPosY = pixelPosition.y + 91;

    var rangeMin = weaponDiv.find("#rangeMin")[0].value;
    var rangeMax = weaponDiv.find("#rangeMax")[0].value;
    var range = (rangeMin > 0 ? (rangeMin + "-") : "") + rangeMax; 
    writeScaled(range, {x: pixelPosition.x + 166, y: statsPosY});

    drawCardElementFromInput(
        weaponDiv.find("#attacks")[0], 
        {x: pixelPosition.x + 258, y: statsPosY});
    
    drawCardElementFromInput(
        weaponDiv.find("#strength")[0], 
        {x: pixelPosition.x + 350, y: statsPosY});

    var damageBase = weaponDiv.find("#damageBase")[0].value;
    var damageCrit = weaponDiv.find("#damageCrit")[0].value;
    writeScaled(
        damageBase + "/" + damageCrit, 
        {x: pixelPosition.x + 421, y: statsPosY});

    var runemark = getSelectedRunemark(weaponDiv.find("#weaponRunemarkSelect")[0]); 
    if (runemark != null)
    {
        var position = scalePixelPosition({x: pixelPosition.x + 20, y: pixelPosition.y + 30});
        var size = scalePixelPosition({x: 90, y: 90});
        getContext().drawImage(runemark, position.x, position.y, size.x, size.y);    
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
}

function getSelectedFactionRunemark() {
    return getSelectedRunemark($('#factionRunemarkSelect')[0]);
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

function drawModel()
{
    var imageSelect = $("#imageSelect")[0];

    var imageOffsetX = $("#imageOffsetX")[0].valueAsNumber;
    var imageOffsetY = $("#imageOffsetY")[0].valueAsNumber;
    var imageScalePercent = $("#imageScalePercent")[0].valueAsNumber;

    if (imageSelect.files.length > 0)
    {
        var image = new Image();
        image.onload = function() {            
            var position = scalePixelPosition({x: 590 + imageOffsetX, y: imageOffsetY});
            var scale = imageScalePercent/100.0;
            var width = image.width * scale;
            var height = image.height * scale;
            getContext().drawImage(image, position.x, position.y, width, height);

            URL.revokeObjectURL(image.src);
        };
        image.src = URL.createObjectURL(imageSelect.files[0]);
    }
}

render = function() {
    drawBackground();

    drawModel();

    var runemark = getSelectedFactionRunemark(); 
    
    if (runemark != null)
    {
       var position = scalePixelPosition({x: 45, y: 45});
       var size = scalePixelPosition({x: 80, y: 80});
    
       getContext().drawImage(runemark, position.x, position.y, size.x, size.y);
    }

    getContext().font = "30px rodchenkoctt";
    getContext().fillStyle = "white";
    getContext().textBaseline = "top";
    getContext().textAlign = "left";

    drawToughness();
    drawWounds();
    drawMove();

    getContext().textBaseline = "middle";
    getContext().textAlign = "center";
    
    drawPointCost();
    
    getContext().textBaseline = "top";
    getContext().textAlign = "left";
    getContext().fillStyle = "black";

    if (getWeapon1() && getWeapon2())
    {
        drawWeapon(getWeapon1(), {x: 29, y: 397});
        drawWeapon(getWeapon2(), {x: 29, y: 564});
    }
    else if (getWeapon1())
    {
        drawWeapon(getWeapon1(), {x: 29, y: 463});
    }
    else if (getWeapon2())
    {
        drawWeapon(getWeapon2(), {x: 29, y: 463});
    }

    var checkedBoxes = $("#tagRunemarkSelect").find('input:checked');
    for (i = 0; i < checkedBoxes.length; i++)
    {
        drawTagRunemark(i, getImage(getLabel(checkedBoxes[i])));
    }
}

window.onload = function() {
    render();
}

onAnyChange = function() {
    render();
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

    for (i = 0; i < imageSelect.files.length; i++)
    {
        var selectGrid = $("#factionRunemarkSelect")[0];
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

