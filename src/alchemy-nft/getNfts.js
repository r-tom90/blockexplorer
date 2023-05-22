import { alchemy } from "../configs/alchemy.config";
//   const ownerAddr = "0xF5FFF32CF83A1A614e15F25Ce55B0c0A6b5F8F2c";
//   const vik = "vitalik.eth";

export const getNftsForOwner = async (userAddress) => {
  try {
    // Retrieving all ERC-721 tokens for a given owner
    const data = await alchemy.nft.getNftsForOwner(userAddress);
    console.log("getNftsForOwner", data);
    return data;
  } catch (error) {
    // Logging the error to the console
    console.error(error);
  }
};

export const getNftsMetadata = async (contractAddress, tokenId) => {
  try {
    const tokenData = await alchemy.nft.getNftMetadata(
      contractAddress,
      tokenId
    );
    console.log("getNftMetadata", tokenData);
    return tokenData;
  } catch (error) {
    // Logging the error to the console
    console.error(error);
  }
};
