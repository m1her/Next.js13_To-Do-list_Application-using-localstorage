//search component
//props are used to handle input value and onChange function
"use client";

const Search = (props) => {
  return (
    <div className="relative border-[0.5px] border-b-0 rounded border-[#bdbdbd32] -mt-3 mb-3">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
        <svg
          aria-hidden="true"
          className="w-5 h-5 text-gray-300 "
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>
      <input
        type="search"
        id="default-search"
        className="block w-full p-2 pl-10 text-sm border-b-2 rounded bg-transparent border-gray-500 placeholder-gray-400 text-white focus:outline-none focus:border-[#7289da] focus:placeholder-gray-600"
        placeholder="Search"
        required
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );

};
export default Search;
