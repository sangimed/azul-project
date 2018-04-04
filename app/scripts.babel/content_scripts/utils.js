'use strict';

// ----- utils.js -----

// CONSTANTS

/**
 * Defines the tags on which the extension will be triggered.
 */
const EDITABLE_TAGS = ['INPUT', 'TEXTAREA'];

const LETTERS_MAPPING = require('../../data/letters_mapping.json');

// FUNCTIONS

/**
 * Gets the caret position of a given DOM element. The element could be an 
 * input, a textarea or any element with contenteditable attribut set to true.
 * @param {Element} ctrl - The DOM element on which the caret position is seeked. 
 */
function getCaretPosition(ctrl) {
    if (isEditable(ctrl)) {
        let caretPos = 0;
        if (document.selection) {
            ctrl.focus();
            let sel = document.selection.createRange();
            sel.moveStart('character', -ctrl.value.length);
            caretPos = sel.text.length;
        }
        // Firefox support (in case of porting)
        else if (ctrl.selectionStart || ctrl.selectionStart == '0') {
            caretPos = ctrl.selectionStart;
        }

        return (caretPos);
    } else if (ctrl.isContentEditable) { // In case it's a div with contenteditable set to true
        if (window.getSelection && window.getSelection().getRangeAt) {
            var range = window.getSelection().getRangeAt(0);
            var rangeCount = 0;
            return range.startOffset + rangeCount;
          }
          return -1;
    }
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
 * Inserts the corresponding character to the combination passed to it.
 * @param {Element} obj - The element on which the character will be inserted.
 * @param {String} charCombination - The combination of characters that will be (or not) match a character.
 */
function insertMappingValue(obj, charCombination) {
    if (isElement(obj) && typeof charCombination === 'string') {
        if (isEditable(obj)) {
            obj.value = obj.value.substring(0, obj.value.length - 1);
            obj.value = obj.value + LETTERS_MAPPING.latin[charCombination];
        } else if (obj.isContentEditable) {
            let deepestElement = findDeepest(obj);

            deepestElement.innerText = deepestElement.innerText.substring(
                0, deepestElement.innerText.length - 1);
                
            deepestElement.innerText = deepestElement.innerText + LETTERS_MAPPING.latin[charCombination];
            setEndOfContenteditable(obj);
        }
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

/**
 * Checks if an element is an input or a textarea.
 * @param {Element} elem - The element to check.
 */
function isEditable(elem) {
    return EDITABLE_TAGS.includes(elem.tagName);
}

/**
 * Sets the caret position to the end of a contenteditable element. 
 * From https://stackoverflow.com/a/3866442/2300596.
 * @param {Element} contentEditableElement - an element with the contenteditable global attribute set to true.  
 */
function setEndOfContenteditable(contentEditableElement) {
    
    var range,selection;
    if(document.createRange) { // Firefox, Chrome, Opera, Safari, IE 9+
        
        // Create a range (a range is a like the selection but invisible).
        range = document.createRange();
        
        // Select the entire contents of the element with the range.
        range.selectNodeContents(contentEditableElement);
        
        // collapse the range to the end point. false means collapse 
        // to end rather than the start.
        range.collapse(false);

        // get the selection object (allows you to change selection).
        selection = window.getSelection();
        
        // remove any selections already made.
        selection.removeAllRanges();
        
        // make the range you have just created the visible selection.
        selection.addRange(range);
    }
    else if(document.selection) { // IE 8 and lower. 
        // Create a range (a range is a like the selection but invisible).
        range = document.body.createTextRange();
        
        // Select the entire contents of the element with the range.
        range.moveToElementText(contentEditableElement);
        
        // collapse the range to the end point. false means collapse 
        // to end rather than the start.
        range.collapse(false);
        
        // Select the range (make it the visible selection.
        range.select();
    }
}

/**
 * Finds the deepest element inside a gvent element.
 * @param {Element} elem - The element on which the algorithm will be applied.
 */
function findDeepest(elem) {
    var result = {maxDepth: 0, deepestElem: null}
    descend(elem, 0, result);
    if (result.maxDepth > 0)
        console.log(result.deepestElem.tagName + '.' + result.maxDepth + '.' + result.deepestElem.innerText);
}

/**
 * 
 * @param {Element} elem - 
 * @param {Number} depth - 
 * @param {Object} result - 
 */
function descend(elem, depth, result) {    
    if (depth > result.maxDepth) {
    result.maxDepth = depth;
    result.deepestElem = elem;
    }
    for (var i=0; i<elem.childNodes.length; i++)
        descend(elem.childNodes[i], depth + 1, result);
}

// EXPORTS

export {
    getCaretPosition,
    getBeforeLastChar,
    insertMappingValue,
    isEditable,
    findDeepest,
    EDITABLE_TAGS,
    LETTERS_MAPPING
};