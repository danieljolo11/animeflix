import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

export const Navbar = () => {
  const [searchData, setSearchData] = useState([]);
  const [searchForm, setSearchForm] = useState("spy x family");

  useEffect(() => {
    getSearchResult();
  });

  const getSearchResult = async () => {
    const searchresulturl = `https://api.consumet.org/anime/gogoanime/${searchForm}`;
    await axios.get(searchresulturl).then(({data, status}) => {
      if (status === 200) {
        // setSearchData(data)
      }
      console.log("result: ", data);
    });
  };

  return (
    <div className="bg-[#393E46] h-16 flex items-center px-4">
      <div className="flex flex-row items-center gap-3 w-full">
        <div className="text-xl font-semibold text-[#EEEEEE]">Animeflix</div>
        <div className="flex flex-row items-center relative">
          <div className="bg-[#222831] py-2.5 rounded-l-md pl-2">
            <FiSearch className="text-zinc-500" />
          </div>
          <input
            type="text"
            name="first-name"
            id="first-name"
            autoComplete="given-name"
            className="searchinput"
            placeholder="Search anime"
            value={searchForm}
            onChange={(e) => setSearchForm(e.target.value)}
            // onBlur={(e) => setSearchForm(e.target.value)}
          />
          <div className="absolute top-8 bg-white w-full shadow-lg shadow-white/5 overflow-hidden p-2">
            <div>
              {/* <img className="h-10 w-12" alt="searchImage" src={null} > */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
