import { ethPurple, ethColored, ethRainbow } from "../assets";

const EthToggleButton = () => {
  return (
    <>
      <button
        className="group ml-2 cursor-pointer rounded-lg border border-secondaryBgLight bg-primaryBgLight p-2.5 px-3.5 dark:border-secondaryBgDark dark:bg-primaryBgDark"
        // onClick={handleThemeSwitch}
      >
        <img
          src={ethPurple}
          className="block h-4 w-auto fill-activeLight duration-1000 dark:hidden"
        />
        <img
          src={ethColored}
          className="hidden h-4 w-auto fill-activeLight duration-1000 dark:block"
        />
      </button>
    </>
  );
};

export default EthToggleButton;
