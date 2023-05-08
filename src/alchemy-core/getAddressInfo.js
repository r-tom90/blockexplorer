import { alchemy } from "../configs/alchemy.config";

export const getAddress = async (query) => {
  const data = alchemy.core.getBalance(query);
};

// ! Need work
