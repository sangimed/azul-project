'use strict';

// GLOBAL VARIABLES
var previousChar = '';
var currentElement = null;
var currentUID = -1;

var customUIDCntr = 0;

// FUNCTIONS
document.addEventListener('keypress', (event) => {
    var currentChar = event.key;

    // Get the current DOM element.
    currentElement = document.activeElement;

    if ('INPUT' === currentElement.tagName || 'TEXTAREA' === currentElement.tagName) {

        // setting an UID to the active element if not already defined.
        if (typeof currentElement.uid === 'undefined') {
            setUID(currentElement);
        }

        currentUID = currentElement.uid;

        console.log(' currentUID ===== ' + currentUID);
        console.log(' uid = ' + currentElement.uid);
        if (currentElement.uid === currentUID) {
            console.log('currentElement.uid === currentUID PASSED...');
            if ('' !== previousChar) {
                console.log('currentChar : ' + currentChar + '\npreviousChar : ' + previousChar);
                // LOGIC HERE
                previousChar = currentChar;
            } else {
                previousChar = currentChar;
                console.log(' [ELSE] currentChar : ' + currentChar + '\npreviousChar : ' + previousChar);
            }
        }
    }
  });

/**
 * A function that increments the customUIDCntr.
 * @return {number} the incremented customUIDCntr.
 */
function getNextUID() {
    return customUIDCntr++;
}

/**
 * A function that sets a unique identifier on a specified DOM element.
 * @param {Element} the DOM element on which the uid will be set.
 */
function setUID(elem) {
    elem.uid = getNextUID();
}