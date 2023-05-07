import { Route, Routes } from "react-router-dom";
import { NavBar, Footer } from "./components";
import { Home } from "./pages";

function App() {
  return (
    <div className="h-full bg-primaryBgLight text-primaryTextLight dark:bg-primaryBgDark dark:text-primaryTextDark">
      <NavBar />
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
