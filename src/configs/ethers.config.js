import { ethers } from "ethers";

// Use the mainnet
const network = "homestead";

export const provider = ethers.getDefaultProvider(network, {
  alchemy: import.meta.env.VITE_ALCHEMY_API_KEY,
});

export const signer = provider.getNetwork();

console.log(provider.getNetwork("homestead"));
