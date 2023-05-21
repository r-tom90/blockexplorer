import axios from "axios";

export const getDailyPercentageChange = async () => {
  const response = await axios.get(
    "https://api.coingecko.com/api/v3/coins/ethereum"
  );
  console.log(
    "24hr % change",
    response.data.market_data.market_cap_change_percentage_24h
  );

  return response.data.market_data.market_cap_change_percentage_24h;
};
