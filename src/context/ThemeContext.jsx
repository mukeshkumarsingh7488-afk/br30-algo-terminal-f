import { createContext, useEffect, useMemo, useState } from "react";
import { THEME_STORAGE_KEY } from "../config/theme";

const ThemeContext = createContext(null);

const getInitialTheme = () => {
  // Temporarily disabled: saved theme from localStorage
  // const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  // if (savedTheme === "dark" || savedTheme === "light") {
  //   return savedTheme;
  // }

  // Temporarily disabled: system dark mode detection
  // const prefersDark =
  //   window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;

  // return prefersDark ? "dark" : "light";

  // Default theme
  return "light";
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.className = `br30-${theme}`;
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === "dark",
      toggleTheme,
      setTheme,
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export default ThemeContext;
