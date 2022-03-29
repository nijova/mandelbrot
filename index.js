const ctx = document.getElementById("canvas").getContext("2d");
const canvasElement = ctx.canvas;
const w = canvasElement.width;
const h = canvasElement.height;

let minX = -2;
let maxX = 2;
let minY = -2;
let maxY = 2;
let stepX = (maxX - minX) / w;
let stepY = -(maxY - minY) / h; // because canvas origin at top left corner. Flip y

function render() {
    for (let r=0; r<h; r++) {
        for (let c=0; c<w; c++) {
            let value = calculate(getConstant(r,c));
	    color(r, c, value);
        }
    }
}

function getConstant(r,c) {
    let x = minX + r * stepX;
    let y = maxY + c * stepY;
    return [x, y];
}

function calculate(constant) {
    return constant;
}

function color(r, c, value) {
    let valueColor = getColor(value);
    ctx.fillStyle = valueColor;
    ctx.fillRect(r, c, 1, 1);
}

const colors = ['red', 'black', 'yellow'];
function getColor(value) {
    return colors[(Math.round(Math.random()*100)) % colors.length];
}

render();
