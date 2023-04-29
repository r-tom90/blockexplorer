import { useState } from "react";
import { SlMagnifier } from "react-icons/sl";
import { AiOutlineEnter } from "react-icons/ai";

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    if (searchText.trim()) {
      onSearch(searchText);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative flex">
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search Txn Hash"
        // Search by Address / Txn Hash / Block / Token
        className="h-10 w-[750px] rounded-l-lg border border-secondaryBgLight bg-tertiaryBgLight py-2 pl-7 placeholder:text-sm placeholder:text-tertiaryBgDark focus:border-transparent focus:outline-none focus:ring-2 focus:ring-activeLight dark:border-secondaryBgDark dark:bg-tertiaryBgDark dark:placeholder:text-tertiaryBgLight"
      />
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <SlMagnifier className="text-gray-400" />
      </div>
      <button
        onClick={handleSearch}
        className="rounded-r-lg border border-secondaryBgLight bg-tertiaryBgLight px-2 py-2 text-tertiaryBgDark hover:bg-secondaryBgLight focus:outline-none dark:border-secondaryBgDark dark:bg-tertiaryBgDark dark:text-tertiaryBgLight dark:hover:bg-activeLight"
      >
        <AiOutlineEnter />
      </button>
    </div>
  );
};

export default SearchBar;
