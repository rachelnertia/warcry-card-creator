// $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
//     e.target // newly activated tab
//     e.relatedTarget // previous active tab
// })

writeValue = function(ctx, value, pos) {
    var scale = getScalingFactor(getCanvas(), getBackgroundImage());
    pos = {x: pos.x / scale.x, y: pos.y / scale.y };
    ctx.save();
    ctx.scale(scale.x, scale.y);
    ctx.fillText(value, pos.x, pos.y);
    ctx.restore();
}

getScalingFactor = function(canvas, smeeSmaSmoo) {
    return {
        x: canvas.width  / smeeSmaSmoo.width,
        y: canvas.height / smeeSmaSmoo.height
    };
}

getCanvas = function() {
    // return document.getElementById('canvas');

    $('#abilities-tab').on('shown.bs.tab', function (e) {
        return $(e.document).getElementById('other-canvas');
    });

    $('#fighters-tab').on('shown.bs.tab', function (e) {
        return $(e.document).getElementById('canvas');
    });
}

getContext = function() {
    return getCanvas().getContext('2d');
}

getBackgroundImage = function() {
    // if (document.getElementById('select-bg-dark-102').checked) {
    //     return document.getElementById('bg-dark-102');
    // }

    $('#abilities-tab').on('shown.bs.tab', function (e) {
        if ($(e.document).getElementById('select-bg-abilities').checked) {
            return $(e.document).getElementById('bg-abilities');
        }
    });

    $('#fighters-tab').on('shown.bs.tab', function (e) {
        if ($(e.document).getElementById('select-bg-dark-102').checked) {
            return $(e.document).getElementById('select-bg-dark-102');
        }
    });
}

drawBackground = function() {
    getContext().drawImage(
        getBackgroundImage(), 0, 0, getCanvas().width, getCanvas().height
    );
}

render = function(fighterData) {
    drawBackground();
}

function readControls() {
    var data = new Object;
    return data;
}

window.onload = function() {
    // //window.localStorage.clear();
    // var fighterData = loadLatestFighterData();
    // writeControls(fighterData);
    // render(fighterData);
    // refreshSaveSlots();
    var fighterData = readControls();
    render(fighterData);
}

onAnyChange = function() {
    var fighterData = readControls();
    render(fighterData);
    // saveLatestFighterData();
}
