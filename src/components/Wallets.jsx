import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

const Wallets = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  console.log("address", address);

  return (
    <div className="ml-2">
      <ConnectButton
        accountStatus={{
          smallScreen: "avatar",
          largeScreen: "full",
        }}
        chainStatus="icon"
        showBalance={false}
      />
      {/* {isConnecting && <div>Connecting...</div>}
      {isDisconnected && <div>Disconnected</div>}
      <div>{address}</div> */}
    </div>
  );
};

export default Wallets;
