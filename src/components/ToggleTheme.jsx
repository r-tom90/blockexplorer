import { useContext } from "react";
import { BsSun, BsMoon } from "react-icons/bs";
import { ThemeContext } from "../context/ThemeContext";

const ToggleTheme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      className="group cursor-pointer rounded-lg border border-secondaryBgLight bg-primaryBgLight p-2.5 dark:border-secondaryBgDark dark:bg-primaryBgDark"
      onClick={toggleTheme}
    >
      {theme === "light" ? (
        <BsSun className="h-auto w-4 fill-activeLight duration-1000" />
      ) : (
        <BsMoon className="h-auto w-4 fill-activeLight duration-1000" />
      )}
    </button>
  );
};

export default ToggleTheme;
