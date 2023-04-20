import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState([]);
  const [searchForm, setSearchForm] = useState("");
  const [show, setShowNoResult] = useState(false);

  useEffect(() => {
    const delayinsearch = setTimeout(() => {
      getSearchResult();
    }, 200);
    return () => clearTimeout(delayinsearch); // eslint-disable-next-line
  }, [searchForm]);

  const getSearchResult = async () => {
    const searchresulturl = `https://api.consumet.org/meta/anilist/${searchForm}`;
    await axios.get(searchresulturl).then(({ data, status }) => {
      if (status === 200) {
        const splicedata = data.documentation
          ? data.results
          : data.results.splice(0, 5);
        setSearchData(splicedata);
        showFunction(splicedata);
      }
    });
  };

  const showFunction = (splicedata) => {
    if (searchForm) {
      if (splicedata.length === 0) {
        setShowNoResult(true);
      } else {
        setShowNoResult(false);
      }
    } else {
      setShowNoResult(false);
    }
  };

  const renderShowSearchResult = () => {
    const data = searchData || [];

    return (
      <div
        className={`${
          searchData ? "max-h-[30rem]" : "max-h-0"
        } absolute top-8  bg-[#222831] transition-all duration-1000 rounded-b-md w-full shadow-lg shadow-white/5 overflow-hidden z-50 px-2`}
      >
        {data.map(
          ({
            id,
            image,
            title: { english, userPreferred },
            releaseDate,
            status,
            type,
          }) => {
            return (
              <div
                key={id}
                className="flex flex-row gap-2 py-2 mt-2 cursor-pointer"
                onClick={() =>
                  navigate("/watch", {
                    state: {
                      animeID: id,
                      episodeId: null,
                    },
                  })
                }
              >
                <img
                  className="h-16 w-16"
                  alt="searchImage"
                  src={image ?? null}
                />
                <div className="flex flex-col justify-between">
                  <div className="flex flex-col">
                    <span className="text-zinc-200 text-sm font-normal line-clamp-1">
                      {userPreferred}
                    </span>
                    <span className="text-zinc-400 text-xs font-normal line-clamp-1">
                      {english}
                    </span>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <span className="text-zinc-400 text-xs font-normal">
                      {releaseDate}
                    </span>
                    <span className="text-zinc-400 text-xs font-normal">
                      {status}
                    </span>
                    <span className="text-zinc-400 text-xs font-normal">
                      {type}
                    </span>
                  </div>
                </div>
              </div>
            );
          }
        )}
        {data.length > 0 && (
          <p className="text-center mt-2 mb-4 cursor-pointer text-sm font-medium text-zinc-200">
            View All
          </p>
        )}
      </div>
    );
  };

  const renderNoResult = () => {
    return (
      <div
        className={`${
          show ? "max-h-[30rem]" : "max-h-0"
        } absolute top-8  bg-[#222831] transition-all duration-1000 rounded-b-md w-full shadow-lg shadow-white/5 overflow-hidden z-40 px-2`}
      >
        <p className="text-center mt-2 mb-4 cursor-pointer text-sm font-medium text-zinc-200">
          No Result
        </p>
      </div>
    );
  };

  return (
    <div className="bg-[#393E46] h-16 flex items-center px-4">
      <div className="flex flex-row items-center gap-3 w-full">
        <div
          className="text-xl font-semibold text-[#EEEEEE] cursor-pointer"
          onClick={() => navigate("/")}
        >
          Animeflix
        </div>
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
          {renderNoResult()}
        </div>
      </div>
    </div>
  );
};
