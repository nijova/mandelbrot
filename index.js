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

const maxIterations = 9;
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

const colors = ['grey', 'white', 'yellow', 'orange', 'red', 'darkred', 'purple', 'blue', 'navy', 'black'];
function getColor(value) {
    return colors[value];
}

render();
