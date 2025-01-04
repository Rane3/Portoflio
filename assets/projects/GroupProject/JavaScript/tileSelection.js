
"use strict";

// THIS FILE CONTAINS FUNCTIONS THAT HANDLE SELECTIONS OF TILES, THE FUNCTION THAT DIPLAYS THE LIVE COUNTER


/**
 * Function to handle actions after colors are loaded.
 */
let SelectedDivsArray = [];
function afterColorsLoad() {

    // Update the live counter with the initially empty array.
    updateLiveCounter(SelectedDivsArray);

    const allColorBoxes = document.querySelectorAll(".colorbox");


    for (let i = 0; i < allColorBoxes.length; i++) {
        if (allColorBoxes[i].tagName === "DIV") {
            allColorBoxes[i].addEventListener('click', function (event) {
                selectBoxes(event.target);
            });
        }
    }


    /**
     * Function to select or deselect color boxes and update the selection array.
     * @param {HTMLElement} colorBox - The color box element to select/deselect.
     */
    function selectBoxes(colorBox) {
        if (!SelectedDivsArray.includes(colorBox)) {
            if (colorBox.tagName === "DIV") {
                colorBox.style.border = "4px solid yellow";
                SelectedDivsArray.push(colorBox);
            }
        } else {
            colorBox.style.border = "4px solid grey";
            const index = SelectedDivsArray.indexOf(colorBox);
            if (colorBox.tagName === "DIV") {
                if (index !== -1) {
                    SelectedDivsArray.splice(index, 1);
                }
            }
        }
        updateLiveCounter(SelectedDivsArray);
    }

    /**
     * Function to count the number of selected tiles.
     * @returns {number} The number of selected tiles.
     */
    function countSelectedTiles() {
        return SelectedDivsArray.length;
    }

    /**
     * Function to update the live counter with the current selection information.
     * @param {Array<HTMLElement>} SelectedDivsArray - The array of selected color boxes.
     */
    function updateLiveCounter(SelectedDivsArray) {
        const color = document.getElementById("colour");
        const liveInfo = document.getElementById("liveinfo");
        const tilesTarget = countTilesOfColor(color.value);

        liveInfo.textContent = "Searching for " + color.value + " tiles! Your target is " + tilesTarget + " tiles! " + countSelectedTiles() + " selected!";
    }
    //Returns the number of selected color boxes
    return SelectedDivsArray;
}
/**
 * function resets selectedDivsArray
 */
function resetSelectedArray() {
    SelectedDivsArray = [];
}





