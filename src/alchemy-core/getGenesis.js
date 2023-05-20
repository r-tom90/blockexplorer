import { alchemy } from "../configs/alchemy.config";

export const getGenesis = async (latestBlockNumber = 1) => {
  try {
    let transactionCount = 0;
    // Loop through each block from 0 to the latest block number
    for (let blockNumber = 0; blockNumber <= latestBlockNumber; blockNumber++) {
      // Get the block at the current block number
      const block = await alchemy.core.getBlock(blockNumber);

      // Get the transaction count of the block
      transactionCount += block.transactions.length;

      console.log(
        `Block ${blockNumber}: ${block.transactions.length} transactions`
      );
    }
    return transactionCount;
  } catch (error) {
    console.error(error);
    // handle error here
  }
  console.log("transactionCount", transactionCount);
};
