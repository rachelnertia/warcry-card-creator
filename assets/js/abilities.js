writeValue = function(ctx, value, pos) {
    var scale = getScalingFactor(getCanvas(), getBackgroundImage());
    pos = {x: pos.x / scale.x, y: pos.y / scale.y };

    ctx.save();
    ctx.scale(scale.x, scale.y);
    ctx.fillText(value, pos.x, pos.y);
    ctx.restore();
}

getScalingFactor = function(canvas, smeeSmaaSmoo) {
    return {
        x: canvas.width  / smeeSmaaSmoo.width,
        y: canvas.height / smeeSmaaSmoo.height
    };
}

getCanvas = function() {
    return document.getElementById("otherCanvas");
}

getContext = function() {
    return getCanvas().getContext("2d");
}

getBackgroundImage = function() {
    if (document.getElementById('select-bg-abilities').checked) {
        return document.getElementById('bg-abilities');
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

render = function(yubbyData) {
    drawBackground();
}
