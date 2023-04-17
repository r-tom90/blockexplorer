import { useState, useEffect } from "react";
import { Network, Alchemy } from "alchemy-sdk";
import { Link } from "react-router-dom";
import { TopBar } from "../components";
import { logoEtherscanDark, logoEtherscanLight } from "../assets";

import { SlMagnifier } from "react-icons/sl";

const settings = {
  apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const NavBar = () => {
  const [blockNumber, setBlockNumber] = useState("...");

  const getBlockNumber = async () => {
    const result = await alchemy.core.getBlockNumber();
    // console.log("getBlockNumber", result);
    setBlockNumber(result);
  };

  useEffect(() => {
    getBlockNumber();
  }, []);
  return (
    <div className="">
      <TopBar />
      <div className="border-[0.5px] border-secondaryBgLight dark:border-secondaryBgDark" />
      <div className="mx-5 block justify-between md:flex">
        <Link to="/">
          <img
            src={logoEtherscanLight}
            alt="etherscan logo"
            className="my-3 hidden h-8 dark:block"
          />
          <img
            src={logoEtherscanDark}
            alt="etherscan logo"
            className="my-3 block h-8 dark:hidden"
          />
        </Link>
        <Link
          to="/search"
          className="m-auto flex flex-col items-center rounded-md border border-tertiaryBgDark p-1 text-primaryTextLight dark:bg-secondaryBgDark dark:text-primaryTextDark"
        >
          <h4 className="text-sm">Click to Search</h4>
          <SlMagnifier className="w- h-4" />
        </Link>
        <div className="flex items-center text-center text-lg">
          <p className="font-semibold">Current Block Number:</p>
          <p className="ml-2 text-active underline">{blockNumber}</p>
        </div>
      </div>
      <div className="my-0.5 border-[0.5px] border-secondaryBgLight shadow-lg shadow-gray-100/80 dark:border-secondaryBgDark" />
    </div>
  );
};

export default NavBar;
