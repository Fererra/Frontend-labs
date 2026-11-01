const SIZE = 6;
const CLICK_DELAY = 250;
let clickTimer = null;

function getRandomColor() {
    let color = Math.floor(Math.random() * 0x1000000).toString(16);
    while (color.length < 6) {
        color = "0" + color;
    }
    return "#" + color;
}

function getPaletteColor() {
    return document.getElementById("palette").value;
}

function randomColor(cell) {
    cell.style.backgroundColor = getRandomColor();
}

function paletteColor(cell) {
    clearTimeout(clickTimer);
    clickTimer = setTimeout(function () {
        cell.style.backgroundColor = getPaletteColor();
        clickTimer = null;
    }, CLICK_DELAY);
}

function antiDiagonalColor() {
    clearTimeout(clickTimer);
    clickTimer = null;

    const table = document.getElementById("grid");
    const color = getPaletteColor();

    for (let i = 0; i < SIZE; i++) {
        table.rows[i].cells[SIZE - 1 - i].style.backgroundColor = color;
    }
}
