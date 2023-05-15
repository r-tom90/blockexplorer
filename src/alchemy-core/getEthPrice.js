export const getETHPrice = async () => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    );
    if (response.status !== 200)
      throw new Error("Error Fetching Eth Price From Coingecko");
    const data = await response.json();
    localStorage.setItem("ethPrice", data.ethereum.usd);
    return localStorage.getItem("ethPrice");
  } catch (err) {
    localStorage.getItem("ethPrice");
    console.log(err);
    return 0;
  }
};
