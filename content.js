// content.js

// Globals
var previousChar = "";

// Functions
document.addEventListener('keypress', (event) => {
    const currentChar = event.key;
    const currentElement = document.activeElement.tagName;

    console.log("========== " + currentElement);

    if ("" !== previousChar) {
        console.log('currentChar : ' + currentChar + '\npreviousChar : ' + previousChar);
        // LOGIC HERE
        previousChar = currentChar;
    } else {
        previousChar = currentChar;
        console.log(' [ELSE] currentChar : ' + currentChar + '\npreviousChar : ' + previousChar);
    }
  });