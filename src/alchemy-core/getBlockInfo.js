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
  // ? Returns the block from the network based on the provided block number or hash. Transactions on the block are represented as an array of transaction hashes. To get the full transaction details on the block, use getBlockWithTransactions instead.
  const blockInfo = await alchemy.core.getBlock(blockHashOrBlockTag);

  // Log the getBlockInfo for debugging purposes.
  console.log("getBlockInfo", blockInfo);

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

/* //* Response from getBlockInfo 
{
  hash: string,
  parentHash: string,
  number: number,
  timestamp: number,
  nonce: string,
  difficulty: number,
  gasLimit: BigNumber { _hex: 'Ox', _isBigNumber: boolean },
  gasUsed: BigNumber { _hex: '0x', _isBigNumber: boolean },
  miner: string,
  extraData: '0x6e616e6f706f6f6c2e6f7267',
  transactions: [],
  baseFeePerGas: BigNumber { _hex: '0x', _isBigNumber: boolean },
  _difficulty: BigNumber { _hex: '0x2', _isBigNumber: boolean }
}
*/
