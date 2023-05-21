import { useState, useEffect } from "react";
import { ToggleTheme, EthToggleButton } from "./index";
import { GiGasPump } from "react-icons/gi";
import {
  getGasPrice,
  getETHPrice,
  getDailyPercentageChange,
} from "../alchemy-core";
import Wallets from "./Wallets";

const TopBar = () => {
  const wait = "...";
  const [ethPrice, setEthPrice] = useState(`${wait}`);
  const [dailyChange, setDailyChange] = useState(`${wait}`);
  const [gasPrice, setGasPrice] = useState(`${wait}`);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ethPrice = await getETHPrice();
        const dailyChange = await getDailyPercentageChange();
        const gasPrice = await getGasPrice();

        setEthPrice(ethPrice);
        setDailyChange(dailyChange);
        setGasPrice(gasPrice);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mx-5 flex justify-between py-0.5">
      <div className="hidden sm:flex">
        <div className="flex h-auto w-40 items-center justify-around text-xs font-medium">
          <p>ETH Price:</p>
          <p className="text-activeLight">
            ${parseFloat(ethPrice).toLocaleString()}{" "}
            <span
              className={`${dailyChange > 0 ? "text-green-500" : "text-red-500"}
                        text-xs`}
            >
              ({parseFloat(dailyChange).toFixed(2)}%)
            </span>
          </p>
        </div>
        <div className="flex h-auto w-28 items-center justify-around text-xs font-medium">
          <GiGasPump className="h-auto w-4 fill-primaryTextLight dark:fill-primaryTextDark " />
          <p>Gas:</p>
          <p className="text-activeLight">{gasPrice} Gwei</p>
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
