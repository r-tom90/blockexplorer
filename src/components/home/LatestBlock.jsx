import { useState, useEffect } from "react";
import { getLatestBlocks } from "../../alchemy-core";
import { shortenAddress } from "../../utils";
import { PageLink } from "../PageLink";
import { BlockIcon } from "../../icons";

const BlockCard = ({ item }) => {
  return (
    <div
      className="mx-3 mt-2 flex flex-row items-center border-b-[0.5px] py-3 dark:border-tertiaryBgDark"
      key={item.number}
    >
      <div className="mx-3 flex w-1/3 ">
        <div className="mx-3 my-auto">
          <BlockIcon />
        </div>
        <div className="flex flex-col ">
          <h4 className="text-sm font-medium">
            <PageLink to={`/block/${item.number}`}>{item.number}</PageLink>
          </h4>
          <p className="text-xs">{item.agoTimestamp} ago</p>
        </div>
      </div>
      <div className="flex w-2/3 justify-center">
        <div>
          <div className="flex text-sm font-medium">
            <h4 className="mr-1">Fee Recipient: </h4>
            <PageLink to={`/address/${item.miner}`}>
              {shortenAddress(item.miner)}
            </PageLink>
          </div>
          <h4 className="text-sm font-medium">
            <PageLink to={`/transaction/${item.transactions}`}>
              {item.transactions.length} txns
            </PageLink>
          </h4>
        </div>
        {/* <div className="flex items-center">
          <p className="text-xs">{item.gasUsedInEth} Eth</p>
        </div> */}
      </div>
    </div>
  );
};

const LatestBlock = () => {
  const [latestBlocks, setLatestBlocks] = useState([]);

  useEffect(() => {
    getLatestBlocks()
      .then((res) => {
        setLatestBlocks(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className="mx-2 overflow-hidden rounded-xl border shadow-md dark:border-tertiaryBgDark dark:bg-transactionBgDark dark:shadow-tertiaryBgLight">
      <h3 className="m-4 text-base font-bold">Latest Blocks</h3>
      <div className="border-[0.5px] dark:border-tertiaryBgDark" />
      {latestBlocks.map((item) => (
        <BlockCard key={item.number} item={item} />
      ))}
      <PageLink to={`/block/404`}>
        <h3 className="py-4 text-center text-sm font-medium uppercase text-transactionGray hover:text-activeDark">
          View all blocks &rarr;
        </h3>
      </PageLink>
    </section>
  );
};

export default LatestBlock;
