
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const img = new Image();
img.src = 'img/maze.svg';

img.onload = function() {
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
};


const GRID_SIZE = 16;
const dotSize = 8;

// ročni fine-tuning pozicije
const OFFSET_X = -13;
const OFFSET_Y = 3;

// tvoja pot
const moves = "3L,1D,2L,1U,1L,2D"; // krajša za test
const moveList = moves.split(',');

// start: zgoraj na sredini
let x = 15;
let y = 0;

const path = [[x, y]];

// izračun poti
moveList.forEach(move => {
    const dir = move.slice(-1);
    const steps = parseInt(move.slice(0, -1));
    for (let i = 0; i < steps; i++) {
        if (dir === 'U') y--;
        if (dir === 'D') y++;
        if (dir === 'L') x--;
        if (dir === 'R') x++;
        path.push([x, y]);
    }
});

// nariši pikice na canvas
ctx.fillStyle = 'yellow';
path.forEach(point => {
    const px = point[0] * GRID_SIZE + (GRID_SIZE - dotSize)/2 + OFFSET_X;
    const py = point[1] * GRID_SIZE + (GRID_SIZE - dotSize)/2 + OFFSET_Y;
    ctx.fillRect(px, py, dotSize, dotSize);
});