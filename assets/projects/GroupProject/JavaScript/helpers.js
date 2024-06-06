"use strict";
//THIS FILE CONTAINS THE HELPER FUNCTIONS :  CLEAR HISTORY, GET CORRECT TILES, GET SCORE, RESTART, GET TILES OF COLOR CHOSEN


/**
 * Function to clear the play history stored in localStorage.
 */
function clearPlayHistory() {
    localStorage.removeItem('playHistory');
}

/**
 * Function to get the number of correct tiles selected by the player.
 * @param {Array} numSelected - The array of selected tiles.
 * @param {HTMLElement} colorSearched - The color searched by the player.
 * @returns {number} - The number of correct tiles.
 */
function getNumOfCorrectTiles(numSelected, colorSearched) {
    let counter = 0;

    numSelected.forEach(function (div) {
        const pElements = div.querySelectorAll('p');
        const p2Text = pElements[1].textContent;
        if (p2Text.includes(colorSearched.value)) {
            counter++;
        }
    });

    return counter;
}
/**
 * Function to get the number of correct tiles selected by the player.
 * @param {Array} numSelected - The array of selected tiles.
 * @param {HTMLElement} colorSearched - The color searched by the player.
 * @returns {number} - The number of correct tiles.
 */
function getNumOfIncorrectTiles(numSelected, colorSearched) {
    let counter = 0;

    numSelected.forEach(function (div) {
        const pElements = div.querySelectorAll('p');
        const p2Text = pElements[1].textContent;
        if (!p2Text.includes(colorSearched.value)) {
            counter++;
        }
    });

    return counter;
}

/**
 * Function to calculate the player's score.
 * @param {number} numCorrect - The number of correct tiles.
 * @param {Array} numSelected - The array of selected tiles.
 * @param {HTMLElement} boardSize - The board size input element.
 * @param {HTMLElement} difficulty - The difficulty input element.
 * @returns {number} - The player's score.
 */
function getScore(numCorrect, numSelected, boardSize, difficulty) {
    const percent = (2 * numCorrect - numSelected.length) / (boardSize.value * boardSize.value);
    return Math.floor(percent * 100 * boardSize.value * (difficulty.value + 1));
}


/**
 * this function restarts the game without reloading the page
 */
function restart(){
    //Retrieve all inputs
    const playerName = document.getElementById("playername");
    const boardSize = document.getElementById("boardSize");
    const difficulty = document.getElementById("difficultyInput");
    const color = document.getElementById("colour");
    const startButton = document.getElementById("submit");
    const liveInfo = document.getElementById("liveinfo");
    const submitGuess = document.getElementById("gamesubmit");
   
    //Change start button color
    startButton.style.backgroundColor= color.value;
    //Disable inputs refresh everything
    playerName.disabled = false;
    boardSize.disabled = false;
    difficulty.disabled = false;
    color.disabled = false;
    startButton.disabled = false;
    submitGuess.disabled =true;
    liveInfo.textContent = "";
    startButton.style.backgroundColor = "";
    //Delete every tile
    const rows = document.querySelectorAll(".colorrow");
    rows.forEach((row) =>{
        while (row.firstChild){
            row.removeChild(row.firstChild);
        }
        row.parentNode.removeChild(row);
    })
        
    
}

/**

Counts the number of elements with a specific color within elements of the "colorbox" class.*
@param {string} color - The color to search for in the elements.
@returns {number} The count of elements with the specified color.
*/

function countTilesOfColor(color) {

    const everyboxP = document.querySelectorAll('.colorbox p:nth-child(2)');
    let counter = 0;

    everyboxP.forEach((p) => {

        if (p.textContent.includes(color)) {
            counter++;
        }
    });

    return counter;
}


