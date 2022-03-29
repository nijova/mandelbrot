const ctx = document.getElementById("canvas").getContext("2d");
const canvasElement = ctx.canvas;
const w = canvasElement.width;
const h = canvasElement.height;

let minX = -2;
let maxX = 2;
let minY = -2;
let maxY = 2;
let stepX = (maxX - minX) / w;
let stepY = (maxY - minY) / h;

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
    let y = minY + c * stepY;
    return [x, y];
}

function calculate(constant) {
    console.log(constant);
    return 1;
}

function color(r, c, value) {
    console.log('paint cell r c in color for value');
}

console.log(getConstant(1,2))

