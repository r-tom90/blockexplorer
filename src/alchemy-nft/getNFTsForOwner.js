import { alchemy } from "../configs/alchemy.config";

export const getNFTsForOwner = async (address) => {
  const ownerAddr = "0xF5FFF32CF83A1A614e15F25Ce55B0c0A6b5F8F2c";

  try {
    // Retrieving all ERC-721 tokens for a given owner
    const data = await alchemy.nft.getNftsForOwner(address);
    console.log("getNftsForOwner", data);

    // Retrieving metadata for each ERC-721 token using Promise.all() method
    const tokenDataPromises = [];

    for (let i = 0; i < data.ownedNfts.length; i++) {
      const tokenData = alchemy.nft.getNftMetadata(
        data.ownedNfts[i].contract.address,
        data.ownedNfts[i].tokenId
      );
      console.log("getNftMetadata", tokenData);
      tokenDataPromises.push(tokenData);
    }
  } catch (error) {
    // Logging the error to the console
    console.error(error);
  }
};
