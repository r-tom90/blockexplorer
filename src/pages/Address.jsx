import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { alchemy } from "../configs/alchemy.config";
import { Utils } from "alchemy-sdk";
import { shortenAddress, shortenTransaction } from "../utils/shortenAddress";
import { AddressInfo, MoreInfo, MultiChain } from "./Address/AddressInfo";
import { CopyToClipboard } from "../components";

const Address = () => {
  const params = useParams();
  const [balance, setBalance] = useState();
  const [count, setCount] = useState();
  const [history, setHistory] = useState();
  const [historyLabel, setHistoryLabel] = useState("All");
  const [showHistory, setShowHistory] = useState();
  const [pageNumber, setPageNumber] = useState(0);

  const transactionsPerPage = 25;
  const pageVisited = pageNumber * transactionsPerPage;
  const pageCount = Math.ceil(showHistory?.length / transactionsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = ({ selected }) => {
    const newOffset = (selected * transactionsPerPage) % showHistory?.length;
    console.log(
      `User requested page number ${selected}, which is offset ${newOffset}`
    );
    setPageNumber(selected);
  };

  const navigate = useNavigate();

  useEffect(() => {
    filterAndSortHistory();
  }, [history]);

  useEffect(() => {
    async function getAddress() {
      try {
        const reg = new RegExp("0x[0-9a-fA-F]{40}");
        if (!params.address.match(reg)) throw new Error("Invalid Address");

        const data = await alchemy.core.getBalance(String(params.address));
        const count = await alchemy.core.getTransactionCount(
          String(params.address)
        );

        if (!data) throw new Error("Invalid Address");

        setBalance(Utils.formatUnits(data, "ether"));
        setCount(count);

        console.log(Utils.formatUnits(data, "ether"));
        console.log(count);
      } catch (err) {
        console.log(err);
        navigate("/404", { replace: true });
      }
    }
    getAddress();
  }, [params.address]);

  useEffect(() => {
    async function getHistory() {
      const [historyfrom, historyto] = await Promise.allSettled([
        alchemy.core.getAssetTransfers({
          fromBlock: "0x0",
          toBlock: "latest",
          fromAddress: String(params.address),
          excludeZeroValue: true,
          category: ["internal", "external", "erc20", "erc721", "erc1155"],
        }),

        alchemy.core.getAssetTransfers({
          fromBlock: "0x0",
          toBlock: "latest",
          toAddress: String(params.address),
          excludeZeroValue: true,
          category: ["internal", "external", "erc20", "erc721", "erc1155"],
        }),
      ]);

      setHistory(
        [...historyfrom.value.transfers, ...historyto.value.transfers].reverse()
      );
      console.log("historyFrom", historyfrom.value.transfers[0]);
      console.log("historyTo", historyto);
    }
    getHistory();
  }, [params.address]);

  const onTabClickE = async () => {
    setHistoryLabel("External");
    setShowHistory(
      history?.filter((item) => {
        return ["external"].includes(item.category);
      })
    );
  };

  const onTabClickI = async () => {
    setHistoryLabel("Internal");
    setShowHistory(
      history?.filter((item) => {
        return ["internal"].includes(item.category);
      })
    );
  };

  const onTabClick20 = async () => {
    setHistoryLabel("ERC20");
    setShowHistory(
      history?.filter((item) => {
        return item.category === "erc20";
      })
    );
  };

  // const onTabClick721 = async () => {
  //   setHistoryLabel("ERC721");
  //   setShowHistory(
  //     history?.filter((item) => {
  //       return item.category === "erc721";
  //     })
  //   );
  // };

  // const onTabClick1155 = async () => {
  //   setHistoryLabel("ERC1155");
  //   setShowHistory(
  //     history?.filter((item) => {
  //       return item.category === "erc1155";
  //     })
  //   );
  // };

  const filterAndSortHistory = () => {
    setHistoryLabel("All");
    setShowHistory(
      history
        ?.filter((item) => {
          return ["external", "internal"].includes(item.category);
        })
        .sort((a, b) => b.blockNumber - a.blockNumber)
    );
  };

  return (
    <div className="mx-5">
      <div className="my-4 flex text-lg font-medium">
        <h4 className="flex items-center">
          Address
          <span className="mx-1 text-base font-normal text-tertiaryBgLight">
            {params.address}
          </span>
          <CopyToClipboard text={params.address} />
        </h4>
      </div>
      <div className="border-[0.5px] dark:border-tertiaryBgDark" />
      <div className="block md:flex">
        <AddressInfo address={params.address} count={count} balance={balance} />
        <MoreInfo address={params.address} count={count} balance={balance} />
        <MultiChain address={params.address} count={count} balance={balance} />
      </div>

      <section className="flex h-auto w-[400px] pl-1 pt-3">
        <div className="flex w-full justify-between overflow-x-scroll text-[13px] text-primaryTextDark">
          <button
            className="rounded-md bg-tertiaryBgDark px-2 py-1 focus:bg-activeLight active:bg-activeDark"
            onClick={filterAndSortHistory}
          >
            Transactions
          </button>
          <button
            className="rounded-md bg-tertiaryBgDark px-2 py-1 focus:bg-activeLight active:bg-activeDark"
            onClick={onTabClickE}
          >
            External
          </button>
          <button
            className="rounded-md bg-tertiaryBgDark px-2 py-1 focus:bg-activeLight active:bg-activeDark"
            onClick={onTabClickI}
          >
            Internal
          </button>
          <button
            className="rounded-md bg-tertiaryBgDark px-2 py-1 focus:bg-activeLight active:bg-activeDark"
            onClick={onTabClick20}
          >
            Token Transfers (ERC20)
          </button>
          {/* <button
              className="rounded-md bg-tertiaryBgDark px-2 py-1 focus:bg-activeLight active:bg-activeDark"
              onClick={onTabClick721}
            >
              Erc721
            </button>
            <button
              className="rounded-md bg-tertiaryBgDark px-2 py-1 focus:bg-activeLight active:bg-activeDark"
              onClick={onTabClick1155}
            >
              Erc1155
            </button> */}
        </div>
      </section>
      <section className="mx-1 my-4 w-full overflow-hidden rounded-xl border shadow-lg dark:border-tertiaryBgDark dark:bg-transactionBgDark dark:shadow-tertiaryBgLight/20">
        <div className="flex w-full justify-between p-5">
          <p className="text-sm">
            Latest 25 from a total of {showHistory?.length} transactions
          </p>
          <div>
            <ReactPaginate
              previousLabel="|< "
              nextLabel=" >|"
              pageCount={pageCount}
              onPageChange={handlePageClick}
              pageRangeDisplayed={0}
              marginPagesDisplayed={0}
              containerClassName="paginationBtn"
              previousLinkClassName="previousBtn"
              nextLinkClassName="nextBtn"
              activeClassName="paginationActive"
            />
          </div>
        </div>
        <table className="w-full">
          <thead className="">
            <tr className="text-tertiaryText text-left text-[13px] font-semibold tracking-wide">
              <td className="p-2 pl-5" key="transactionHash">
                Transaction Hash
              </td>
              <td className="p-2" key="historyBlockNumber">
                Block
              </td>
              <td className="p-2" key="historyTransactionFrom">
                From
              </td>
              <td className="p-2" key="historyTransactionTo">
                To
              </td>
              <td className="p-2" key="historyTransactionValue">
                Value
              </td>
            </tr>
          </thead>
          <tbody className="text-center text-[15px]">
            {showHistory
              ?.slice(pageVisited, pageVisited + transactionsPerPage)
              .map((item) => {
                return (
                  <tr className="" key={`${item.uniqueId}-1`}>
                    <td
                      className="py-2 pl-5 text-left"
                      key={`${item.uniqueId}-2`}
                      title={item.hash}
                    >
                      <Link className="text-activeDark" to={`/tx/${item.hash}`}>
                        {shortenTransaction(item.hash)}
                      </Link>
                    </td>
                    <td key={`${item.uniqueId}-3`}>
                      <Link
                        className="text-activeDark"
                        to={`/block/${parseInt(item.blockNum, 16)}`}
                      >
                        {parseInt(item.blockNum)}
                      </Link>
                    </td>
                    <td key={`${item.uniqueId}-4`} title={item.from}>
                      <Link
                        className="text-activeDark"
                        to={`/address/${item.from}`}
                      >
                        {shortenAddress(item.from)}
                      </Link>
                    </td>
                    <td key={`${item.uniqueId}-5`} title={item.to}>
                      <Link
                        className="text-activeDark"
                        to={`/address/${item.to}`}
                      >
                        {shortenAddress(item.to)}
                      </Link>
                    </td>
                    <td key={`${item.uniqueId}-6`}>
                      {Number(item.value).toFixed(4)} {item.asset}
                    </td>
                  </tr>
                );
              })}
            {/* <div className="border-[0.5px] dark:border-tertiaryBgDark" /> */}
            {/* {displayTransactions} */}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Address;
