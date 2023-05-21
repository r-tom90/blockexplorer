import { alchemy } from "../configs/alchemy.config";
import { Utils } from "alchemy-sdk";
import { timeAgo } from "../utils";

/**
 * Retrieves the latest blocks from the blockchain.
 * @param {number} maxBlocks - The maximum number of blocks to retrieve.
 * @returns {Promise<Array>} - A promise that resolves to an array of the latest blocks.
 */
export const getLatestBlocks = async (maxBlocks = 6) => {
  // Get the latest block number from the Alchemy API.
  const latestBlock = await alchemy.core.getBlockNumber();

  // Create an array of promises to retrieve the latest blocks.
  const blockPromises = [];
  for (let i = 0; i < maxBlocks; i++) {
    blockPromises.push(alchemy.core.getBlock(latestBlock - i));
  }

  // Wait for all of the block promises to resolve.
  const latestBlocksRaw = await Promise.all(blockPromises);

  console.log("latestBlocksRaw", latestBlocksRaw);

  // Map the raw block data to a more structured format.
  return latestBlocksRaw.map(
    ({ miner, number, timestamp, transactions, gasUsed }) => ({
      miner,
      number,
      timestamp,
      transactions,
      gasUsed,
      gasUsedInEth: Utils.formatUnits(gasUsed._hex, "gwei"),
      agoTimestamp: timeAgo(timestamp),
    })
  );
};
