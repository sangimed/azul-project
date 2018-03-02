'use strict';

// ----- utils.js -----

/**
 * Gets the caret position of a given DOM element.
 * @param {Element} ctrl - The DOM element on which the caret position is searched. 
 */
function getCaretPosition(ctrl) {
    let caretPos = 0;   // IE Support
    if (document.selection) {
        ctrl.focus();
        let sel = document.selection.createRange();
        sel.moveStart('character', -ctrl.value.length);
        caretPos = sel.text.length;
    }
    // Firefox support
    else if (ctrl.selectionStart || ctrl.selectionStart == '0')
    caretPos = ctrl.selectionStart;
    return (caretPos);
}

/**
 * Gets gets the second last character relativly to the caret position.
 * Example : "Hello|" return "o", "He|llo" return H, 
 * @param {number} caretPos - The caret position index.
 * @param {String} text - The text containing the word to be returned.  
 * @param {*} caretPos - The caret position.
 * @returns {String} The second last character (could be empty or whitespace).
 */
function getBeforeLastChar(text, caretPos) {
    let index = text.indexOf(caretPos);
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
    let index = text.indexOf(caretPos);
    let preText = text.substring(0, caretPos);
    if (preText.indexOf(' ') > 0) {
        let words = preText.split(' ');
        return words[words.length - 1]; //return last word
    }
    else {
        return preText;
    }
}

const EDITABLE_TAGS = ['INPUT', 'TEXTAREA'];

export {
    getCaretPosition,
    getBeforeLastChar,
    EDITABLE_TAGS
};