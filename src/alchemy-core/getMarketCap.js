import axios from "axios";

export const getMarketCap = async () => {
  const response = await axios.get(
    "https://api.coingecko.com/api/v3/coins/ethereum"
  );
  console.log("response", response.data);

  return response.data.market_data.market_cap.usd;
};
