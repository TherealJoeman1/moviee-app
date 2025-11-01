import React from "react";
import searchLogo from "../asset/search.svg";

export default function Search({ searchTerm, setSearchTerm }) {
  return (
    <div className="flex justify-center items-center w-full px-4 mt-8">
      <div className="w-full sm:w-[80%] md:w-[60%] bg-white/5 py-4 px-4 rounded-lg max-w-3xl">
        <div className="relative flex items-center gap-3">
          <img
            src={searchLogo}
            alt="search"
            className="absolute left-2 h-5 w-5"
          />

          <input
            type="text"
            placeholder="Search through thousands of movies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent py-2 sm:pr-10 pl-10 text-base text-gray-200 placeholder-light-200 outline-hidden"
          />
        </div>
      </div>
    </div>
  );
}
