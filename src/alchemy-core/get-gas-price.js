import { Utils } from "alchemy-sdk";
import { alchemy } from "../configs/alchemy.config";

export const getGasPrice = async () => {
  // Retrieve the gas price from the Alchemy API and get the result as a hex string
  const result = (await alchemy.core.getGasPrice())._hex;

  // Convert the gas price from Wei to Gwei and round it to the nearest whole number
  let gweiAmount = Math.round(Utils.formatUnits(result, "gwei"));

  // Set the gas state to the rounded Gwei amount
  return gweiAmount;
};
