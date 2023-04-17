import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components";
import { Home, SearchPage } from "./pages";

function App() {
  return (
    <div className="h-screen bg-primaryBgLight text-primaryTextLight dark:bg-primaryBgDark dark:text-primaryTextDark">
      <NavBar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
