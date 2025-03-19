/**
 * Generates a background color and text color based on an input string.
 *
 * This function takes a string as input and produces a unique HSL color
 * derived from the character codes of the string. It employs a hashing
 * algorithm to create a hash from the string, which is then used to
 * generate HSL values. The text color is determined based on the lightness
 * of the generated background color to ensure optimal contrast.
 *
 * @param {string} str - The input string from which to generate colors.
 * @returns {{ backgroundColor: string, textColor: string }} - An object containing
 *          the generated background color in HSL format and the text color
 *          (either "black" or "white").
 *
 * @example
 * const colors = generateColorFromString("Cardiology");
 * console.log(colors.backgroundColor); // e.g., "hsl(210, 70%, 50%)"
 * console.log(colors.textColor); // "black" or "white"
 */
export const generateColorFromString = (
  str: string,
): { backgroundColor: string; textColor: string } => {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = Math.abs(hash % 360);
  const saturation = 60 + (hash % 40);
  const lightness = Math.min(Math.max(45 + (hash % 20), 45), 65);

  const backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

  const textColor = lightness > 50 ? "black" : "white";

  return { backgroundColor, textColor };
};
