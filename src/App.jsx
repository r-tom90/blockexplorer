import { Route, Routes } from "react-router-dom";
import { NavBar, Footer } from "./components";
import { Home, Block, NotFound } from "./pages";

function App() {
  return (
    <div className="h-full bg-primaryBgLight text-primaryTextLight dark:bg-primaryBgDark dark:text-primaryTextDark">
      <NavBar />
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/block/:blocknumber" element={<Block />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
