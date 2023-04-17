import { Network, Alchemy, Utils } from "alchemy-sdk";
import { useState, useEffect } from "react";
import { ToggleTheme, EthToggleButton, SearchBar } from "./index";
import { GiGasPump } from "react-icons/gi";

/* Refer to the README doc for more information about using API keys in client-side code. You should never do this in production level code. */
const settings = {
  apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

/* In this week's lessons we used ethers.js. Here we are using the Alchemy SDK is an umbrella library with several different packages. */

// ? You can read more about the packages here: https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

// Above NavBar
const TopBar = () => {
  const [gas, setGas] = useState("fetching...");

  const getGasPrice = async () => {
    // Retrieve the gas price from the Alchemy API and get the result as a hex string
    const result = (await alchemy.core.getGasPrice())._hex;

    // Convert the gas price from Wei to Gwei and round it to the nearest whole number
    let gweiAmount = Math.round(Utils.formatUnits(result, "gwei"));

    // Set the gas state to the rounded Gwei amount
    setGas(gweiAmount);
  };

  useEffect(() => {
    getGasPrice();
  }, []);

  return (
    <div className="mx-5 hidden justify-between py-3 sm:flex">
      <div className="flex h-auto w-32 items-center justify-around text-xs font-medium">
        <GiGasPump className="h-auto w-4 fill-primaryTextLight dark:fill-primaryTextDark " />
        <p>Gas:</p>
        <p className="text-active">{gas} Gwei</p>
      </div>

      <div className="flex">
        {/* <SearchBar /> */}
        <ToggleTheme />
        <EthToggleButton />
      </div>
    </div>
  );
};

export default TopBar;
