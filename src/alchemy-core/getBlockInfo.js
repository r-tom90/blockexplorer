import { alchemy } from "../configs/alchemy.config";

/**
 * Fetches block information using Alchemy's core library.
 *
 * @param {string|number} query - The block hash or block number to fetch.
 * @return {Promise<Object>} Returns an object with block information, including the additional properties:
 *      - baseFeePerGas: The base fee per gas, if available. Otherwise, returns 0.
 *      - gasLimit: The gas limit, if available. Otherwise, returns 0.
 *      - gasUsed: The gas used, if available. Otherwise, returns 0.
 *      - difficulty: The difficulty, if available. Otherwise, returns 0.
 */

export const getBlockInfo = async (query) => {
  let blockHashOrBlockTag = query;

  // If the query does not contain '0x', assume it's a block number
  if (!/0x/.test(query)) {
    blockHashOrBlockTag = Number(query);
  }

  // Fetch the block info using the Alchemy core library
  const blockInfo = await alchemy.core.getBlock(blockHashOrBlockTag);

  // Return the block info object with additional properties
  return {
    ...blockInfo,
    // Include these commented-out properties for future reference, but don't include them in the returned object
    // baseFeePerGas: blockInfo.baseFeePerGas?.toString() || 0,
    // gasLimit: blockInfo.gasLimit?.toString() || 0,
    // gasUsed: blockInfo.gasUsed?.toString() || 0,
    // difficulty: blockInfo.difficulty?.toString() || 0, // Renamed _difficulty to difficulty for clarity
  };
};
