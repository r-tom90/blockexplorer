import { useState, useEffect } from "react";
import { getETHPrice } from "../../alchemy-core";

export const AddressInfo = ({ balance, address, count }) => {
  const [ethPrice, setEthPrice] = useState();

  useEffect(() => {
    const fetchETHPrice = async () => {
      try {
        const response = await getETHPrice();
        setEthPrice(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchETHPrice();
  }, []);

  return (
    <div className="mx-1 my-4 w-full overflow-hidden rounded-xl border shadow-lg dark:border-tertiaryBgDark dark:bg-transactionBgDark dark:shadow-tertiaryBgLight/20 md:w-1/3">
      <section className="w-full p-5">
        <h4 className="text-base font-medium">Overview</h4>
        <div className="my-4 flex flex-col">
          <p className="text-[13px] uppercase text-transactionGray">
            Eth Balance{" "}
          </p>
          <p className="text-[15px]">{Number(balance).toFixed(18)} ETH</p>
        </div>
        <div className="my-4 flex flex-col">
          <p className="text-[13px] uppercase text-transactionGray">
            Eth Value{" "}
          </p>
          <p className="text-[15px]">
            $ {(Number(balance) * ethPrice).toFixed(2)}
          </p>
          {/* {address} */}
        </div>
        <div className="flex flex-col">
          <p className="text-[13px] uppercase text-transactionGray">
            Token Holdings{" "}
          </p>
          <p className="text-[15px]">WIP</p>
        </div>
      </section>
    </div>
  );
};

export const MoreInfo = ({ balance, address, count }) => {
  return (
    <div className="mx-1 my-4 w-full overflow-hidden rounded-xl border shadow-lg dark:border-tertiaryBgDark dark:bg-transactionBgDark dark:shadow-tertiaryBgLight/20 md:w-1/3">
      <section className="w-full p-5">
        <h4 className="text-base font-medium">More Info</h4>
        <div className="my-4 flex flex-col">
          <p className="text-[13px] uppercase text-transactionGray">
            Private name tag{" "}
          </p>
          <p className="text-[15px]">WIP</p>
        </div>
        <div className="my-4 flex flex-col">
          <p className="text-[13px] uppercase text-transactionGray">
            Last txn sent{" "}
          </p>
          <p className="text-[15px]">WIP</p>
        </div>
        <div className="flex flex-col">
          <p className="text-[13px] uppercase text-transactionGray">
            First txn sent{" "}
          </p>
          <p className="text-[15px]">WIP</p>
        </div>
      </section>
    </div>
  );
};

export const MultiChain = ({ balance, address, count }) => {
  return (
    <div className="mx-1 my-4 w-full overflow-hidden rounded-xl border shadow-lg dark:border-tertiaryBgDark dark:bg-transactionBgDark dark:shadow-tertiaryBgLight/20 md:w-1/3">
      <section className="w-full p-5">
        <h4 className="text-base font-medium">Multi Chain</h4>
        <div className="my-4 flex flex-col">
          <p className="text-[13px] uppercase text-transactionGray">
            Multichain Addresses{" "}
          </p>
          <p className="text-[15px]">{Number(balance).toFixed(18)} ETH</p>
        </div>
        <div className="my-4 flex flex-col">
          <p className="text-[13px] uppercase text-transactionGray">
            Sponsor image{" "}
          </p>
        </div>
      </section>
    </div>
  );
};
