// ----- contentscript.js -----
'use strict';

import {
    getCaretPosition,
    getBeforeLastChar,
    insertMappingValue,
    isEditable,
    findDeepest,
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

    // Get the current DOM element.
    let currentElement = document.activeElement;

    if ((isEditable(currentElement) || currentElement.isContentEditable) && currentChar !== ' ') {

        let caretPos = getCaretPosition(currentElement)        
        let beforeLastChar = getBeforeLastChar(currentElement.value, caretPos);
        if (beforeLastChar != null && beforeLastChar !== ' ') {
            
            let charCombination = beforeLastChar + currentChar;
            
            if (LETTERS_MAPPING.latin.hasOwnProperty(charCombination)) {

                insertMappingValue(currentElement, charCombination)

                /**
                 * This will prevent from inserting the latest character typed after the mapped characters.
                 * 
                 * Example :    Suppose we have "amazig" in a text field and we type "h".
                 *              Without preventDefault() we would have had "amaziɣh" instead of "amaziɣ"
                 */
                event.preventDefault();
            }
        }
    }
});