import { alchemy } from "../configs/alchemy.config";

/**
 * Returns the transaction receipt object for the given transaction hash.
 * @param {string} transactionHash - The transaction hash to look up.
 * @returns {Promise<object>} - A Promise that resolves to the transaction receipt object.
 * @throws {Error} - If the transaction hash is invalid.
 */
export const getTransactionReceipt = async (transactionHash) => {
  // Define a regular expression to match a valid transaction hash.
  const transactionHashRegex = new RegExp("0x[0-9a-fA-F]{64}");

  // If the transactionHash does not match the expected format, throw an error.
  if (!transactionHash.match(transactionHashRegex)) {
    throw new Error("Invalid transaction hash");
  }

  // Look up the transaction receipt using Alchemy.
  // ? Returns the transaction with hash or null if the transaction has not been mined.
  const transactionReceipt = await alchemy.core.getTransactionReceipt(
    transactionHash
  );

  // Log the transaction receipt for debugging purposes.
  console.log("transactionReceipt", transactionReceipt);

  // Return the transaction receipt object.
  return transactionReceipt;
};

/* //* Response from getTransactionReceipt 
{
  to: string,
  from: string,
  contractAddress: null,
  transactionIndex: number,
  gasUsed: BigNumber { _hex: '0x', _isBigNumber: bool },
  logsBloom: string,
  blockHash: string,
  transactionHash: string,
  logs: [],
  blockNumber: number,
  confirmations: number,
  cumulativeGasUsed: BigNumber { _hex: '0x', _isBigNumber: bool },
  effectiveGasPrice: BigNumber { _hex: '0x', _isBigNumber: bool },
  status: number, // 1 (success) or 0 (failure)
  type: number,
  byzantium: bool
}
 */
