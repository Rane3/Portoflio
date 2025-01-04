"use sctrict";
//THIS FILE CONTAINS FUNCTIONS THAT HANDLE GAME SETUP, CREATE TILES AND DESIGN COLORS ALGORITHM
//Content Loaded event
document.addEventListener("DOMContentLoaded", loaded());

/**
 * Function that runs after the document is loaded.
 */
function loaded() {
    
    //Retrieve form and clear button
    const form = document.getElementById("gamesetuparea");
    const clearButton = document.getElementById("resetbutton");

    
    //Disable submit your guess
    const submitGuess = document.getElementById("gamesubmit");
    
    submitGuess.disabled = true;
    //Start button and clear button listeners
    form.addEventListener("submit", start);
    clearButton.addEventListener("click", function () {
        clearPlayHistory();
        displayPlayHistory();
    });
}
/**
 * Function to disable form elements, create boxes, and add an event listener.
 *
 * @param {Event} event - The event object.
 */
function start(event) {
    event.preventDefault();
    //Retrieve all inputs
    const playerName = document.getElementById("playername");
    const boardSize = document.getElementById("boardSize");
    const difficulty = document.getElementById("difficultyInput");
    const color = document.getElementById("colour");
    const startButton = document.getElementById("submit");
    const submitGuess = document.getElementById("gamesubmit");
   
    //Change start button color
    startButton.style.backgroundColor= color.value;
    //Disable inputs
    playerName.disabled = true;
    boardSize.disabled = true;
    difficulty.disabled = true;
    color.disabled = true;
    startButton.disabled = true;
    submitGuess.disabled =false;
    //Create elements
    createBoxes(boardSize);

}

/**
 * Function to create rows and columns of boxes.
 *
 * @param {HTMLInputElement} size - The input element representing the board size.
 */
function createBoxes(size) {
    // Retrieve the game space div
    const gamespace = document.getElementById("colorstopress");

    // Create rows and columns
    for (let i = 0; i < size.value; i++) {
        const row = document.createElement('div');
        row.classList.add("colorrow");
        gamespace.appendChild(row);
        for (let y = 0; y < size.value; y++) {
            const box = document.createElement('div');
            box.classList.add("colorbox");
            assignColor(box);
            row.appendChild(box);
            makeRgbForColorBox(box);
        }
    }
    afterColorsLoad();
    noBoxFound();
}

/**
 * Function to assign a random color to a box.
 *
 * @param {HTMLDivElement} box - The box element to which the color is assigned.
 */
function assignColor(box) {
    const difficulty = document.getElementById("difficultyInput");
    const rgb = randomizedRGB(difficulty);
    box.style.backgroundColor = rgb;
}

/**
 * Function to generate a randomized RGB color based on the specified difficulty.
 *
 * @param {HTMLInputElement} difficulty - The input element representing the difficulty level.
 * @returns {string} The generated RGB color.
 */
function randomizedRGB(difficulty) {
    let r, g, b;

    if (difficulty.value == 0) {
        r = randomInt(0, 255);
        g = randomInt(0, 255);
        b = randomInt(0, 255);
    } else if (difficulty.value == 1) {
        r = randomInt(0, 255);
        g = r + randomInt(-40, 40);
        b = r + randomInt(-40, 40);
    } else if (difficulty.value == 2) {
        r = randomInt(0, 255);
        g = r + randomInt(-20, 20);
        b = r + randomInt(-20, 20);
    } else if (difficulty.value == 3) {
        r = randomInt(0, 255);
        g = r + randomInt(-5, 5);
        b = r + randomInt(-5, 5);
    }

    // Make sure r, g, and b stay within the 0-255 range
    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));

    const rgbReturned = `rgb(${r},${g},${b})`;
    return rgbReturned;
}

/**
 * Function to generate a random integer between a minimum and maximum value.
 *
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @returns {number} The generated random integer.
 */
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * function will restart the game if no boxes are available to select
 */
function noBoxFound(){
    const color = document.getElementById("colour");
    const countOfSearched = countTilesOfColor(color.value);

    if (countOfSearched == 0 ){
        alert("No boxes with selected color found restart");
        restart();
    }
}