import { useState, useEffect, useContext } from "react";
import { useQuery } from "react-query";
import { ThemeContext } from "../../context/ThemeContext";

import {
  getFinalizedAndSafeBlock,
  getETHPrice,
  getMarketCap,
  getGasPrice,
  getDailyPercentageChange,
} from "../../alchemy-core";

import {
  EthereumIcon,
  GlobeIcon,
  GlobeIconDark,
  MeterIcon,
  MeterIconDark,
  ServerIcon,
  ServerIconDark,
} from "../../icons";
import { PageLink } from "../PageLink";

const Overview = () => {
  const { data: ethPrice } = useQuery("ethPrice", getETHPrice);
  const { data: marketCap } = useQuery("marketCap", getMarketCap);
  const { data: blockResponse } = useQuery(
    "blockResponse",
    getFinalizedAndSafeBlock
  );
  const { data: gasPrice } = useQuery("gasPrice", getGasPrice);

  const { theme } = useContext(ThemeContext);
  const [dailyPriceChange, setDailyPriceChange] = useState();

  useEffect(() => {
    getDailyPercentageChange()
      .then((response) => {
        setDailyPriceChange(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // console.log("blockResponse", blockResponse);
  return (
    <section>
      <div className="m-auto w-full px-5 pt-10">
        <div className="mx-1 rounded-lg border shadow-lg dark:border-tertiaryBgDark dark:bg-transactionBgDark dark:shadow-tertiaryBgLight/20">
          <div className="px-5 py-3">
            <div className="grid sm:grid-cols-12 ">
              <div className="col-span-6 border-r-0 px-3 dark:border-tertiaryBgDark sm:border-r">
                <div className="flex items-center gap-3 border-b py-3 dark:border-tertiaryBgDark">
                  <EthereumIcon />
                  <div className="ml-1">
                    <h3 className="text-xs dark:text-transactionGray">
                      ETHER PRICE
                    </h3>
                    <p>
                      $ {parseFloat(ethPrice).toLocaleString()}{" "}
                      <span
                        className={`${
                          dailyPriceChange > 0
                            ? "text-green-500"
                            : "text-red-500"
                        }
                        text-sm`}
                      >
                        ({parseFloat(dailyPriceChange).toFixed(2)}%)
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 py-3">
                  {theme === "light" ? <GlobeIconDark /> : <GlobeIcon />}
                  <div className="ml-1">
                    <h3 className="text-xs dark:text-transactionGray">
                      MARKET CAP
                    </h3>
                    <p>$ {parseFloat(marketCap).toLocaleString()}</p>
                  </div>
                </div>
              </div>
              <div className="col-span-6 px-3">
                <div className="flex items-center gap-3 border-b border-t py-3 dark:border-tertiaryBgDark sm:border-t-0">
                  {theme === "light" ? <ServerIconDark /> : <ServerIcon />}
                  <div className="flex w-full justify-between">
                    <div className="ml-1">
                      <h3 className="text-xs dark:text-transactionGray">
                        TRANSACTIONS
                      </h3>
                      <p>WIP</p>
                    </div>
                    <div className="text-right">
                      <h3 className="text-xs dark:text-transactionGray">
                        MED GAS PRICE
                      </h3>
                      <p>
                        <PageLink href={`/block/${gasPrice}`}>
                          {gasPrice} Gwei
                        </PageLink>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 py-3">
                  {theme === "light" ? <MeterIconDark /> : <MeterIcon />}
                  <div className="flex w-full justify-between">
                    <div className="ml-1">
                      <h3 className="text-xs dark:text-transactionGray">
                        LAST FINALIZED BLOCK
                      </h3>
                      <p>
                        <PageLink
                          href={`/block/${blockResponse?.finalized?.blockNumber}`}
                        >
                          {blockResponse?.finalized?.blockNumber}
                        </PageLink>
                      </p>
                    </div>
                    <div className="text-right">
                      <h3 className="text-xs dark:text-transactionGray">
                        LAST SAFE BLOCK
                      </h3>
                      <p>
                        <PageLink
                          href={`/block/${blockResponse?.safe?.blockNumber}`}
                        >
                          {blockResponse?.safe?.blockNumber}
                        </PageLink>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
