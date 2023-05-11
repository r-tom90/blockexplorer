import { useState, useEffect } from "react";
import { alchemy } from "../configs/alchemy.config";
import { timeAgo, dateFormat, shortenAddress } from "../utils";
import { useNavigate, useParams } from "react-router-dom";
import { PageLink } from "../components/PageLink";
import { MdAccessTime } from "react-icons/md";
import { Utils } from "alchemy-sdk";

function BlockInfo({ block }) {
  return (
    <div className="mx-5">
      <div className="my-4 text-lg font-medium">
        Block{" "}
        <span className="text-base font-normal text-transactionGray">
          #{block?.number}
        </span>
      </div>
      <div className="border-[0.5px] dark:border-tertiaryBgDark" />
      <div className="my-4 overflow-hidden rounded-xl border shadow-lg dark:border-tertiaryBgDark dark:bg-transactionBgDark dark:shadow-tertiaryBgLight/20">
        <section className="w-full p-5">
          <div className="block w-full py-1 text-base sm:flex sm:px-0 ">
            <h4 className="w-1/3 text-transactionGray ">Block Height:</h4>
            <p className="w-2/3">{block?.number}</p>
          </div>
          <div className="block w-full py-1 text-base sm:flex sm:px-0 ">
            <h4 className="w-1/3 text-transactionGray">Timestamp:</h4>
            <div className="flex w-2/3">
              <div className="my-auto mr-1">
                <MdAccessTime />
              </div>
              {block?.timestamp ? timeAgo(block.timestamp) : null} ({" "}
              {block?.timestamp ? dateFormat(block.timestamp) : null} )
            </div>
          </div>
          <div className="block w-full py-1 text-base sm:flex sm:px-0 ">
            <h4 className="w-1/3 text-transactionGray">Transactions:</h4>
            <PageLink to={`/address/${block?.miner}`}>
              <p className="flex w-2/3">
                {block?.transactions.length}{" "}
                <span className="ml-1">transactions</span>
              </p>
            </PageLink>
          </div>
          <div className="block w-full py-1 text-base sm:flex sm:px-0 ">
            <h4 className="w-1/3 text-transactionGray">Nonce:</h4>
            <p className="w-2/3">{block?.nonce}</p>
          </div>
        </section>
        <div className="border-[0.5px] dark:border-tertiaryBgDark" />
        <section className="w-full p-5">
          <div className="block w-full py-1 text-base sm:flex sm:px-0 ">
            <h4 className="w-1/3 text-transactionGray">Fee Recipient:</h4>
            <PageLink to={`/address/${block?.miner}`}>
              <p className="w-2/3">{shortenAddress(block?.miner)}</p>
            </PageLink>
          </div>
          <div className="block w-full py-1 text-base sm:flex sm:px-0 ">
            <h4 className="w-1/3 text-transactionGray">Block Reward</h4>
            <p className="w-2/3">WIP</p>
          </div>
          <div className="block w-full py-1 text-base sm:flex sm:px-0 ">
            <h4 className="w-1/3 text-transactionGray">Total Difficulty:</h4>
            <p className="w-2/3">{block?.difficulty}</p>
          </div>
          <div className="block w-full py-1 text-base sm:flex sm:px-0 ">
            <h4 className="w-1/3 text-transactionGray">Size:</h4>
            <p className="w-2/3">{block?.nonce} bytes</p>
          </div>
        </section>
        <div className="border-[0.5px] dark:border-tertiaryBgDark" />
        <section className="w-full p-5">
          <div className="block w-full py-1 text-base sm:flex sm:px-0 ">
            <h4 className="w-1/3 text-transactionGray">Gas Used:</h4>
            <p className="w-2/3">
              {block
                ? Number(
                    Utils.formatUnits(block?.gasUsed._hex, "wei")
                  ).toLocaleString()
                : null}{" "}
              (
              {block
                ? Number(
                    (Utils.formatUnits(block?.gasUsed._hex, "wei") /
                      Utils.formatUnits(block?.gasLimit._hex, "wei")) *
                      100
                  ).toFixed(2)
                : null}
              %)
            </p>
          </div>
          <div className="block w-full py-1 text-base sm:flex sm:px-0 ">
            <h4 className="w-1/3 text-transactionGray">Gas Limit:</h4>
            <p className="w-2/3">
              {block
                ? Number(
                    Utils.formatUnits(block?.gasLimit._hex, "wei")
                  ).toLocaleString()
                : null}
            </p>
          </div>
          <div className="block w-full py-1 text-base sm:flex sm:px-0 ">
            <h4 className="w-1/3 text-transactionGray">Base Fee Per Gas:</h4>
            <p className="w-2/3">
              {block
                ? Number(Utils.formatEther(block?.baseFeePerGas._hex)).toFixed(
                    11
                  )
                : null}{" "}
              ETH {""}
              <span className="text-transactionGray">
                (
                {block
                  ? Number(
                      Utils.formatUnits(block?.baseFeePerGas._hex, "gwei")
                    ).toFixed(2)
                  : null}{" "}
                Gwei)
              </span>
            </p>
          </div>

          <div className="block w-full py-1 text-base sm:flex sm:px-0 ">
            <h4 className="w-1/3 text-transactionGray">Burnt Fees:</h4>
            <p className="w-2/3">WIP</p>
          </div>
          <div className="block w-full py-1 text-base sm:flex sm:px-0 ">
            <h4 className="w-1/3 text-transactionGray">Extra Data:</h4>
            <p className="w-2/3">WIP</p>
          </div>
        </section>
        {/* <details>
            <summary>Transactions [{block?.transactions.length}]: </summary>
            <ul>
              {block?.transactions.map((item, index) => (
                <li key={item}>
                  <div>[{index}] </div>
                  <PageLink
                    className="list-links break-word"
                    to={`/tx/${item}`}
                  >
                    {item}
                  </PageLink>
                </li>
              ))}
            </ul>
          </details> */}
      </div>
    </div>
  );
}

const Block = () => {
  const [block, setBlock] = useState();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getBlock() {
      try {
        const data = await alchemy.core.getBlock(parseInt(params.blocknumber));
        console.log("Block data", data);
        if (!data) throw new Error("Invalid Block");

        setBlock(data);
        console.log(data);
      } catch (err) {
        navigate("/404", { replace: true });
      }
    }
    getBlock();
  }, [params.blocknumber]);

  return (
    <>
      <BlockInfo block={block} />
    </>
  );
};

export default Block;
