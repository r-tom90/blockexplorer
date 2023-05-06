import { Utils } from "alchemy-sdk";
import { useState, useEffect } from "react";
import { ToggleTheme, EthToggleButton, SearchBar } from "./index";
import { GiGasPump } from "react-icons/gi";
import { alchemy } from "../configs/alchemy.config.js";
import { getGasPrice } from "../alchemy-core";
// import { getETHPrice } from "../alchemy-core";

// Above NavBar
const TopBar = () => {
  const [gas, setGas] = useState("fetching...");

  useEffect(() => {
    const fetchGasPrice = async () => {
      const price = await getGasPrice();
      if (price) {
        setGas(price);
      } else {
        setGas("error fetching gas price");
      }
    };
    fetchGasPrice();
  }, []);

  return (
    <div
      className="mx-5 hidden justify-between py-0.5 sm:flex"
      // style={{ position: "fixed", top: 0, left: 0, right: 0 }}
    >
      <div className="flex">
        <div className="flex h-auto w-24 items-center justify-around text-xs font-medium">
          <p>ETH Price:</p>
          <p className="text-activeLight">
            TBC
            {/* {ethPrice} */}
          </p>
        </div>
        <div className="flex h-auto w-24 items-center justify-around text-xs font-medium">
          <GiGasPump className="h-auto w-4 fill-primaryTextLight dark:fill-primaryTextDark " />
          <p>Gas:</p>
          <p className="text-activeLight">{gas} Gwei</p>
        </div>
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
