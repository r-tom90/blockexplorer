/**
 * Fetches the current USD price of Ethereum (ETH) from the Coingecko API and stores it in local storage
 * @returns {Promise<number>} The current USD price of ETH
 */
export const getETHPrice = async () => {
  try {
    // Make a GET request to the Coingecko API to fetch the current ETH price in USD
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    );

    // If the response status is not 200, throw an error
    if (response.status !== 200)
      throw new Error("Error Fetching Eth Price From Coingecko");

    // Parse the response body as JSON
    const data = await response.json();

    // Store the ETH price in USD in local storage
    localStorage.setItem("ethPrice", data.ethereum.usd);

    // Return the ETH price in USD
    return localStorage.getItem("ethPrice");
  } catch (err) {
    // If there is an error, log it to the console and return 0
    localStorage.getItem("ethPrice");
    console.log(err);
    return 0;
  }
};
