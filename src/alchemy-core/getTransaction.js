import { alchemy } from "../configs/alchemy.config";

/**
 * Retrieves a transaction by hash from the Alchemy API.
 * @param {string} transactionHash - The transaction hash to retrieve.
 * @returns {Promise<object>} - A Promise that resolves to the transaction object.
 * @throws {Error} - If the transactionHash does not match the expected format.
 */
export const getTransaction = async (transactionHash) => {
  // Define a regular expression to match a valid transaction hash.
  const transactionHashRegex = new RegExp("0x[0-9a-fA-F]{64}");

  // If the transactionHash does not match the expected format, throw an error.
  if (!transactionHash.match(transactionHashRegex)) {
    throw new Error("Invalid transaction hash");
  }

  // Call the Alchemy API to retrieve the transaction.
  // ? Returns the transaction with hash or null if the transaction is unknown.
  const transaction = await alchemy.core.getTransaction(transactionHash);

  // Log the transaction for debugging purposes.
  console.log("getTransaction", transaction);
  // Return the transaction object.
  return transaction;
};

/* //* Response from getTransaction 
{
  accessList: [],
  blockHash: string,
  blockNumber: number,
  chainId: number,
  confirmations: number,
  creates: number,
  data: string,
  from: string,
  gasLimit: BigNumber { _hex: 'Ox', _isBigNumber: boolean },
  gasPrice: BigNumber { _hex: '0x', _isBigNumber: boolean },
  hash: string,
  maxFeePerGas: BigNumber { _hex: '0x', _isBigNumber: boolean },
  maxPriorityFeePerGas: BigNumber { _hex: '0x', _isBigNumber: boolean },
  nonce: number,
  r: string, // x-coordinate of the ECDSA signature.
  s: string, // "signature" of the message, which is used to verify the message's authenticity. It is also known as the "recovery parameter".
  to: string, // A 1-byte value that is used to identify the chain ID of the blockchain on which the transaction was signed.
  transactionIndex: number,
  type: number,
  v: number,
  value: BigNumber { _hex: '0x', _isBigNumber: boolean },
  wait: (confirms, timeout) => {},
}
*/
