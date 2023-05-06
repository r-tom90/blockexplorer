import { Network, Alchemy } from "alchemy-sdk";
import { alchemy } from "../configs/alchemy.config";
import Overview from "../components/home/Overview";

const Home = () => {
  return (
    <div className="flex justify-center">
      <Overview />
      <h1></h1>
    </div>
  );
};

export default Home;
