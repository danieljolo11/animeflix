import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

export const Navbar = () => {
  const [searchData, setSearchData] = useState([]);
  const [searchForm, setSearchForm] = useState("");

  useEffect(() => {
    const delay = searchForm ? 1000 : 0
    const delayinsearch = setTimeout(() => {
      getSearchResult();
    }, delay);
    return () => clearTimeout(delayinsearch); // eslint-disable-next-line
  }, [searchForm]);

  const getSearchResult = async () => {
    const searchresulturl = `https://api.consumet.org/anime/gogoanime/${searchForm}`;
    await axios.get(searchresulturl).then(({ data, status }) => {
      if (status === 200) {
        const splicedata = data.documentation
          ? data.results
          : data.results.splice(0, 5);
        setSearchData(splicedata);
      }
    });
  };

  const renderShowSearchResult = () => {
    const data = searchData || [];

    return (
      <div className="absolute top-8 bg-[#222831] rounded-b-md w-full shadow-lg shadow-white/5 overflow-hidden z-50 px-2">
        {data.map(({ id, image, title, releaseDate }) => {
          return (
            <div
              key={id}
              className="flex flex-row gap-2 py-2 mt-2 cursor-pointer"
            >
              <img
                className="h-16 w-16"
                alt="searchImage"
                src={image ?? null}
              />
              <div className="flex flex-col">
                <span className="text-zinc-200 text-sm font-normal">
                  {title}
                </span>
                <span className="text-zinc-400 text-sm font-normal">
                  {releaseDate}
                </span>
              </div>
            </div>
          );
        })}
        {data.length > 0 && (
          <p className="text-center mt-2 mb-4 cursor-pointer text-sm font-medium text-zinc-200">
            View All
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="bg-[#393E46] h-16 flex items-center px-4">
      <div className="flex flex-row items-center gap-3 w-full">
        <div className="text-xl font-semibold text-[#EEEEEE]">Animeflix</div>
        <div className="flex flex-row items-center relative">
          <div className="bg-[#222831] py-2.5 rounded-l-md pl-2">
            <FiSearch className="text-zinc-300" />
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
            onBlur={() => setSearchForm("")}
          />
          {renderShowSearchResult()}
        </div>
      </div>
    </div>
  );
};
