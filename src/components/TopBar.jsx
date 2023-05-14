import { useState, useEffect } from "react";
import { ToggleTheme, EthToggleButton } from "./index";
import { GiGasPump } from "react-icons/gi";
import { getGasPrice, getETHPrice } from "../alchemy-core";
import Wallets from "./Wallets";

// Above NavBar
const TopBar = () => {
  const wait = "Fetching...";
  const [ethPrice, setEthPrice] = useState(`${wait}`);
  const [gas, setGas] = useState(`${wait}`);

  useEffect(() => {
    getETHPrice()
      .then((res) => {
        setEthPrice(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });

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
      className="mx-5 flex justify-between py-0.5"
      // style={{ position: "fixed", top: 0, left: 0, right: 0 }}
    >
      <div className="hidden sm:flex">
        <div className="flex h-auto w-32 items-center justify-around text-xs font-medium">
          <p>ETH Price:</p>
          <p className="text-activeLight">
            ${parseFloat(ethPrice).toLocaleString()}
          </p>
        </div>
        <div className="flex h-auto w-28 items-center justify-around text-xs font-medium">
          <GiGasPump className="h-auto w-4 fill-primaryTextLight dark:fill-primaryTextDark " />
          <p>Gas:</p>
          <p className="text-activeLight">{gas} Gwei</p>
        </div>
      </div>

      <div className="flex">
        <ToggleTheme />
        <EthToggleButton />
        <Wallets />
      </div>
    </div>
  );
};

export default TopBar;
