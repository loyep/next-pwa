/**
 * Capitalize the first letter of every sentence of a string. This is meant for
 * strings that don't have special characters.
 *
 * @param text - The original string.
 * @returns
 */
export const capitalizeFirstLetters = (text: string) => {
  try {
    return text.replace(/(?<=(?:^|[.?!])\W*)[a-z]/g, (i) => i.toUpperCase());
  } catch {
    // Safari doesn't support the above RegExp.
    let returnVal = "";
    for (let i = 0; i < text.length; i++) {
      const curCharUpper = text[i].toUpperCase();
      if (
        text[i] !== curCharUpper &&
        (i === 0 || (i >= 2 && returnVal.substring(i - 2, i).match(/[.?!] /)))
      ) {
        returnVal += curCharUpper;
        continue;
      }
      returnVal += text[i];
    }
    return returnVal;
  }
};
