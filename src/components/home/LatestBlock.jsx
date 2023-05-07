import { shortenAddress } from "../../utils";
import { BlockIcon } from "../../icons";
import { PageLink } from "../PageLink";

const BlocksInfo = ({ miner, number, agoTimestamp, transactions }) => {
  return (
    <div className="min-h-[100px] border-b py-5">
      <div className="flex flex-wrap items-center gap-3 md:flex-nowrap md:gap-10">
        <div className="flex w-full items-center gap-2 pl-10 md:inline-block md:w-[40%]">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-gray-100 p-3">
              <BlockIcon />
            </span>
            <div>
              <PageLink href={`/block/${number}`}>
                <h4>{number}</h4>
              </PageLink>

              <p className="text-sm text-[#6c757d]">{agoTimestamp} ago</p>
            </div>
          </div>
        </div>
        <div className="w-full pl-10 md:w-[60%] md:pl-0">
          <h4>
            Fee Recipient&nbsp;
            <PageLink href={`/account/${miner}`}>
              {shortenAddress(miner)}
            </PageLink>
          </h4>
          <p>
            <PageLink href={`/tx?block=${number}`}>
              {transactions && transactions.length}
              &nbsp;txns&nbsp;
            </PageLink>
            <span className="text-sm text-[#6c757d]">in 12 secs</span>
          </p>
        </div>
      </div>
    </div>
  );
};

const LatestBlock = ({ blocksInfo = [] }) => {
  return (
    <section className="overflow-hidden rounded-lg border shadow-lg dark:border-tertiaryBgDark dark:bg-transactionBgDark dark:shadow-tertiaryBgLight">
      <div className="pt-3">
        <div className="border-b">
          <div className="mb-2 px-5">
            <h2 className="font-medium">Latest Blocks</h2>
          </div>
        </div>

        <div>
          {blocksInfo.map((block) => (
            <BlocksInfo key={block.number} {...block} />
          ))}
        </div>

        <div className="bg-color to change">
          <div className="px-5">
            <div className="flex justify-center py-2">
              <button className="text-[0.95rem] uppercase">
                View all blocks
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestBlock;
