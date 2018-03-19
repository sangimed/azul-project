// ----- contentscript.js -----
'use strict';

import {
    getCaretPosition, 
    getBeforeLastChar, 
    EDITABLE_TAGS,
    loadJSON } from './utils';

const MAPPING_FILE_PATH = '../app/data/letters_mapping.json';

loadJSON(MAPPING_FILE_PATH, function(response) {
    // Do Something with the response e.g.
    jsonresponse = JSON.parse(response);
    
    // Assuming json data is wrapped in square brackets as Drew suggests
    console.log(jsonresponse.version);
});

/**
 * LOGIC :
 * After each letter typed by the user do
 *  IF (There is any previous char [pc] before the last one [lc]) do
 *      IF (The two last chars [2l] math a key in the mapping file) do
 *          - Replace 2l with its corresponding value
 */

document.addEventListener('keypress', (event) => {
    // Current character
    let currentChar = event.key;

    // Get the current DOM element.
    let currentElement = document.activeElement;

    if (EDITABLE_TAGS.includes(currentElement.tagName) && currentChar !== ' ') {
        let caretPos = getCaretPosition(currentElement)
        let beforeLastChar = getBeforeLastChar(currentElement.value, caretPos);
        if (beforeLastChar != null) {
            console.log('beforeLastChar -> ' + '[' + beforeLastChar + ']');
            console.log('currentChar -> ', currentChar);
        }
    }
});