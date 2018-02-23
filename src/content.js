// content.js
"use strict";

// Globals
var previousChar = "";
var currentElement = null;
var customIDprefix = "uid_";
var customIDCntr = 0;

// Functions
document.addEventListener('keypress', (event) => {
    var currentChar = event.key;

    currentElement = document.activeElement;

    // setting an UID to the active element if not already defined.
    if (typeof currentElement.uid === 'undefined') {
        setID(currentElement);
    }

    console.log("  tag name = " + currentElement.tagName + " uid = " + currentElement.uid);
    if ("INPUT" === currentElement.tagName || "TEXTAREA" === currentElement.tagName) {
        if ("" !== previousChar) {
            console.log('currentChar : ' + currentChar + '\npreviousChar : ' + previousChar);
            // LOGIC HERE
            previousChar = currentChar;
        } else {
            previousChar = currentChar;
            console.log(' [ELSE] currentChar : ' + currentChar + '\npreviousChar : ' + previousChar);
        }
    }
  });

function getNextID() {
    return customIDprefix + customIDCntr++;
}

function setID(elem) {
    elem.uid = getNextID();
}