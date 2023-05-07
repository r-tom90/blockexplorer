import { shortenAddress, shortenAddressEnd, timeAgo } from "../../utils";
import { PaperIcon } from "../../icons";
import { PageLink } from "../PageLink";

const TxnInfo = ({ to, from, transactionHash, agoTimestamp }) => {
  return (
    <div className="min-h-[100px] border-b py-5">
      <div className="flex flex-wrap items-center gap-3 md:flex-nowrap md:gap-10">
        <div className="flex w-full items-center gap-2 pl-10 md:inline-block md:w-[40%]">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-gray-100 p-3">
              <PaperIcon />
            </span>
            <div>
              <PageLink href={`/tx/${transactionHash}`}>
                <h4>{shortenAddressEnd(transactionHash)}</h4>
              </PageLink>
              <p className="text-sm text-[#6c757d]">{agoTimestamp} ago</p>
            </div>
          </div>
        </div>
        <div className="w-full pl-10 md:w-[60%] md:pl-0">
          <h4>
            From&nbsp;
            <PageLink href={`/account/${from}`}>
              {shortenAddress(from)}
            </PageLink>
          </h4>
          <h4>
            To&nbsp;
            <PageLink href={`/account/${to}`}>{shortenAddress(to)}</PageLink>
          </h4>
        </div>
      </div>
    </div>
  );
};

const LatestTxns = ({ latestTransactions = [] }) => {
  return (
    <section className="overflow-hidden rounded-lg border shadow-lg dark:border-tertiaryBgDark dark:bg-transactionBgDark dark:shadow-tertiaryBgLight">
      <div className="pt-3">
        <div className="border-b">
          <div className="mb-2 px-5">
            <h2 className="font-medium">Latest Transactions</h2>
          </div>
        </div>

        <div>
          {latestTransactions.map((transaction) => (
            <TxnInfo key={transaction.transactionHash} {...transaction} />
          ))}
        </div>

        <div className="bg-color to change">
          <div className="px-5">
            <div className="flex justify-center py-2">
              <button className="text-[0.95rem] uppercase">
                View all transactions
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestTxns;
