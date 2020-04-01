// Letter mapping
const codes = {
  B: 1, F: 1, P: 1, V: 1,
  C: 2, G: 2, J: 2, K: 2, Q: 2, S: 2, X: 2, Z: 2,
  D: 3, T: 3,
  L: 4,
  M: 5, N: 5,
  R: 6,
  A: 0, E: 0, I: 0, O: 0, U: 0,
};

//-------
// Soundex
//-------
module.exports = function (str) {
  // Uppercase
  const buffer = String(str).toUpperCase();

  // Init result
  let result = buffer.charAt(0);
  let previous = codes[result];

  // Map all chars
  for(let i = 1; i < buffer.length; i += 1) {
    // Init var
    const letter = buffer.charAt(i);
    const code = codes[letter];

    // Ignore non letter character and apply rule: "two letters with the same number separated by 'h' or 'w' are coded as a single number"
    if (code === undefined || letter === 'H' || letter === 'W') {
      continue;
    }

    // Append code if different than previous
    if(code && code !== previous) {
      result += code;
    }

    // Soundex key is fulfilled ?
    if (result.length === 4) {
      return result;
    }

    // Save previous for next loop
    previous = code;
  }

  // Fill with 0 if less than four chars
  return result.padEnd(4, '0');
};
