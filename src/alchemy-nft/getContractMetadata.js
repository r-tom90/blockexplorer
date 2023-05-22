import { alchemy } from "../configs/alchemy.config";

const options = { method: "GET", headers: { accept: "application/json" } };

fetch(
  "https://eth-mainnet.g.alchemy.com/nft/v3/02aj2ma-F2n87iFbWi4AMnxrLMR07Noe/getContractMetadata?contractAddress=0xe785E82358879F061BC3dcAC6f0444462D4b5330",
  options
)
  .then((response) => {
    console.log(response);
    return response.json();
  })
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
