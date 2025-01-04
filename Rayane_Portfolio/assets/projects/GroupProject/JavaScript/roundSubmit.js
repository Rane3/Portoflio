"use strict";
//THIS FILE CONTAINS THE FUNCTION THAT HANDLES ATTEMPT SUBMITTION, FUNCTION THAT SAVES A PLAY, FUNCTION THAT CHECKS IF PLAYER PASSES (AT LEAST 1 GOOD ANSWER) And prints result



document.addEventListener("DOMContentLoaded", loaded);
/**
 * Function to handle the DOMContentLoaded event.
 * @param {Event} event - The DOMContentLoaded event.
 */
function loaded(event) {
    const submitGuess = document.getElementById("gamesubmit");
    const playerName = document.getElementById("playername");
    const boardSize = document.getElementById("boardSize");
    const difficulty = document.getElementById("difficultyInput");
    const color=document.getElementById("colour");
    submitGuess.addEventListener("click", submitGame);
    // Display history
    displayPlayHistory();
    /**
     * Function that runs savePlay when the submit button is clicked 
     * savePlay is a function in leaderboard.js it checks if player passes if so then it saves the score if not it returns false 
     * (if the player succeeded it restarts the game and saves the score otherwise it lets him chose new tiles)
     * 
     * @param {Event} event - The click event.
     */
    function submitGame(event) {
        let bool = true;
        if (event.target.type == "submit") {
            bool = savePlay(color, playerName, boardSize, difficulty);
            displayPlayHistory();
            if (bool) {
                resetSelectedArray()
                restart();
            }
        }
        if (!bool) {
            savePlay(color, playerName, boardSize, difficulty);
        }
        event.preventDefault();
    }



}



/**
 * Function to determine if the player passed the game.
 * @param {Object} currentPlayer - The player's data.
 * @returns {boolean} - True if the player passed, false otherwise.
 */
function determineIfPass(currentPlayer) {
    let didPass = false;
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');
    const closePopupButton = document.getElementById('popup').children[1];
    const message = document.getElementById('message');
    message.classList.add("scoreMessage");
    let percentage = calculatePercent();
    percentage = parseFloat(percentage);
    percentage = Math.round(percentage);
    closePopupButton.addEventListener('click', () => {
        overlay.style.display = 'none';
        popup.style.display = 'none';
    });
    if (percentage >= 60) {
        message.innerText = "You Passed with " + percentage + "%";
        overlay.style.display = 'block';
        popup.style.display = 'flex';
        popup.style.backgroundColor = 'rgb(35, 216, 35)';
        closePopupButton.id = 'close'
        closePopupButton.innerText = "X"
        didPass = true;
        resetSelectedArray();
    } else {
        message.innerText = "You Failed with " + percentage + "%, You need at least 60%";
        overlay.style.display = 'block';
        popup.style.display = 'flex';
        popup.style.backgroundColor = 'red';
        closePopupButton.id = 'tryAgainButton'
        closePopupButton.innerText = "Try Again!"
        didPass = false;
    }
    closePopupButton.addEventListener('click', () => {
        if (didPass) {
            overlay.style.display = 'none';
            popup.style.display = 'none';
        } else {
            overlay.style.display = 'none';
            popup.style.display = 'none';
        }
    });
    return didPass;
}
/**
 * Calculates the percentage of correct tiles for a given color.
 *
 * @returns {number} The calculated percentage of correct tiles.
 */
function calculatePercent() {
    const color=document.getElementById("colour");
    let tilesofCOlor = countTilesOfColor(color.value);
    const numSelected = afterColorsLoad();
    let correctTiles = getNumOfCorrectTiles(numSelected, color);
    let incorrectTiles = getNumOfIncorrectTiles(numSelected, color);
    incorrectTiles = parseInt(incorrectTiles);
    correctTiles = parseInt(correctTiles);
    tilesofCOlor = parseInt(tilesofCOlor);
    let percent = (correctTiles - incorrectTiles) * 100 / tilesofCOlor;
    if (percent < 0)
        percent = 0;
    return percent;
}