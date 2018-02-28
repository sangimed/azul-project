'use strict';

/**
 * LOGIC :
 * After each letter typed by the user do
 *  IF (There is any previous char [pc] before the last one [lc]) do
 *      IF (The two last chars [2l] math a key in the mapping file) do
 *          - Replace 2l with its corresponding value
 */

const EDITABLE_TAGS = ['INPUT', 'TEXTAREA'];

document.addEventListener('keyup', (event) => {

    // Get the current DOM element.
    let currentElement = document.activeElement;

    if (EDITABLE_TAGS.includes(currentElement.tagName)) {
        let caretPos = getCaretPosition(currentElement)
        let word = returnWord(currentElement.value, caretPos);
        if (word != null) {
            console.log('WORD -> ', word);
        }
    }
});

function getCaretPosition(ctrl) {
    let CaretPos = 0;   // IE Support
    if (document.selection) {
        ctrl.focus();
        let Sel = document.selection.createRange();
        Sel.moveStart('character', -ctrl.value.length);
        CaretPos = Sel.text.length;
    }
    // Firefox support
    else if (ctrl.selectionStart || ctrl.selectionStart == '0')
    CaretPos = ctrl.selectionStart;
    return (CaretPos);
}

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