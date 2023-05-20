import { createContext, useState, useEffect } from "react";

// Create a context for the theme
export const ThemeContext = createContext();

// Create a provider for the theme context
export const ThemeProvider = ({ children }) => {
  // Load theme from local storage if it exists
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  // Toggle to be set up dependant on users browser setting on start
  // Whenever theme is changed, update local storage to save the new value
  useEffect(() => {
    if (!theme) {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    } else {
      if (theme === "light") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
