const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const INSIDE = 0;
const TOP = 1;
const BOTTOM = 2;
const RIGHT = 4;
const LEFT = 8;

function computeCode(x, y) {
    let code = INSIDE;

    if (y < ymin) code |= TOP;
    else if (y > ymax) code |= BOTTOM;

    if (x > xmax) code |= RIGHT;
    else if (x < xmin) code |= LEFT;

    return code;
}

// prueba
console.log(computeCode(50, 50)); // ejemplo

// Viewport
const xmin = 100;
const xmax = 400;
const ymin = 100;
const ymax = 300;

function dibujarViewport() {
    ctx.strokeStyle = "black";
    ctx.strokeRect(xmin, ymin, xmax - xmin, ymax - ymin);
}

function dibujarLinea(x1, y1, x2, y2) {
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

dibujarViewport();
dibujarLinea(50, 50, 450, 350);

dibujarViewport();
