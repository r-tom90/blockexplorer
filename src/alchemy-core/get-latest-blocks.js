import { alchemy } from "../configs/alchemy.config";
import { Utils } from "alchemy-sdk";
import { timeAgo } from "../utils";

export const getLatestBlocks = async (maxBlocks = 6) => {
  const latestBlock = await alchemy.core.getBlockNumber();
  const blockPromises = [];
  for (let i = 0; i < maxBlocks; i++) {
    blockPromises.push(alchemy.core.getBlock(latestBlock - i));
  }

  const latestBlocksRaw = await Promise.all(blockPromises);
  console.log(latestBlocksRaw);

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
