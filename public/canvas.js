var picture = {
    canvas: null,
    context: null
};
var eventObject = {
    click: false,
    x: 0,
    y: 0,
};

var ink = [];

// 초기화
window.onload = function () {
    picture.canvas = document.getElementById("canvas");
    picture.context = picture.canvas.getContext("2d");
    mouseListener();
    draw();
}

function setClickTrue() {
    eventObject.click = true;
    var paths = {
        x:[],
        y:[],
        color:[]
    }
    ink.push(paths);
}

function setClickFalse() {
    eventObject.click = false;
}

function dragEvent(event) {
    picture.context.moveTo(eventObject.x, eventObject.y);
    eventObject.x = event.x;
    eventObject.y = event.y;

    if (eventObject.click) {
        var color = "#FFA500";
        document.querySelector('#cordinate').innerHTML = event.clientX + '  ' + event.clientY;
        picture.context.strokeStyle = color;
        picture.context.lineWidth = 4;
        picture.context.lineCap = 'round';
        picture.context.lineTo(event.x, event.y);
        picture.context.stroke();
        
        ink[ink.length-1].x.push(event.x);
        ink[ink.length-1].y.push(event.y);
        ink[ink.length-1].color.push(color);
    }
}

function mouseListener() {
    picture.canvas.addEventListener("mousedown", setClickTrue, false);
    picture.canvas.addEventListener("mouseup", setClickFalse, false);
    picture.canvas.addEventListener("mousemove", dragEvent, false);
}

function removeEvent() {
    picture.canvas.removeEventListener("mousedown", setClickTrue, false);
    picture.canvas.removeEventListener("mouseup", setClickFalse, false);
    picture.canvas.removeEventListener("mousemove", dragEvent, false);
}

function draw() {
    var ctx = picture.context;
    ctx.canvas.width = window.innerWidth-10;
    ctx.canvas.height = window.innerHeight-100;
    //...drawing code...
}
