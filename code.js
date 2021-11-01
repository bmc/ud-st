const NORMAL_TO_UPSIDE_DOWN = {
  '/': '\\',
  '\\': '/',
  '&': '⅋',
  '!': '¡',
  '"': '„',
  "'": ',',
  '(': ')',
  ')': '(',
  '[': ']',
  ']': '[',
  '{': '}',
  '}': '{',
  '<': '>',
  '>': '<',
  ',': "'",
  '-': '-',
  '_': '‾',
  '.': '˙',
  ';': '\u061b', /* escaped, because it displays weirdly in some places */
  '?': '¿',
  '‿': '⁀',
  '⁅': '⁆',
  '⁆': '⁅',
  '∴': '∵',
  '0': '0',
  '1': 'Ɩ',
  '2': '↊',
  '3': 'Ɛ',
  '4': 'ᔭ',
  '5': 'S',
  '6': '9',
  '7': 'ㄥ',
  '8': '8',
  '9': '6',
  'A': '∀',
  'B': '𐐒',
  'C': 'Ͻ',
  'D': 'ᗡ',
  'E': 'Ǝ',
  'F': 'Ⅎ',
  'G': '⅁',
  'H': 'H',
  'I': 'I',
  'J': 'ſ',
  'K': 'ʞ',
  'L': 'Ꞁ',
  'M': 'W',
  'N': 'N',
  'O': 'O',
  'P': 'Ԁ',
  'Q': 'Ὁ',
  'R': 'ᴚ',
  'S': 'S',
  'T': '⊥',
  'U': '∩',
  'V': 'Λ',
  'W': 'M',
  'X': 'X',
  'Y': '⅄',
  'Z': 'Z',
  'a': 'ɐ',
  'b': 'q',
  'c': 'ɔ',
  'd': 'p',
  'e': 'ǝ',
  'f': 'ɟ',
  'g': 'ƃ',
  'h': 'ɥ',
  'i': 'ᴉ',
  'j': 'ɾ',
  'k': 'ʞ',
  'l': 'ן',
  'm': 'ɯ',
  'n': 'u',
  'o': 'o',
  'p': 'd',
  'q': 'b',
  'r': 'ɹ',
  's': 's',
  't': 'ʇ',
  'u': 'n',
  'v': 'ʌ',
  'w': 'ʍ',
  'x': 'x',
  'y': 'ʎ',
  'z': 'z'
}

/**
 * Given the ID of an HTML <textarea> element, return the contents of the
 * text box.
 */
function getTextAreaInput(elementId) {
  return document.getElementById(elementId).value;
}

/**
 * Given the ID of an HTML <textarea> element, set the contents of the
 * text box to the specified string.
 */
 function setTextAreaContent(elementId, text) {
  document.getElementById(elementId).value = text;
}

/**
 * Remove all child nodes from an element.
 */
function removeAllChildNodes(element) {
  while (element.lastChild) {
    element.removeChild(element.lastChild)
  }
}

/**
 * Delete all child elements inside an element and add a new text element
 * with the specific text.
 */
function replaceTextInside(elementId, newText) {
  /*
    Useful for replacing the text inside a <div> or <span>.
  */
  var target = document.getElementById(elementId);
  removeAllChildNodes(target);
  var newTextNode = document.createTextNode(newText);
  target.appendChild(newTextNode);
}

/**
 * Given the ID of an HTML <textarea> element, clear the contents of the
 * text box.
 */
 function clearTextAreaContent(elementId) {
  setTextAreaContent(elementId, '');
}

/**
 * Copy the specified string to the clipboard.
 */
function copyToClipboard(s) {
  navigator.clipboard.writeText(s)
}

/**
 * Enable or disable a <button>.
 *
 * @param buttonId  the ID of the <button> element
 * @param enabled   true to enable the button, or false to disable it
 */
function enableButton(buttonId, enabled) {
  document.getElementById(buttonId).disabled = !enabled;
}

/**
 * Given a string, return the upside-down version. The mappings from regular
 * to upside-down version is the NORMAL_TO_UPSIDE_DOWN object, above. Any
 * character that does not have a mapping is stored as is.
 */
