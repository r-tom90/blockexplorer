import { alchemy } from "../configs/alchemy.config";
import { useState, useEffect, useRef } from "react";
import { getLatestBlocks, getLatestTransactions } from "../alchemy-core";
import { LatestBlock, LatestTxns, Overview } from "../components/home";
import { SearchBar } from "../components/home";

const Home = () => {
  return (
    <main className="flex flex-col justify-center">
      {/* <SearchBar /> */}
      <Overview />
      <section className="m-auto hidden w-full px-5 pt-10 md:flex">
        <div className="w-1/2">
          <LatestBlock />
        </div>

        <div className="w-1/2">
          <LatestTxns />
        </div>
      </section>
      <section className="flex md:hidden">
        <p className="m-auto">
          For the best viewing experience, we recommend viewing on a desktop.{" "}
          <span className="text-red-600">
            To make sure everything is visible, please view the content in a
            larger window size of at least 640px.
          </span>
        </p>
      </section>
    </main>
  );
};

export default Home;
