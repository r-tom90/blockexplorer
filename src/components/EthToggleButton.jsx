import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { ethPurple, ethColored } from "../assets";

const EthToggleButton = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <button className="group ml-2 cursor-pointer rounded-lg border border-secondaryBgLight bg-primaryBgLight p-2.5 px-3.5 dark:border-secondaryBgDark dark:bg-primaryBgDark">
        <img
          src={theme === "light" ? ethColored : ethPurple}
          className="block h-4 w-auto fill-activeLight duration-1000"
        />
      </button>
    </>
  );
};

export default EthToggleButton;
