const ctx = document.getElementById("canvas").getContext("2d");
const canvasElement = ctx.canvas;
const w = canvasElement.width;
const h = canvasElement.height;

let minX = -2;
let maxX = 2;
let minY = -2;
let maxY = 2;
let stepX = (maxX - minX) / w;
let stepY = -(maxY - minY) / h;

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

const maxIterations = 255;
function calculate(constant) {
    const cx = constant[0];
    const cy = constant[1];
    let fx = 0;
    let fy = 0;
    for (let i=0; i<maxIterations; i++) {
        let tempX = fx**2 - fy**2 + cx;
	let tempY = 2*fx*fy + cy;
	if (Math.sqrt(tempX**2 + tempY**2) >= 2) {
	    return i;
        }
	fx = tempX;
	fy = tempY;
    }
    return maxIterations;
}

function color(r, c, value) {
    let valueColor = getColor(value);
    ctx.fillStyle = valueColor;
    ctx.fillRect(r, c, 1, 1);
}

function getColor(value) {
    return `rgb(${255 - value},${255 - value}, ${255 - value} )`;
}
function zoom(x, y) {
    let distX = maxX - minX;
    if (x === 0) {maxX -= distX / 2.2;}
    if (x === 1) {minX += distX / 4.4; maxX -= distX / 4.4;}
    if (x === 2) {minX += distX / 2.2;}
    let distY = maxY - minY;
    if (y === 2) {maxY -= distY / 2.2;}
    if (y === 1) {minY += distY / 4.4; maxY -= distY / 4.4;}
    if (y === 0) {minY += distY / 2.2;}
    stepX = (maxX - minX) / w;
    stepY = -(maxY - minY) / h;
    render();
}

document.getElementById('topleft').onclick = () => zoom(0,0);
document.getElementById('topmid').onclick = () => zoom(1,0);
document.getElementById('topright').onclick = () => zoom(2,0);
document.getElementById('midleft').onclick = () => zoom(0,1);
document.getElementById('midmid').onclick = () => zoom(1,1);
document.getElementById('midright').onclick = () => zoom(2,1);
document.getElementById('bottomleft').onclick = () => zoom(0,2);
document.getElementById('bottommid').onclick = () => zoom(1,2);
document.getElementById('bottomright').onclick = () => zoom(2,2);

render();
