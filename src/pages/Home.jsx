import { home } from "../assets";
import { Network, Alchemy } from "alchemy-sdk";

const settings = {
  apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const Home = () => {
  return (
    <div className="flex justify-center">
      <img src={home} alt="Eth Dao Logo" className="max-h-[700px] w-auto" />
    </div>
  );
};

export default Home;
