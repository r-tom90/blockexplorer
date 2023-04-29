// This function takes an Ethereum address and returns a shortened version of it
// by displaying the first `length` characters, followed by "....", and then the last `length` characters.
export const shortenAddress = (address, length = 5) => {
  // If the address is not defined, return null
  if (!address) return null;

  // Otherwise, return the shortened version of the address
  return (
    address.slice(0, length) + "...." + address.slice(address.length - length)
  );
};

// This function takes an Ethereum address and returns a shortened version of it
// by displaying the first `length` characters, followed by "....".
export const shortenAddressEnd = (address, length = 10) => {
  // If the address is not defined, return null
  if (!address) return null;

  // Otherwise, return the shortened version of the address
  return address.slice(0, length) + "....";
};
