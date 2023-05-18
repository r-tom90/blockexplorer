import {
  getFinalizedAndSafeBlock,
  getETHPrice,
  getMarketCap,
  getGasPrice,
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
import { useEffect, useState } from "react";

const Overview = () => {
  const wait = "Fetching...";

  const [finalizedSafeBlocks, setBlocksInfo] = useState({
    finalized: {
      blockNumber: `${wait}`,
    },
    safe: {
      blockNumber: `${wait}`,
    },
  });

  const [ethPrice, setEthPrice] = useState(`${wait}`);
  const [marketCap, setMarketCap] = useState(`${wait}`);
  const [gasPrice, setGasPrice] = useState(`${wait}`);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const priceResponse = await getETHPrice();
        const marketCapResponse = await getMarketCap();
        const blockResponse = await getFinalizedAndSafeBlock();
        const gasPriceResponse = await getGasPrice();

        setEthPrice(priceResponse);
        setMarketCap(marketCapResponse);
        setBlocksInfo(blockResponse);
        setGasPrice(gasPriceResponse);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  console.log("finalizedSafeBlocks", finalizedSafeBlocks);
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
                    <p>$ {parseFloat(ethPrice).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 py-3">
                  <div className="block dark:hidden">
                    <GlobeIcon />
                  </div>
                  <div className="hidden dark:block">
                    <GlobeIconDark />
                  </div>
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
                  <div className="block dark:hidden">
                    <ServerIcon />
                  </div>
                  <div className="hidden dark:block">
                    <ServerIconDark />
                  </div>
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
                  <div className="block dark:hidden">
                    <MeterIcon />
                  </div>
                  <div className="hidden dark:block">
                    <MeterIconDark />
                  </div>
                  <div className="flex w-full justify-between">
                    <div className="ml-1">
                      <h3 className="text-xs dark:text-transactionGray">
                        LAST FINALIZED BLOCK
                      </h3>
                      <p>
                        <PageLink
                          href={`/block/${finalizedSafeBlocks?.finalized?.blockNumber}`}
                        >
                          {finalizedSafeBlocks?.finalized?.blockNumber}
                        </PageLink>
                      </p>
                    </div>
                    <div className="text-right">
                      <h3 className="text-xs dark:text-transactionGray">
                        LAST SAFE BLOCK
                      </h3>
                      <p>
                        <PageLink
                          href={`/block/${finalizedSafeBlocks?.safe?.blockNumber}`}
                        >
                          {finalizedSafeBlocks?.safe?.blockNumber}
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
