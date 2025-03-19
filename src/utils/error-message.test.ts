import { getErrorMessage } from "./error-message";

describe("getErrorMessage", () => {
  test("should return the message from an Error object", () => {
    const error = new Error("Test error message");
    expect(getErrorMessage(error)).toBe("Test error message");
  });

  test("should return string representation of a string error", () => {
    expect(getErrorMessage("String error")).toBe("String error");
  });

  test("should return string representation of a number error", () => {
    expect(getErrorMessage(404)).toBe("404");
  });

  test("should return string representation of an object error", () => {
    expect(getErrorMessage({ error: "Something went wrong" })).toBe(
      "[object Object]",
    );
  });

  test("should return string representation of null", () => {
    expect(getErrorMessage(null)).toBe("null");
  });

  test("should return string representation of undefined", () => {
    expect(getErrorMessage(undefined)).toBe("undefined");
  });

  test("should return string representation of a boolean", () => {
    expect(getErrorMessage(true)).toBe("true");
    expect(getErrorMessage(false)).toBe("false");
  });

  test("should return string representation of a symbol", () => {
    const symbolError = Symbol("symbol error");
    expect(getErrorMessage(symbolError)).toBe("Symbol(symbol error)");
  });
});
