import { LatestBlock, LatestTxns, Overview } from "../components/home";
import { EmblaCarousel, SearchBar } from "../components";

const Home = () => {
  return (
    <main className="flex flex-col justify-center">
      <div className="my-5">
        <div className="block justify-between px-5 md:flex">
          <div className="mr-10 flex w-full flex-col md:w-2/3">
            <h1 className="text-xl font-medium">
              The Ethereum Blockchain Explorer
            </h1>
            <SearchBar />
            <h3 className="hidden pb-5 text-base font-semibold md:block">
              Sponsored: <span className="font-normal">TBA</span>
            </h3>
          </div>
          <div className="flex w-full justify-center md:w-1/3">
            <EmblaCarousel />
          </div>
        </div>
      </div>
      <div>
        <Overview />
      </div>
      <section className="m-auto block w-full px-5 pt-10 sm:flex">
        <div className="mb-5 w-full sm:mb-0 sm:w-1/2">
          <LatestBlock />
        </div>
        <div className="mb-5 w-full sm:mb-0 sm:w-1/2">
          <LatestTxns />
        </div>
      </section>
      <section className="flex md:hidden">
        <p className="m-auto">
          For the best viewing experience, we recommend viewing on a desktop.{" "}
          <span className="text-red-600">
            To make sure everything is visible, please view the content in a
            larger window size of at least 780px.
          </span>
        </p>
      </section>
    </main>
  );
};

export default Home;
