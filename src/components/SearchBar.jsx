import { useNavigate } from "react-router-dom";
import { SlMagnifier } from "react-icons/sl";
import { AiOutlineEnter } from "react-icons/ai";

const SearchBar = () => {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const searchQuery = Object.fromEntries(formData.entries()).search.trim();

    // console.log("searchQuery", searchQuery);
    // console.log("searchQuery Length", searchQuery.length);

    const addressRegex = new RegExp("0x[0-9a-fA-F]{40}");
    const blockRegex = new RegExp("^[0-9]{1,9999}$");
    const txRegex = new RegExp("0x[0-9a-fA-F]{64}");

    if (searchQuery.match(txRegex)) {
      navigate(`/tx/${searchQuery}`);
    } else if (searchQuery.match(addressRegex)) {
      navigate(`/address/${searchQuery}`);
    } else if (searchQuery.match(blockRegex)) {
      navigate(`/block/${searchQuery}`);
    } else if (searchQuery === "") {
      navigate("/");
    } else {
      navigate("/404");
    }
  };

  return (
    <section className="m-auto flex w-full flex-col px-5 py-2">
      <form className="relative flex" onSubmit={handleSubmit}>
        <input
          type="search"
          name="search"
          id="search"
          // TODO: Allow for Domain name search in the future
          placeholder="Search by Address / Txn Hash / Block / Token"
          className="h-10 w-full rounded-l-lg border border-secondaryBgLight bg-tertiaryBgLight py-2 pl-8 placeholder:text-sm placeholder:text-tertiaryBgDark focus:border-transparent focus:outline-none focus:ring-2 focus:ring-activeLight dark:border-secondaryBgDark dark:bg-tertiaryBgDark dark:placeholder:text-tertiaryBgLight md:w-2/3"
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
