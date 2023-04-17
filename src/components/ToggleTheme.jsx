import { useEffect, useState } from "react";
import { BsSun, BsMoon } from "react-icons/bs";

const ToggleTheme = () => {
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

  const handleThemeSwitch = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <>
      {theme === "light" ? (
        <button
          className="group cursor-pointer rounded-lg border border-secondaryBgDark bg-primaryBgDark p-2.5"
          onClick={handleThemeSwitch}
        >
          <BsSun className="h-auto w-4 fill-active duration-1000" />
        </button>
      ) : (
        <button
          className="group cursor-pointer rounded-lg border border-secondaryBgLight bg-primaryBgLight p-2.5"
          onClick={handleThemeSwitch}
        >
          <BsMoon className="h-auto w-4 fill-active duration-1000" />
        </button>
      )}
    </>
  );
};

export default ToggleTheme;
