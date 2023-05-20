import { alchemy } from "../configs/alchemy.config";

/**
 * Returns an object containing finalized and safe blocks.
 * @returns {Promise<{finalized: {blockNumber: string, timestamp: string, transactions: Array}, safe: {blockNumber: string, timestamp: string, transactions: Array}}>} - Object containing finalized and safe blocks.
 */
export const getFinalizedAndSafeBlock = async () => {
  // Get finalized block
  const finalized = await alchemy.core.getBlock("finalized");
  // Get safe block
  const safe = await alchemy.core.getBlock("safe");

  // Return object with finalized and safe blocks
  return {
    finalized: {
      blockNumber: finalized.number,
      timestamp: finalized.timestamp,
      transactions: finalized.transactions,
    },
    safe: {
      blockNumber: safe.number,
      timestamp: safe.timestamp,
      transactions: safe.transactions,
    },
  };
};

console.log("FinalizedAndSafeBlock", getFinalizedAndSafeBlock());
