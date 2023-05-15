import { useState, useEffect } from "react";
import { alchemy } from "../configs/alchemy.config";
import { timeAgo, dateFormat, shortenAddress } from "../utils";
import { useNavigate, useParams } from "react-router-dom";
import { PageLink } from "../components/PageLink";
import { MdAccessTime } from "react-icons/md";
import { Utils } from "alchemy-sdk";
import { getBlockInfo } from "../alchemy-core";

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
            <h4 className="w-1/3 text-transactionGray">Status:</h4>
            <div className="flex w-2/3">
              {/* <div
                  className={`rounded border p-1 px-1.5 text-xs
                    ${
                      block?.status === 0
                        ? "border-[#a1001b] bg-[#a1001b]/10 text-[#a1001b] "
                        : block?.status === 1
                        ? "border-[#00a186] bg-[#00a186]/10 text-[#00a186]"
                        : ""
                    }
                  `}
                >
                  <div className="flex items-center justify-center">
                    {block?.status === 1 ? (
                      <div className="mr-0.5 rounded-full bg-[#00a186] px-1 text-[10px] text-stone-200 dark:text-black">
                        &#10003;
                      </div>
                    ) : (
                      <div className="mr-0.5 rounded-full bg-[#a1001b] px-1 text-[10px] text-stone-200 dark:text-black">
                        &#10007;
                      </div>
                    )}
                    {block?.status === 0
                      ? "Failed"
                      : block?.status === 1
                      ? "Success"
                      : ""}
                  </div>
                </div> */}
              WIP
            </div>
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
            <h4 className="w-1/3 text-transactionGray">Proposed On:</h4>
            <div className="flex w-2/3">
              Block proposed on slot{" "}
              <PageLink to={`/address/${block?.transactions}`}>
                <p className="">{block?.transactions.length} </p>
              </PageLink>
              , epoch {block?.epoch}
            </div>
          </div>
          <div className="block w-full py-1 text-base sm:flex sm:px-0 ">
            <h4 className="w-1/3 text-transactionGray">Transactions:</h4>
            <PageLink to={`/address/${block?.transactions}`}>
              <p className="flex w-2/3">
                {block?.transactions.length}{" "}
                <span className="ml-1">transactions</span>
              </p>
            </PageLink>
          </div>
          <div className="block w-full py-1 text-base sm:flex sm:px-0 ">
            <h4 className="w-1/3 text-transactionGray">Withdrawals:</h4>
            {/* <PageLink to={`/address/${block?.miner}`}>
              <p className="w-2/3">
                {block ? Utils.formatUnits(block?.nonce, "gwei") : null}{" "}
                withdrawals in this block
              </p>
            </PageLink> */}
            WIP{" "}
          </div>
          {/* <div className="block w-full py-1 text-base sm:flex sm:px-0 ">
            <h4 className="w-1/3 text-transactionGray">Nonce:</h4>
            <p className="w-2/3">{block?.nonce}</p>
          </div> */}
        </section>
        <div className="mx-5 border-[0.5px] dark:border-tertiaryBgDark" />
        <section className="w-full p-5">
          <div className="block w-full py-1 text-base sm:flex sm:px-0 ">
            <h4 className="w-1/3 text-transactionGray">Fee Recipient:</h4>
            <PageLink to={`/address/${block?.miner}`}>
              <p className="w-2/3">{block?.miner}</p>
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
            <p className="w-2/3">
              {/* {block?.nonce} bytes */}
              WIP
            </p>
          </div>
        </section>
        <div className="mx-5 border-[0.5px] dark:border-tertiaryBgDark" />
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
                <PageLink className="list-links break-word" to={`/tx/${item}`}>
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

  // useEffect(() => {
  //   async function getBlock() {
  //     try {
  //       const data = await alchemy.core.getBlock(parseInt(params.blocknumber));
  //       console.log("Block data", data);
  //       if (!data) throw new Error("Invalid Block");

  //       setBlock(data);
  //       console.log(data);
  //     } catch (err) {
  //       navigate("/404", { replace: true });
  //     }
  //   }
  //   getBlock();
  // }, [params.blocknumber]);

  useEffect(() => {
    const fetchBlock = async () => {
      try {
        const response = await getBlockInfo(parseInt(params.blocknumber));
        if (!response) throw new Error("Invalid Block");
        setBlock(response);
      } catch (error) {
        console.log(error);
        navigate("/404", { replace: true });
      }
    };
    fetchBlock();
  }, [params.blocknumber]);

  console.log("block info", block);

  return (
    <>
      <BlockInfo block={block} status={status} />
    </>
  );
};

export default Block;
