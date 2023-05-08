import { useState, useEffect } from "react";
import { getLatestTransactions } from "../../alchemy-core";
import { shortenAddress } from "../../utils";
import { PageLink } from "../PageLink";
import { PaperIcon } from "../../icons";

const TxCard = ({ item }) => {
  return (
    <div
      className="mx-3 mt-2 flex flex-row items-center border-b-[0.5px] py-3 dark:border-tertiaryBgDark"
      key={item.transactionHash}
    >
      <div className="mx-3 flex w-1/3 ">
        <div className="mx-3 my-auto">
          <PaperIcon />
        </div>
        <div className="flex flex-col" title={item.transactionHash}>
          <h4 className="text-sm font-medium">
            <PageLink to={`/tx/${item.transactionHash}`}>
              {shortenAddress(item.transactionHash)}
            </PageLink>
          </h4>
          <p className="text-xs">{item.agoTimestamp} ago</p>
        </div>
      </div>
      <div className="flex w-2/3 justify-center" title={item.from}>
        <div>
          <div className="flex text-sm font-medium">
            <h4 className="mr-1">From: </h4>
            <PageLink to={`/address/${item?.from}`}>
              {shortenAddress(item.from)}
            </PageLink>
          </div>
          <div className="flex text-sm font-medium" title={item.to}>
            <p className="mr-1">To: </p>
            <PageLink to={`/address/${item?.from}`}>
              {shortenAddress(item.to)}
            </PageLink>
          </div>
        </div>
      </div>
    </div>
  );
};

const LatestTxns = () => {
  const [latestTransactions, setLatestTransactions] = useState([]);

  useEffect(() => {
    getLatestTransactions()
      .then((res) => {
        setLatestTransactions(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className="mx-2 overflow-hidden rounded-xl border shadow-md dark:border-tertiaryBgDark dark:bg-transactionBgDark dark:shadow-tertiaryBgLight">
      <h3 className="m-4 text-base font-bold">Latest Transactions</h3>
      <div className="border-[0.5px] dark:border-tertiaryBgDark" />
      {latestTransactions.map((item) => (
        <TxCard key={item.transactionHash} item={item} />
      ))}
      <PageLink to={`/transactions/404`}>
        <h3 className="py-4 text-center text-sm font-medium uppercase text-transactionGray hover:text-activeDark">
          View all transactions &rarr;
        </h3>
      </PageLink>
    </section>
  );
};

export default LatestTxns;
