import { Utils } from "alchemy-sdk";
import { alchemy } from "../configs/alchemy.config";

/**
 * Get the current gas price from Alchemy.
 * @returns {Promise<number>} The gas price in Gwei.
 */
export const getGasPrice = async () => {
  // Get the gas price from Alchemy and convert it to hex.
  const result = (await alchemy.core.getGasPrice())._hex;

  // Convert the gas price to Gwei and round it to the nearest whole number.
  let gweiAmount = Math.round(Utils.formatUnits(result, "gwei"));

  // Return the gas price in Gwei.
  return gweiAmount;
};
