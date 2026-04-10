const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Viewport
const xmin = 100;
const xmax = 400;
const ymin = 100;
const ymax = 300;

function dibujarViewport() {
    ctx.strokeStyle = "black";
    ctx.strokeRect(xmin, ymin, xmax - xmin, ymax - ymin);
}

dibujarViewport();