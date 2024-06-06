"use sctrict";
//THIS FILE CONTAINS A FUNCTION THAT ASSIGNS RGB "p" TO EVERY TILE, A FUNCTION THAT ASSIGNS A "p" with the predominant color(s) for each tile
// AND FINALLY THE CHEAT FUNCTION



/**
 * Get the predominant color from a string representing rgb.
 * @param {string} rgbValues - A string representing the rgb.
 * @returns {string} - The predominant color or color combination.
 */
function getPredominantColor(rgbValues) {
    rgbValues = rgbValues.map(value => parseInt(value));

    if (rgbValues[0] === rgbValues[1] && rgbValues[0] >= rgbValues[2]) {
        return "Red | Green"
    } else if (rgbValues[1] === rgbValues[2] && rgbValues[1] >= rgbValues[0]) {
        return "Green | Blue"
    } else if (rgbValues[2] === rgbValues[0] && rgbValues[2] >= rgbValues[1]) {
        return "Red | Blue"
    }else if (rgbValues[2] === rgbValues[0] && rgbValues[0] === rgbValues[1]) {
        return "Red | Blue | Green";
    }else if (rgbValues[0] >= rgbValues[1] && rgbValues[0] >= rgbValues[2]) {
        return "Red";
    } else if (rgbValues[1] >= rgbValues[0] && rgbValues[1] >= rgbValues[2]) {
        return "Green";
    } else if (rgbValues[2] >= rgbValues[0] && rgbValues[2] >= rgbValues[1]) {
        return "Blue";
    }
}
/**
 * Create and append RGB value and predominant color information to a color box element.
 * @param {Element} colorBox - The color box element to which information is appended.
 */
function makeRgbForColorBox(colorBox) {
    const columnStyle = window.getComputedStyle(colorBox);
    const backgroundColor = columnStyle.backgroundColor;
    const rgbValues = backgroundColor.match(/\d+/g);
    const p = document.createElement('p');
    p.innerText = "rgb(" + rgbValues[0] + "," + rgbValues[1] + "," + rgbValues[2] + ")"
    p.style.marginBottom = 0;
    colorBox.appendChild(p);
    const p2 = document.createElement('p');
    p2.innerText = getPredominantColor(rgbValues);
    p2.style.marginTop = 0;
    colorBox.appendChild(p2);
}

/**
 * Toggle the visibility of RGB value and predominant color information in color boxes
 * when the 'C' key with the Shift key is pressed.
 * @param {Event} event - The keydown event.
 */
document.addEventListener('keydown', function (event) {
    if ((event.key === 'c' || event.key === 'C') && event.shiftKey) {
        // Check if the event target is not an input element (text field)
        if (event.target && event.target.tagName !== 'INPUT') {
            const colorBoxes = document.querySelectorAll(".colorbox p");
            colorBoxes.forEach((box) => {
                if (box.style.visibility === "visible") {
                    box.style.visibility = "hidden";
                } else {
                    box.style.visibility = "visible";
                }
            });
        }
    }
});

