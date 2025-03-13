import { generateColorFromString } from "./color";

describe("generateColorFromString", () => {
  it("should generate a valid HSL background color and appropriate text color", () => {
    const result = generateColorFromString("Cardiology");

    // Check the format of the background color
    expect(result.backgroundColor).toMatch(
      /^hsl\(\d{1,3}, \d{1,3}%, \d{1,3}%\)$/,
    );
    // Check if the text color is either "black" or "white"
    expect(["black", "white"]).toContain(result.textColor);
  });

  it("should generate different colors for different input strings", () => {
    const result1 = generateColorFromString("Cardiology");
    const result2 = generateColorFromString("Neurology");

    // Ensure that the colors are not the same for different strings
    expect(result1.backgroundColor).not.toEqual(result2.backgroundColor);
  });

  it("should return black text color for light backgrounds", () => {
    const result = generateColorFromString("LightBackground");

    // Check if the lightness is greater than 50%
    const match = result.backgroundColor.match(/(\d{1,3})%/);
    expect(match).not.toBeNull(); // Ensure match is not null

    const lightness = parseInt(match![1], 10); // Use non-null assertion
    if (lightness > 50) {
      expect(result.textColor).toBe("black");
    }
  });

  it("should return white text color for dark backgrounds", () => {
    const result = generateColorFromString("DarkBackground");

    // Check if the lightness is less than or equal to 50%
    const match = result.backgroundColor.match(/(\d{1,3})%/);
    expect(match).not.toBeNull(); // Ensure match is not null

    const lightness = parseInt(match![1], 10); // Use non-null assertion
    if (lightness <= 50) {
      expect(result.textColor).toBe("white");
    }
  });
});
