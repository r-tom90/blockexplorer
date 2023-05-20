import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Utils } from "alchemy-sdk";
import { PageLink } from "../components/PageLink";
import {
  timeAgo,
  dateFormat,
  mediumAddress,
  shortenTransaction,
} from "../utils";
import { MdAccessTime } from "react-icons/md";
import {
  getBlockInfo,
  getTransaction,
  getTransactionReceipt,
} from "../alchemy-core";
import { CopyToClipboard } from "../components";

const TransactionInfo = ({ transaction, receipt }) => {
  const [block, setBlock] = useState();

  useEffect(() => {
    const fetchBlock = async () => {
      try {
        const response = await getBlockInfo(transaction.blockNumber);
        if (!response) throw new Error("Invalid Block");
        setBlock(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlock();
  }, []);

  return (
    <div className="mx-5">
      <div className="block-card">
        <div className="my-4 text-lg font-medium">
          Transaction Details
          <span className="text-base font-normal text-transactionGray">
            {/* {receipt?.transactionHash} */}
          </span>
        </div>
        <div className="border-[0.5px] dark:border-tertiaryBgDark" />
        <div className="my-4 overflow-hidden rounded-xl border shadow-lg dark:border-tertiaryBgDark dark:bg-transactionBgDark dark:shadow-tertiaryBgLight/20">
          <section className="w-full p-5">
            <div className="block w-full py-1 text-sm sm:px-0 md:flex ">
              <h4 className="w-1/3 text-transactionGray">Transaction Hash:</h4>
              <div className="flex w-2/3">
                <p className="mr-2 flex sm:hidden">
                  {mediumAddress(receipt?.transactionHash)}
                </p>
                <p className="mr-2 hidden sm:flex">
                  {shortenTransaction(receipt?.transactionHash)}
                </p>
                <CopyToClipboard text={receipt?.transactionHash} />
              </div>
            </div>
            <div className="block w-full py-1 text-sm sm:flex sm:px-0 ">
              <h4 className="w-1/3 text-transactionGray">Status:</h4>
              <div className="flex w-2/3">
                <div
                  className={`rounded border p-1 px-1.5 text-xs
                    ${
                      receipt?.status === 0
                        ? "border-[#a1001b] bg-[#a1001b]/10 text-[#a1001b] "
                        : receipt?.status === 1
                        ? "border-[#00a186] bg-[#00a186]/10 text-[#00a186]"
                        : ""
                    }
                  `}
                >
                  <div className="flex items-center justify-center">
                    {receipt?.status === 1 ? (
                      <div className="mr-0.5 rounded-full bg-[#00a186] px-1 text-[10px] text-stone-200 dark:text-black">
                        &#10003;
                      </div>
                    ) : (
                      <div className="mr-0.5 rounded-full bg-[#a1001b] px-1 text-[10px] text-stone-200 dark:text-black">
                        &#10007;
                      </div>
                    )}
                    {receipt?.status === 0
                      ? "Failed"
                      : receipt?.status === 1
                      ? "Success"
                      : ""}
                  </div>
                </div>
                {/* {block?.timestamp ? timeAgo(block.timestamp) : null} ({" "}
                {block?.timestamp ? dateFormat(block.timestamp) : null} ) */}
              </div>
            </div>
            <div className="block w-full py-1 text-sm sm:flex sm:px-0 ">
              <h4 className="my-auto w-1/3 text-transactionGray">Block:</h4>
              <div className="flex">
                <div className="my-auto w-[20px]">
                  {/* 65 */}
                  {receipt?.blockNumber >= 65 ? (
                    <div className="mr-1 rounded-full bg-[#00a186] px-1  text-xs text-stone-200 dark:text-black">
                      &#10003;
                    </div>
                  ) : (
                    <div className="mr-0.5 text-lg  dark:text-transactionGray">
                      &#10711;
                    </div>
                  )}
                </div>
                <PageLink
                  to={`/block/${receipt?.blockNumber}`}
                  style={{ margin: "auto 0" }}
                >
                  <p className="flex w-2/3">{receipt?.blockNumber} </p>
                </PageLink>
                <p className="my-auto ml-2 rounded border border-transactionBgDark bg-tertiaryBgLight p-1 text-center text-xs text-primaryTextLight dark:border-transactionGray dark:bg-tertiaryBgDark dark:text-primaryTextDark ">
                  {receipt?.confirmations} Block Confirmations
                </p>
              </div>
            </div>
            <div className="block w-full py-1 text-sm sm:flex sm:px-0 ">
              <h4 className="w-1/3 text-transactionGray">Timestamp:</h4>
              <div className="flex w-2/3">
                <div className="my-auto mr-1">
                  <MdAccessTime />
                </div>
                {block ? timeAgo(block?.timestamp) : null} ({" "}
                {block ? dateFormat(block.timestamp) : null} )
              </div>
            </div>
          </section>
          <div className="mx-5 border-[0.5px] dark:border-tertiaryBgDark" />
          <section className="w-full p-5">
            <div className="block w-full py-1 text-sm sm:flex sm:px-0 ">
              <h4 className="w-1/3 text-transactionGray ">Sponsored:</h4>
              <p className="w-2/3">Coming Soon</p>
            </div>
          </section>
          <div className="mx-5 border-[0.5px] dark:border-tertiaryBgDark" />
          <section className="w-full p-5">
            <div className="block w-full py-1 text-sm sm:flex sm:px-0 ">
              <h4 className="w-1/3 text-transactionGray ">From:</h4>
              <div className="flex">
                <PageLink to={`/address/${receipt?.from}`}>
                  <p className="mr-1 hidden w-2/3 sm:flex">{receipt?.from}</p>
                  <p className="mr-1 flex w-2/3 sm:hidden">
                    {mediumAddress(receipt?.from)}
                  </p>
                </PageLink>
                <CopyToClipboard text={receipt?.from} />
              </div>
            </div>
            <div className="block w-full py-1 text-sm sm:flex sm:px-0 ">
              <h4 className="w-1/3 text-transactionGray ">To:</h4>
              <div className="flex">
                <PageLink to={`/address/${receipt?.to}`}>
                  <p className="mr-1 hidden w-2/3 sm:flex">{receipt?.to}</p>
                  <p className="mr-1 flex w-2/3 sm:hidden">
                    {mediumAddress(receipt?.to)}
                  </p>
                </PageLink>
                <CopyToClipboard text={receipt?.to} />
              </div>
            </div>
          </section>
          <div className="mx-5 border-[0.5px] dark:border-tertiaryBgDark" />
          <section className="w-full p-5">
            <div className="block w-full py-1 text-sm sm:flex sm:px-0 ">
              <h4 className="w-1/3 text-transactionGray ">Value:</h4>
              <p className="w-2/3">
                {" "}
                {transaction
                  ? Utils.formatUnits(transaction.value, "ether")
                  : null}{" "}
                ETH
              </p>
            </div>
            <div className="block w-full py-1 text-sm sm:flex sm:px-0 ">
              <h4 className="w-1/3 text-transactionGray ">Transaction Fee:</h4>
              <p className="w-2/3">
                {" "}
                {receipt
                  ? Utils.formatUnits(receipt?.gasUsed._hex, "ether")
                  : null}{" "}
                ETH
              </p>
            </div>
            <div className="block w-full py-1 text-sm sm:flex sm:px-0 ">
              <h4 className="w-1/3 text-transactionGray ">Gas Price:</h4>
              <p className="w-2/3">
                {transaction
                  ? Number(
                      Utils.formatUnits(transaction?.gasPrice, "gwei")
                    ).toFixed(7)
                  : null}{" "}
                Gwei (
                {transaction
                  ? Number(
                      Utils.formatUnits(transaction?.gasPrice, "ether")
                    ).toFixed(14)
                  : null}{" "}
                ETH)
              </p>
            </div>
          </section>
          {/* <details>
            <summary>Logs [{receipt?.logs.length}]: </summary>
            <ul>
              {receipt?.logs.map((item, index) => (
                <li key={`${item?.blockNumber}`}>
                  {console.log(item)}
                  <details>
                    <summary className="break-word">
                      [{index}] {"->"} {item?.transactionHash}
                    </summary>
                    <table>
                      <tbody>
                        <tr>
                          <td>transactionIndex:</td>
                          <td>{item?.transactionIndex}</td>
                        </tr>
                        <tr>
                          <td>blockNumber:</td>
                          <td>{item?.blockNumber}</td>
                        </tr>
                        <tr>
                          <td>address:</td>
                          <td>{item?.address}</td>
                        </tr>
                        <tr>
                          <td>topics:</td>
                          <td>
                            {item?.topics.map((item) => (
                              <li key={item.data}>{item}</li>
                            ))}
                          </td>
                        </tr>
                        <tr>
                          <td>data:</td>
                          <td>
                            <div className="overflow-scroll">{item?.data}</div>
                          </td>
                        </tr>
                        <tr>
                          <td>logIndex:</td>
                          <td>{item?.logIndex}</td>
                        </tr>
                        <tr>
                          <td>blockHash:</td>
                          <td>{item?.blockHash}</td>
                        </tr>
                      </tbody>
                    </table>
                  </details>
                </li>
              ))}
            </ul>
          </details> */}
        </div>
        <div className="txs-card-Footer"></div>
      </div>
    </div>
  );
};

const Transaction = () => {
  const [receipt, setReceipt] = useState();
  const [transaction, setTransaction] = useState();
  const params = useParams();
  const navigate = useNavigate();
  let isMounted = useRef(true);

  useEffect(() => {
    async function TransactionDetails() {
      try {
        const reg = new RegExp("0x[0-9a-fA-F]{64}");
        if (!params.txhash.match(reg)) throw new Error("Invalid Transaction");

        const txReceipt = await getTransactionReceipt(params.txhash);
        const tx = await getTransaction(params.txhash);

        if (!txReceipt) throw new Error("Invalid Transaction");

        setReceipt(txReceipt);
        setTransaction(tx);
      } catch (err) {
        navigate("/404", { replace: true });
      }
    }

    if (isMounted.current) {
      TransactionDetails();
    }

    return () => {
      isMounted.current = false;
    };
  }, [params.txhash]);

  return (
    <div>
      <TransactionInfo transaction={transaction} receipt={receipt} />
    </div>
  );
};

export default Transaction;
