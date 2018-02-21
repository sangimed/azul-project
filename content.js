// content.js

// Globals
var previousChar = "";

// Functions
document.addEventListener('keypress', (event) => {
    const currentChar = event.key;
    
    if ("" !== previousChar) {
        console.log('currentChar : ' + currentChar + '\npreviousChar : ' + previousChar);
        
        previousChar = currentChar;
    } else {
        previousChar = currentChar;
        console.log(' [ELSE] currentChar : ' + currentChar + '\npreviousChar : ' + previousChar);
    }
  });