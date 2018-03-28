// ----- contentscript.js -----
'use strict';

import {
    getCaretPosition,
    getBeforeLastChar,
    insertMappingValue,
    isEditable,
    EDITABLE_TAGS,
    LETTERS_MAPPING
} from './utils';

/**
 * LOGIC :
 * After each letter typed by the user do
 *  IF (There is any previous char [pc] before the last one [lc]) do
 *      IF (The two last chars [2l] math a key in the mapping file) do
 *          - Replace 2l with its corresponding value
 */

document.addEventListener('keypress', (event) => {

    // Current character.
    let currentChar = event.key;
    console.log('currentChar  ' + currentChar);

    // Get the current DOM element.
    let currentElement = document.activeElement;
    console.log('isEditable(currentElement) ' + isEditable(currentElement));
    console.log('currentElement : ' + currentElement);
    console.log('currentElement.innerText --> ' + currentElement.innerText)
    if (isEditable(currentElement) && currentChar !== ' ') {
        let caretPos = getCaretPosition(currentElement)
        console.log('caretPos  ' + caretPos);
        
        let beforeLastChar = getBeforeLastChar(currentElement.innerText, caretPos);
        console.log('beforeLastChar : ' + beforeLastChar);
        if (beforeLastChar != null && beforeLastChar !== ' ') {
            
            let charCombination = beforeLastChar + currentChar;
            
            console.log('TEEEEEEEEEST3 --- charCombination = ' + charCombination);
            if (LETTERS_MAPPING.latin.hasOwnProperty(charCombination)) {
                try {
                    insertMappingValue(currentElement, charCombination)
                } catch(error) {
                    console.log('ERROR : ' + error);
                }

                /**
                 * This will prevent from inserting the latest character typed after the mapped characters.
                 * 
                 * Example :    Suppose we have "amazig" in a text field and we type "h".
                 *              Without preventDefault() we would have had "amaziɣh" instead of "amaziɣ" 
                 * 
                 */
                event.preventDefault();
            }
        }
    }
});