const fs = require('fs');
const path = require('path');

// Load common passwords
const commonPasswords = new Set(
  fs.readFileSync(path.join(__dirname, '..', 'data', '10-million-password-list-top-1000.txt'), 'utf-8')
    .split('\n')
    .map(p => p.trim())
);

// Function 1: Full OWASP + common check
function isPasswordValid(password) {
  const minLength = 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSymbol = /[\W_]/.test(password);
  const isCommon = commonPasswords.has(password);

  return (
    password.length >= minLength &&
    hasUpper &&
    hasLower &&
    hasDigit &&
    hasSymbol &&
    !isCommon
  ); 
}

// Function 2: Just check if password is in the list
function isCommonPassword(password) {
  return commonPasswords.has(password);
}

module.exports = {
  isPasswordValid,
  isCommonPassword
};
