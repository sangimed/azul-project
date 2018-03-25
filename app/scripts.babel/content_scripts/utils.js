'use strict';

// ----- utils.js -----

// CONSTANTS

/**
 * Defines the tags on which the extension will be triggered.
 */
const EDITABLE_TAGS = ['INPUT', 'TEXTAREA'];

const LETTERS_MAPPING = require('../../data/letters_mapping.json');

// FUNCTIONS

/****** BEGIN EXPERIMENTING ******/

// function getCaretPosition() {
//     if (window.getSelection && window.getSelection().getRangeAt) {
//       var range = window.getSelection().getRangeAt(0);
//       var rangeCount = 0;
//       return range.startOffset + rangeCount;
//     }
//     return -1;
// }

/****** END EXPERIMENTING ******/


/**
 * Gets the caret position of a given DOM element.
 * @param {Element} ctrl - The DOM element on which the caret position is searched. 
 */
function getCaretPosition(ctrl) {
    let caretPos = 0;
    if (document.selection) {
        ctrl.focus();
        let sel = document.selection.createRange();
        sel.moveStart('character', -ctrl.value.length);
        caretPos = sel.text.length;
    }
    // Firefox support
    else if (ctrl.selectionStart || ctrl.selectionStart == '0') {
        caretPos = ctrl.selectionStart;
    }

    return (caretPos);
}

/**
 * Gets gets the second last character relativly to the caret position.
 * Example : "Hello|" return "l", "He|llo" return H, 
 * @param {number} caretPos - The caret position index.
 * @param {String} text - The text containing the character to be returned.  
 * @param {*} caretPos - The caret position.
 * @returns {String} The second last character (could be empty or whitespace).
 */
function getBeforeLastChar(text, caretPos) {
    let preChar = text.substring(caretPos - 1, caretPos);
    return preChar;
}

/**
 * @deprecated Use {getBeforeLastChar} instead.
 * @param {String} text - The text containing the word to be returned. 
 * @param {number} caretPos - The caret position index.
 * @returns {String} The word before the caret.
 */
function returnWord(text, caretPos) {
    let preText = text.substring(0, caretPos);
    if (preText.indexOf(' ') > 0) {
        let words = preText.split(' ');
        return words[words.length - 1]; // return last word
    }
    else {
        return preText;
    }
}

/**
 * Loads a local JSON file.
 * @param filePath - The location of the file to be loaded.
 * @param {*} callback - The callback function to be called after the requested file is opened. 
 */
function loadJSON(filePath, callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType('application/json');
    xobj.open('GET', filePath, true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == 200) {
            
            // .open will NOT return a value but simply returns undefined in async mode so use a callback
            callback(xobj.responseText);

        }
    }
    xobj.send(null);

}

/**
 * Inserts the corresponding character to the combination passed to it.
 * @param {Element} obj - The element on which the character will be inserted.
 * @param {String} charCombination - The combination of characters that will be (or not) match a character.
 */
function insertMappingValue(obj, charCombination) {
    if (isElement(obj) && typeof charCombination === 'string') {
        obj.value = obj.value.substring(0, obj.value.length - 1);
        obj.value = obj.value + LETTERS_MAPPING.latin[charCombination];
    } else {
        throw 'Bad parameter(s).';
    }
                
}


/**
 * Checks if an object is an Element.
 * 
 * @param {Object} obj - The object to check.
 * @returns true if obj is an Element, false if not. 
 */
function isElement(obj) {
    return obj && obj.nodeType === 1;
}

function isEditable(obj) {
    if (isElement(obj)) {
        return EDITABLE_TAGS.includes(obj.tagName) || obj.isContentEditable;
    } else {
        throw 'The parameter passed is not an Element.';
    }
}

// EXPORTS

export {
    getCaretPosition,
    getBeforeLastChar,
    insertMappingValue,
    isEditable,
    EDITABLE_TAGS,
    LETTERS_MAPPING
};