import { Route, Routes } from "react-router-dom";
import { NavBar, Footer } from "./components";
import { Home, Block, Transaction, Address, Nfts, NotFound } from "./pages";

function App() {
  return (
    <main className="h-full bg-primaryBgLight text-primaryTextLight dark:bg-primaryBgDark dark:text-primaryTextDark">
      <NavBar />
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/address/:address" element={<Address />} />
          <Route path="/block/:blocknumber" element={<Block />} />
          <Route path="/tx/:txhash" element={<Transaction />} />
          <Route path="/nfts" element={<Nfts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </main>
  );
}

export default App;
