import { PageLink } from "./PageLink";

const Block = ({
  baseFeePerGas,
  difficulty,
  gasUsed,
  gasLimit,
  hash,
  miner,
  nonce,
  number,
  parentHash,
  transactions,
  timestamp,
}) => {
  const gasUsedPercent = ((gasUsed / gasLimit) * 100).toFixed(2);

  let gasTarget = (100 - (gasUsed / 15000000) * 100).toFixed(2);
  gasTarget = gasTarget <= 0 ? 100 : -gasTarget;
  return (
    <section className="m-auto max-w-7xl px-5">
      <div className="border-b py-5 pt-4">
        <h2 className="flex items-center gap-2">
          <span className="text-xl font-medium">Block</span>{" "}
          <span className="text-base font-normal text-gray-100">#{number}</span>
        </h2>
      </div>
      <div>
        <div className="mt-6">
          <div className="mb-4">
            <span className="rounded-md bg-[#0784c3] px-2 py-[6px] text-sm text-white">
              Overview
            </span>
          </div>
          <div className="overflow-hidden rounded-lg bg-white drop-shadow">
            <div className="grid gap-3 px-6 py-8">
              <div className="grid grid-cols-12 gap-1 md:gap-3">
                <p className="col-span-12 text-gray-100 md:col-span-2">
                  Block Height:
                </p>
                <p className="col-span-12 text-[15px] md:col-span-10">
                  {number}
                </p>
              </div>
              <div className="grid grid-cols-12 gap-1 md:gap-3">
                <p className="col-span-12 text-gray-100 md:col-span-2">
                  Status:
                </p>
                <p className="col-span-12 md:col-span-10">
                  <span className="rounded-md border border-green-700 bg-green-50 px-2 py-[2px] text-[15px] text-green-700">
                    Finalized
                  </span>
                </p>
              </div>
              <div className="grid grid-cols-12 gap-1 md:gap-3">
                <p className="col-span-12 text-gray-100 md:col-span-2">
                  Timestamp:
                </p>
                <p className="col-span-12 text-[15px] md:col-span-10">
                  {timestamp}
                </p>
              </div>
              <div className="grid grid-cols-12 gap-1 md:gap-3">
                <p className="col-span-12 text-gray-100 md:col-span-2">
                  Transactions:
                </p>
                <p className="col-span-12 text-[15px] md:col-span-10">
                  <PageLink href={`/tx?block=${number}`}>
                    {transactions?.length} transactions
                  </PageLink>
                  &nbsp;in this block
                </p>
              </div>

              <hr />
              <div className="grid grid-cols-12 gap-1 md:gap-3">
                <p className="col-span-12 text-gray-100 md:col-span-2">
                  Fee Recipient:
                </p>
                <p className="col-span-12 break-words text-[15px] md:col-span-10">
                  <PageLink href={`/account/${miner}`}>{miner}</PageLink>{" "}
                  <span className="text-sm">in 12 secs</span>
                </p>
              </div>
              <div className="grid grid-cols-12 gap-1 md:gap-3">
                <p className="col-span-12 text-gray-100 md:col-span-2">Hash:</p>
                <p className="col-span-12 break-words text-[15px] md:col-span-10">
                  {hash}
                </p>
              </div>
              <div className="grid grid-cols-12 gap-1 md:gap-3">
                <p className="col-span-12 text-gray-100 md:col-span-2">
                  Parent Hash:
                </p>
                <p className="col-span-12 break-words text-[15px] md:col-span-10">
                  <PageLink href={`/block/${parentHash}`}>
                    {parentHash}
                  </PageLink>
                </p>
              </div>
              <div className="grid grid-cols-12 gap-1 md:gap-3">
                <p className="col-span-12 text-gray-100 md:col-span-2">
                  Nonce:
                </p>
                <p className="col-span-12 text-[15px] md:col-span-10">
                  {nonce}
                </p>
              </div>
              <div className="grid grid-cols-12 gap-1 md:gap-3">
                <p className="col-span-12 text-gray-100 md:col-span-2">
                  Total Difficulty:
                </p>
                <p className="col-span-12 text-[15px] md:col-span-10">
                  {difficulty}
                </p>
              </div>

              <hr />

              <div className="grid grid-cols-12 gap-1 md:gap-3">
                <p className="col-span-12 text-gray-100 md:col-span-2">
                  Gas Used:
                </p>
                <p className="col-span-12 text-[15px] md:col-span-10">
                  {gasUsed}&nbsp;
                  <span className="text-gray-100">({gasUsedPercent})%</span>
                </p>
              </div>
              <div className="grid grid-cols-12 gap-1 md:gap-3">
                <p className="col-span-12 text-gray-100 md:col-span-2">
                  Gas Target:
                </p>
                <p className="col-span-12 text-[15px] md:col-span-10">
                  <span className="text-gray-100">{gasTarget}%</span>
                </p>
              </div>
              <div className="grid grid-cols-12 gap-1 md:gap-3">
                <p className="col-span-12 text-gray-100 md:col-span-2">
                  {" "}
                  Gas Limit:
                </p>
                <p className="col-span-12 text-[15px] md:col-span-10">
                  {gasLimit}
                </p>
              </div>

              <div className="grid grid-cols-12 gap-1 md:gap-3">
                <p className="col-span-12 text-gray-100 md:col-span-2">
                  Base Fee Per Gas:
                </p>
                <p className="col-span-12 text-[15px] md:col-span-10">
                  {baseFeePerGas}
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 text-sm text-gray-100">
          Blocks are batches of transactions linked via cryptographic hashes.
          Any tampering of a block would invalidate all following blocks as all
          subsequent hashes would change.
        </p>
      </div>
    </section>
  );
};

export default Block;
