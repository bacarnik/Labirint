const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = "img/maze.svg";

const pacmanImg = new Image();
pacmanImg.src = "img/pacman.svg";

const GRID_CELLS = 30;
const DOT_SIZE = 8;
//const PAC_SIZE = 20;

const MARGIN_TOP = 15;     // Razdalja od vrha canvasa do sredine prve vrstice
const MARGIN_LEFT = -10;   // Razdalja od levega roba canvasa do sredine prvega stolpca
const STEP = 26.5;         // Razmik med središči celic


// zapis poti
const moves = "3L,1D,2L,1U,1L,2D,1L,2U,1L,1D,1L,1U,2L,2D,2L,2U,1L,6D,1R,1D,1L,2D,1R,1U,1R,2U,2R,1D,1R,1U,1R,1D,1R,1D,1L,1D,1R,1D,3R,1U,1R,1D,1R,1D,5L,3D,2R,1D,1L,2D,1L,2U,1L,3U,3L,1D,2R,1D,1L,2D,1R,1D,1L,3D,1R,1D,1L,1D,1L,1U,2L,2U,1R,1D,1R,2U,3L,5D,3R,1D,1R,1U,2R,1D,2R,1D,4R,1U,4R,1U,1R,1D,1R,2D,1R,1D,2L,2U,2L,1D,2L,1D,1L,1D,1R,1D,1R,1U,1R,2D";

const moveList = moves.split(",");

// začetna celica
let x = 15;
let y = 0;

const path = [[x, y]];

// pretvori zapis poti v seznam celic
moveList.forEach(move => {

    const dir = move.slice(-1);
    const steps = parseInt(move.slice(0, -1));

    for (let i = 0; i < steps; i++) {

        if (dir === "L") x--;
        if (dir === "R") x++;
        if (dir === "U") y--;
        if (dir === "D") y++;

        path.push([x, y]);
    }

});

img.onload = function () {

    // nariši labirint
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    drawDots();

};

function drawDots() {

    ctx.fillStyle = "yellow";

    path.forEach(([cx, cy], index) => {
        setTimeout(() => {
            // Nova formula brez OFFSET_X in OFFSET_Y
            const px = MARGIN_LEFT + (cx * STEP);
            const py = MARGIN_TOP + (cy * STEP);

            ctx.beginPath();
            ctx.arc(px, py, DOT_SIZE / 2, 0, Math.PI * 2);
            ctx.fill();
        }, index * 40);
    });
}