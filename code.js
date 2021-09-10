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
  ';': '؛',
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

function getTextAreaInput(elementId) {
  return document.getElementById(elementId).value;
}

function setTextAreaContent(elementId, text) {
  document.getElementById(elementId).value = text;
}

function clearTextAreaContent(elementId) {
  setTextAreaContent(elementId, '');
}

function removeAllChildNodes(element) {
  while (element.lastChild) {
    element.removeChild(element.lastChild)
  }
}

function replaceTextInside(elementId, newText) {
  /*
    Useful for replacing the text inside a <div> or <span>.
  */
  var target = document.getElementById(elementId);
  removeAllChildNodes(target);
  var newTextNode = document.createTextNode(newText);
  target.appendChild(newTextNode);
}

function copyToClipboard(s) {
  navigator.clipboard.writeText(s)
}

function enableButton(buttonId, enabled) {
  document.getElementById(buttonId).disabled = !enabled;
}

function flipUpsideDown(s) {
  function lookup(c) {
    return NORMAL_TO_UPSIDE_DOWN[c] || c;
  }
  return s.split('').reverse().map(lookup).join('');
}

// Store the upside down characters here. Beats pulling them back out
// of the DOM to copy them to the clipboard.
var upsideDownBuf = '';

function checkUpsideDownButtons() {
  var nonEmpty =  upsideDownBuf.length > 0;
  enableButton("copy-upside-down-text", nonEmpty);
  enableButton("clear-upside-down-text", nonEmpty);
}

function upsideDownInputChanged() {
  var value = getTextAreaInput("upside-down-input");
  upsideDownBuf = flipUpsideDown(value);
  setTextAreaContent("upside-down-output", upsideDownBuf)
  checkUpsideDownButtons();
}

function copyUpsideDown() {
  copyToClipboard(upsideDownBuf);
}

function clearUpsideDown() {
  clearTextAreaContent("upside-down-input");
  clearTextAreaContent("upside-down-output");
  upsideDownBuf = '';
  checkUpsideDownButtons();
}

// Store the upside down characters here. Beats pulling them back out
// of the DOM to copy them to the clipboard.
var strikethroughBuf = '';

function strikeout(s) {
  return s.split('').map(c => `${c}\u0336`).join('');
}

function checkStrikethroughButtons() {
  var nonEmpty =  strikethroughBuf.length > 0;
  enableButton("copy-strikethrough-text", nonEmpty);
  enableButton("clear-strikethrough-text", nonEmpty);
}

function strikethroughInputChanged() {
  var value = getTextAreaInput("strikethrough-input");
  strikethroughBuf = strikeout(value);
  setTextAreaContent("strikethrough-output", strikethroughBuf);
  checkStrikethroughButtons();
}

function copyStrikethrough() {
  copyToClipboard(strikethroughBuf);
}

function clearStrikethrough() {
  clearTextAreaContent("strikethrough-input");
  clearTextAreaContent("strikethrough-output");
  strikethroughBuf = '';
  checkStrikethroughButtons();
}
