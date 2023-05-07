import { alchemy } from "../configs/alchemy.config";
import {
  getLatestBlocks,
  getLatestTransactions,
  // getEthPrice,
  getMarketCap,
} from "../alchemy-core";
import { LatestBlock, LatestTxns, Overview } from "../components/home";
import { SearchBar } from "../components/home";

const Home = ({
  blocksInfo,
  latestTransactions,
  // ethPrice,
  marketCap,
}) => {
  return (
    <main className="flex flex-col justify-center">
      <SearchBar />
      <Overview />
      <section className="mt-8 flex justify-center">
        <div className="grid gap-3 md:grid-cols-12">
          <div className="col-span-6">
            <LatestBlock blocksInfo={blocksInfo} />
          </div>

          <div className="col-span-6">
            {<LatestTxns latestTransactions={latestTransactions} />}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;

export const getServerSideProps = async () => {
  let blocksInfo = [];
  let latestTransactions = [];
  // let ethPrice = 0;
  let marketCap = 0;

  try {
    [
      blocksInfo,
      latestTransactions,
      // ethPrice,
      marketCap,
    ] = await Promise.all([
      getLatestBlocks(),
      getLatestTransactions(),
      // getETHPrice(),
      getMarketCap(),
    ]);
  } catch (err) {
    console.log({ err });
  }

  return {
    props: {
      blocksInfo,
      latestTransactions,
      // ethPrice,
      marketCap,
    },
  };
};
