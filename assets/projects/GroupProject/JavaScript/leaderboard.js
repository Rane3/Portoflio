"use strict";
//GLOBAL VARIABLE FOR ORDER
let Descending = true;
const HSheader = document.querySelector("#scores");
HSheader.addEventListener("click",function(){
    if (Descending) {
        Descending = false;
    } else {
        Descending = true;
    }
    displayPlayHistory();
})
  


/**
 * Function to save the current play data only if the guy passes.
 * @param {HTMLElement} colorChosen - The color chosen by the player.
 * @param {HTMLElement} playerName - The player's name input element.
 * @param {HTMLElement} boardSize - The board size input element.
 * @param {HTMLElement} difficulty - The difficulty input element.
 * @returns {boolean} - True if the player passed, false otherwise.
 */
function savePlay(colorChosen, playerName, boardSize, difficulty) {
    const numSelected = afterColorsLoad();
    const numCorrect = getNumOfCorrectTiles(numSelected, colorChosen);

    // Retrieve the previous play history from localStorage (if any)
    const playHistory = JSON.parse(localStorage.getItem('playHistory')) || [];

    // Create an object to store the current play's data
    const currentPlay = {
        name: playerName.value,
        score: getScore(numCorrect, numSelected, boardSize, difficulty)
    };
    // Send player object to check if they passed
    const didpass = determineIfPass(currentPlay);

    if (didpass) {
        // Add the current play to the playHistory array
        playHistory.push(currentPlay);
        // Store the updated playHistory array in localStorage
        localStorage.setItem('playHistory', JSON.stringify(playHistory));
    }

    return didpass;
}
/**
 * this function will display the play history of the players
 */
function displayPlayHistory() {
    //Empty the leaderboard
    const playerList = document.getElementById("playernames");
    const scoreList = document.getElementById("scores");
    playerList.innerHTML = '';
    scoreList.innerHTML = '';

    const playHistory = JSON.parse(localStorage.getItem('playHistory')) || [];

    // Create and append the header elements
    const headerName = document.createElement('p');
    headerName.textContent = 'Player';
    headerName.classList.add("leaderboardHeader");
    playerList.appendChild(headerName);

    const headerScore = document.createElement('p');
    headerScore.textContent = 'Score';
    headerScore.classList.add("leaderboardHeader");
    scoreList.appendChild(headerScore);

    // Sort the plays in descending order by score
    const descendingOrder = playHistory.slice().sort((a, b) => b.score - a.score);
    // Sort the plays in ascending order by score
    const ascendingOrder = playHistory.slice().sort((a, b) => a.score - b.score);
    // Take the top 10 plays with the biggest score
    const biggestArray = descendingOrder.slice(0, 10);
    // Take the top 10 plays with the lowest score
    const smallestArray = ascendingOrder.slice(0, 10);
    //Create p elements and add them to the leaderbord

   
    let playsToDisplay = Descending ? smallestArray : biggestArray;
    playsToDisplay.forEach((play) => {
        const pname = document.createElement('p');
        pname.textContent = play.name;
        playerList.appendChild(pname);
        const pscore = document.createElement('p');
        pscore.textContent = play.score;
        scoreList.appendChild(pscore);
    });
}