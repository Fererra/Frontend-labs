const colorPairs = [
    { background: "#3b74bc", text: "#ffffff" },
    { background: "#f5d76e", text: "#333333" },
    { background: "#2e8b57", text: "#ffffff" },
    { background: "#c0392b", text: "#ffffff" },
    { background: "#bee1fc", text: "#1a1a1a" }
];

function changeColors(element) {
    const index = Number(element.dataset.colorIndex || 0);
    element.style.backgroundColor = colorPairs[index].background;
    element.style.color = colorPairs[index].text;
    element.dataset.colorIndex = (index + 1) % colorPairs.length;
}

const element5 = document.getElementById("element-5");
element5.onclick = function () {
    changeColors(element5);
};

const element6 = document.querySelector(".element-6");
element6.onclick = function () {
    changeColors(element6);
};

const DEFAULT_WIDTH = 600;
const MIN_WIDTH = 200;
const MAX_WIDTH = 1200;
const STEP = 100;

const imageLink = document.getElementById("image-link");
const statusText = document.getElementById("image-status");
const btnAdd = document.getElementById("btn-add");
const btnEnlarge = document.getElementById("btn-enlarge");
const btnShrink = document.getElementById("btn-shrink");
const btnRemove = document.getElementById("btn-remove");

let removedImage = null;

function getImage() {
    return document.getElementById("main-image");
}

function getWidth(image) {
    return Number(image.getAttribute("width")) || DEFAULT_WIDTH;
}

function updateButtons() {
    const image = getImage();
    btnAdd.disabled = image !== null;
    btnRemove.disabled = image === null;
    btnEnlarge.disabled = image === null || getWidth(image) >= MAX_WIDTH;
    btnShrink.disabled = image === null || getWidth(image) <= MIN_WIDTH;

    if (image === null) {
        statusText.innerHTML = "Зображення видалено.";
    } else {
        statusText.innerHTML = "Ширина зображення: " + getWidth(image) + " px";
    }
}

btnAdd.onclick = function () {
    if (removedImage === null) {
        return;
    }
    removedImage.width = DEFAULT_WIDTH;
    imageLink.appendChild(removedImage);
    removedImage = null;
    updateButtons();
};

btnEnlarge.onclick = function () {
    const image = getImage();
    if (image === null) {
        return;
    }
    image.width = Math.min(getWidth(image) + STEP, MAX_WIDTH);
    updateButtons();
};

btnShrink.onclick = function () {
    const image = getImage();
    if (image === null) {
        return;
    }
    image.width = Math.max(getWidth(image) - STEP, MIN_WIDTH);
    updateButtons();
};

btnRemove.onclick = function () {
    const image = getImage();
    if (image === null) {
        return;
    }
    image.remove();
    removedImage = image;
    updateButtons();
};

updateButtons();
