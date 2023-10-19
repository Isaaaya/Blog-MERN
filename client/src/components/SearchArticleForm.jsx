import React from "react";
import { HiOutlineSearch } from "react-icons/hi";

const SearchArticleForm = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex items-center shadow-md rounded-lg">
        <input
          className="pl-10 py-[15px] w-[100%] rounded-lg"
          placeholder="Search article"
        />
        <HiOutlineSearch
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        />
        <button className="max-sm:hidden absolute right-3 bg-primary text-white px-5 py-[5px] rounded-md font-semibold">
          Search
        </button>
      </div>
      <button className="bg-primary text-white px-5 py-[5px] rounded-md font-semibold text-lg sm:hidden">
        Search
      </button>
    </div>
  );
};

export default SearchArticleForm;
