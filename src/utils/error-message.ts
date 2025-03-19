/**
 * Ensures an error is always returned as a string.
 * @param error - The error to process.
 * @returns A string representation of the error.
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message; // Extract message from Error object
  }
  return String(error); // Convert any other type to a string
};
