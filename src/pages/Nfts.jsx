import { useState } from "react";

import { alchemy } from "../configs/alchemy.config";

import { useAccount } from "wagmi";
import { getNftsMetadata, getNftsForOwner } from "../alchemy-nft/getNfts";

const Nfts = () => {
  // Defining state variables using useState hook
  const [userAddress, setUserAddress] = useState("");
  const [results, setResults] = useState([]);
  const [hasQueried, setHasQueried] = useState(false);
  const [tokenDataObjects, setTokenDataObjects] = useState([]);
  const [loading, setLoading] = useState(false);

  // Retrieving connected wallet address, status and connection details using useAccount hook
  const { address, status, isConnected } = useAccount();

  console.log("address", address);
  // An async function that retrieves all ERC-721 tokens for a given owner

  const ownerAddr = "0xF5FFF32CF83A1A614e15F25Ce55B0c0A6b5F8F2c";
  const vik = "vitalik.eth";

  const getNft = async () => {
    try {
      const data = await getNftsForOwner(userAddress);
      console.log("getNftsForOwner", data);

      setResults(data);

      const tokenDataPromises = [];

      for (let i = 0; i < data.ownedNfts.length; i++) {
        const tokenData = getNftsMetadata(
          data.ownedNfts[i].contract.address,
          data.ownedNfts[i].tokenId
        );
        console.log("getNftMetadata", tokenData);
        tokenDataPromises.push(tokenData);
      }

      const tokenDataObjects = await Promise.all(tokenDataPromises);

      setTokenDataObjects(tokenDataObjects);
      setHasQueried(true);
      console.log("tokenDataObjects", tokenDataObjects);
    } catch (error) {
      // Logging the error to the console
      console.error(error);
    }
  };

  // A function that updates the userAddress state variable with the input value
  const handleInputChange = ({ target }) => {
    setUserAddress(target.value);
  };

  return (
    <main>
      <section className="my-5 w-screen">
        <div className="mx-5 flex items-center justify-center">
          <h1>Check Address for NFTs</h1>
        </div>
        <div className="mx-5 flex flex-col items-center justify-center">
          <input
            value={address ? address : userAddress}
            placeholder="Enter Address"
            className="w-[450px] rounded bg-gray-700 text-center placeholder:text-center"
            onChange={handleInputChange}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                getNft();
              }
            }}
          />
        </div>
      </section>

      <section className="mx-5">
        <table className="w-full">
          <thead className="border-b-[0.5px] dark:border-tertiaryBgDark">
            <tr className="text-tertiaryText text-center text-[13px] font-semibold tracking-wide">
              <td className="p-2" key="historyTransactionFrom">
                Image
              </td>
              <td className="p-2 " key="transactionHash">
                Collection
              </td>
              <td className="p-2" key="historyBlockNumber">
                Name
              </td>
            </tr>
          </thead>
          <tbody className="text-center text-[15px]">
            {hasQueried ? (
              <>
                {results.ownedNfts.map((item, i) => {
                  return (
                    <tr
                      className="border-b-[0.5px] dark:border-tertiaryBgDark"
                      key={`${item.uniqueId}-1`}
                    >
                      <td
                        className="flex items-center justify-center p-2"
                        key={`${item.uniqueId}-2`}
                        title={item.from}
                      >
                        <img
                          src={
                            tokenDataObjects[i]?.rawMetadata?.image ??
                            "https://via.placeholder.com/200"
                          }
                          alt={"Image"}
                          className="w-10"
                        />
                      </td>
                      <td key={`${item.uniqueId}-3`} title={item.hash}>
                        {tokenDataObjects[i].contract.name?.length === 0
                          ? "No Name"
                          : tokenDataObjects[i].contract.name}
                      </td>
                      <td key={`${item.uniqueId}-4`}>
                        {tokenDataObjects[i].title?.length === 0
                          ? "No Name"
                          : tokenDataObjects[i].title}
                      </td>
                    </tr>
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default Nfts;
