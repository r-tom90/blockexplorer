import { alchemy } from "../configs/alchemy.config";
import { timeAgo } from "../utils";

/**
 * Returns an array of the latest transactions.
 * @param {number} maxTxns - The maximum number of transactions to return.
 * @returns {Promise} An array of objects containing information about the latest transactions.
 */
export const getLatestTransactions = async (maxTxns = 6) => {
  // Get the latest block number
  const latestBlock = await alchemy.core.getBlockNumber();
  // Get the transactions and timestamp of the latest block
  const { transactions, timestamp } = await alchemy.core.getBlock(latestBlock);

  // Create an array of promises to get the transaction receipts for each transaction
  const transactionsPromises = [];
  for (let i = 0; i < maxTxns; i++) {
    transactionsPromises.push(
      alchemy.core.getTransactionReceipt(transactions[i])
    );
  }
  // Get the transaction receipts for all the promises at once
  const latestTransactions = await Promise.all(transactionsPromises);

  console.log("latestTransactions", latestTransactions);

  // Map the transaction receipts to a new array with selected properties and a formatted timestamp
  return latestTransactions.map(
    ({ blockNumber, from, to, transactionHash }) => ({
      blockNumber,
      to,
      from,
      transactionHash,
      agoTimestamp: timeAgo(timestamp),
    })
  );
};
