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
ctx.clearRect(0, 0, canvas.width, canvas.height);
dibujarViewport();
dibujarLinea(50, 50, 450, 350);
// recorte
let res = cohenSutherland(50, 50, 450, 350);

if (res) {
    ctx.strokeStyle = "green";
    ctx.beginPath();
    ctx.moveTo(res.x1, res.y1);
    ctx.lineTo(res.x2, res.y2);
    ctx.stroke();
}
function cohenSutherland(x1, y1, x2, y2) {

    let code1 = computeCode(x1, y1);
    let code2 = computeCode(x2, y2);

    let accept = false;

    while (true) {

        if (code1 === 0 && code2 === 0) {
            accept = true;
            break;
        }
        else if ((code1 & code2) !== 0) {
            break;
        }
        else {
            let codeOut = code1 !== 0 ? code1 : code2;
            let x, y;

            if (codeOut & TOP) {
                x = x1 + (x2 - x1) * (ymin - y1) / (y2 - y1);
                y = ymin;
            }
            else if (codeOut & BOTTOM) {
                x = x1 + (x2 - x1) * (ymax - y1) / (y2 - y1);
                y = ymax;
            }
            else if (codeOut & RIGHT) {
                y = y1 + (y2 - y1) * (xmax - x1) / (x2 - x1);
                x = xmax;
            }
            else if (codeOut & LEFT) {
                y = y1 + (y2 - y1) * (xmin - x1) / (x2 - x1);
                x = xmin;
            }

            if (codeOut === code1) {
                x1 = x;
                y1 = y;
                code1 = computeCode(x1, y1);
            } else {
                x2 = x;
                y2 = y;
                code2 = computeCode(x2, y2);
            }
        }
    }

    if (accept) return { x1, y1, x2, y2 };
    else return null;
}