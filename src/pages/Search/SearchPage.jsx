// import { useState, useEffect } from "react";
// import { Network, Alchemy } from "alchemy-sdk";

// import SearchBar from "../../components/home";
// import BlockResults from "./BlockResults";
// import TxBlockResults from "./TxBlockResults";

// const settings = {
//   apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
//   network: Network.ETH_MAINNET,
// };

// const alchemy = new Alchemy(settings);

// const SearchPage = () => {
//   const [searchResults, setSearchResults] = useState([]);

//   const handleSearch = async (searchText) => {
//     try {
//       const block = await alchemy.core.getBlock(searchText);
//       const tx = await alchemy.core.getTransaction(searchText);
//       // console.log(block);
//       // console.log(tx);
//       if (!block && !tx) {
//         throw new Error("API call failed");
//       }
//       const data = [block]; // Wrap response object in an array
//       // console.log(data);
//       setSearchResults(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   //     let txHash =
//   //       "0x92fc42b9642023f2ee2e88094df80ce87e15d91afa812fef383e6e5cd96e2ed3";
//   // 0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b

//   return (
//     <div className="mx-5 h-screen">
//       <h4 className="my-3">The Ethereum Blockchain Explorer</h4>
//       <SearchBar onSearch={handleSearch} />

//       {/* <TxBlockResults results={searchResults} /> */}

//       <div className="my-5 w-full rounded border border-tertiaryBgLight dark:border-tertiaryBgDark">
//         <BlockResults results={searchResults} />
//       </div>
//     </div>
//   );
// };

// export default SearchPage;
