"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ConfigProvider } from "antd";
import { darkTheme, lightTheme } from "@/theme/config";

const THEME_KEY = "themeMode"; // Local storage key to store theme preference

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

// Create the theme context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * **ThemeProvider** component - Provides global theme state to the app
 *
 * This component manages the theme state (light/dark) and provides it via React context.
 * It also syncs the theme with localStorage and the system's preferred color scheme.
 *
 * @param {React.ReactNode} children - The child components to be wrapped by the provider
 * @returns {JSX.Element} - The wrapped components with theme support
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Set the initial theme based on localStorage or system preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem(THEME_KEY);
      setIsDarkMode(
        storedTheme === "dark" ||
          window.matchMedia("(prefers-color-scheme: dark)").matches,
      );
    }
  }, []);

  // Persist theme to localStorage and apply to document
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(THEME_KEY, isDarkMode ? "dark" : "light");
      document.documentElement.setAttribute(
        "data-theme",
        isDarkMode ? "dark" : "light",
      );
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ConfigProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <div
          style={{
            background: isDarkMode
              ? darkTheme.token.colorBgBase
              : lightTheme.token.colorBgBase,
            minHeight: "100vh",
            transition: "background 0.3s ease",
          }}
        >
          {children}
        </div>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

// Custom hook to access the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
