import { useNavigate } from "react-router-dom";
import { SlMagnifier } from "react-icons/sl";
import { AiOutlineEnter } from "react-icons/ai";
import { useRoutes } from "react-router-dom";
import { useState } from "react";

const SearchBar = () => {
  const navigate = useNavigate();
  const submit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const searchResults = Object.fromEntries(formData.entries()).search.trim();

    console.log("searchResults", searchResults);
    console.log("searchResults Length", searchResults.length);

    const address = new RegExp("0x[0-9a-fA-F]{40}");
    const block = new RegExp("^[0-9]{1,9999}$");
    const tx = new RegExp("0x[0-9a-fA-F]{64}");

    if (searchValue.match(tx)) return navigate(`/tx/${searchValue}`);
    if (searchValue.match(address)) return navigate(`/address/${searchValue}`);
    if (searchValue.match(block)) return navigate(`/block/${searchValue}`);
    if (searchValue === "") return navigate("/");
    return navigate("/404");
  };

  return (
    <section className="m-auto hidden w-full flex-col px-5 pt-4 md:flex">
      <h1>The Ethereum Blockchain Explorer</h1>
      <form className="relative hidden pt-2 sm:flex" onSubmit={submit}>
        <input
          type="search"
          name="search"
          id="search"
          // TODO: Allow for Domain name search in the future
          placeholder="Search by Address / Txn Hash / Block / Token"
          className="h-10 w-3/4 rounded-l-lg border border-secondaryBgLight bg-tertiaryBgLight py-2 pl-7 placeholder:text-sm placeholder:text-tertiaryBgDark focus:border-transparent focus:outline-none focus:ring-2 focus:ring-activeLight dark:border-secondaryBgDark dark:bg-tertiaryBgDark dark:placeholder:text-tertiaryBgLight"
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <SlMagnifier className="text-gray-400" />
        </div>
        <button
          type="submit"
          className="rounded-r-lg border border-secondaryBgLight bg-tertiaryBgLight px-2 py-2 text-tertiaryBgDark hover:bg-secondaryBgLight focus:outline-none dark:border-secondaryBgDark dark:bg-tertiaryBgDark dark:text-tertiaryBgLight dark:hover:bg-activeLight"
        >
          <AiOutlineEnter />
        </button>
      </form>
    </section>
  );
};

export default SearchBar;
