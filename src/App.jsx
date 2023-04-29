import { Route, Routes } from "react-router-dom";
import { NavBar, Footer } from "./components";
import { Home, SearchPage } from "./pages";

function App() {
  return (
    <div className="h-full bg-primaryBgLight text-primaryTextLight dark:bg-primaryBgDark dark:text-primaryTextDark">
      <NavBar />
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