function flipUpsideDown(s) {
  return s.split('')
          .reverse()
          .map(c => NORMAL_TO_UPSIDE_DOWN[c] || c)
          .join('');
}

// Store the upside down characters here. Beats pulling them back out
// of the DOM to copy them to the clipboard.
var upsideDownBuf = '';

/**
 * Enable or disable the upside-down Copy and Clear buttons, based on
 * whether we have text in the input box or not.
 */
function checkUpsideDownButtons() {
  var nonEmpty =  upsideDownBuf.length > 0;
  enableButton("copy-upside-down-text", nonEmpty);
  enableButton("clear-upside-down-text", nonEmpty);
}

/**
 * Handle a change in the contents of the upside-down input <textarea>.
 * This function will change the output text box and update the buttons.
 */
function upsideDownInputChanged() {
  var value = getTextAreaInput("upside-down-input");
  upsideDownBuf = flipUpsideDown(value);
  setTextAreaContent("upside-down-output", upsideDownBuf)
  checkUpsideDownButtons();
}

/**
 * Invoked when the upside-down Copy button is clicked, this function
 * copies the contents of the output text box (really, the upsideDownBuf)
 * to the clipboard.
 */
function copyUpsideDown() {
  copyToClipboard(upsideDownBuf);
}

/**
 * Invoked when the upside-down Clear button is clicked, this function
 * clears the contents the input and output text boxes, clears the
 * corresponding buffer, and disables the associated Copy and Clear buttons.
 */
function clearUpsideDown() {
  clearTextAreaContent("upside-down-input");
  clearTextAreaContent("upside-down-output");
  upsideDownBuf = '';
  checkUpsideDownButtons();
}

// Store the strikethrough characters here. Beats pulling them back out
// of the DOM to copy them to the clipboard.
var strikethroughBuf = '';
var whiteSpaceChar = new RegExp("\\s");

/**
 * Given a string, return a version with each character stricken out.
 * This function relies on Unicode combining character U+0336, the
 * COMBINING LONG STROKE OVERLAY character. Placing this character after
 * a "normal" character produces the strikeout version.
 */
function strikeout(s, skipWhiteSpace) {
  return s.split('')
          .map(c => {
            if (skipWhiteSpace && whiteSpaceChar.test(c))
              return c;
            else
              return `${c}\u0336`
          })
          .join('');
}

/**
 * Enable or disable the strikethrough Copy and Clear buttons, based on
 * whether we have text in the input box or not.
 */
 function checkStrikethroughButtons() {
  var nonEmpty =  strikethroughBuf.length > 0;
  enableButton("copy-strikethrough-text", nonEmpty);
  enableButton("clear-strikethrough-text", nonEmpty);
}

function updateStrikethroughOutput() {
  let skipWhite = document.getElementById('st-skip-whitespace').checked;
  let text = getTextAreaInput('strikethrough-input');
  strikethroughBuf = strikeout(text, skipWhite);
  setTextAreaContent('strikethrough-output', strikethroughBuf);
  checkStrikethroughButtons();
  replaceTextInside("html-strikethrough", text);
}

/**
 * Handle a change in the contents of the strikethrough input <textarea>.
 * This function will change the output text box and update the buttons.
 */
function strikethroughInputChanged() {
  updateStrikethroughOutput();
}

function strikethroughCheckboxChanged() {
  updateStrikethroughOutput();
}

/**
 * Invoked when the strikethrough Copy button is clicked, this function
 * copies the contents of the output text box (really, the strikethroughBuf)
 * to the clipboard.
 */
 function copyStrikethrough() {
  copyToClipboard(strikethroughBuf);
}

/**
 * Invoked when the strikethrough Clear button is clicked, this function
 * clears the contents the input and output text boxes, clears the
 * corresponding buffer, and disables the associated Copy and Clear buttons.
 */
function clearStrikethrough() {
  clearTextAreaContent("strikethrough-input");
  clearTextAreaContent("strikethrough-output");
  strikethroughBuf = '';
  checkStrikethroughButtons();
  replaceTextInside('html-strikethrough', '');
}
