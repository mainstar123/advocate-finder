/* eslint-disable no-console */

/**
 * Logger Utility - Provides color-coded console logging for different message types.
 *
 * Features:
 * - Success: Green text
 * - Error: Red text
 * - Info: Blue text
 * - Warning: Yellow text
 *
 * Usage:
 * ```ts
 * Logger.success("Operation completed!");
 * Logger.error("An error occurred!");
 * Logger.info("Fetching data...");
 * Logger.warning("Deprecated function used.");
 * ```
 */

class Logger {
  /**
   * Logs a success message in green color.
   * @param message - The message to log.
   */
  static success(message: string): void {
    console.log("\x1b[32m%s\x1b[0m", `${message}`);
  }

  /**
   * Logs an error message in red color.
   * @param message - The message to log.
   */
  static error(error: unknown): void {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.log("\x1b[31m%s\x1b[0m", `${errorMessage}`);
  }

  /**
   * Logs an informational message in blue color.
   * @param message - The message to log.
   */
  static info(message: string): void {
    console.log("\x1b[34m%s\x1b[0m", `${message}`);
  }

  /**
   * Logs a warning message in yellow color.
   * @param message - The message to log.
   */
  static warning(message: string): void {
    console.log("\x1b[33m%s\x1b[0m", `${message}`);
  }
}

export default Logger;
