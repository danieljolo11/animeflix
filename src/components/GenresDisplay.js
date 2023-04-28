import React from "react";
import useAuth from "./AuthProvider";
import { Navbar } from "./Navbar";
import { Loader } from "./Loader";
import { ListOfGenre } from "./Genres";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function GenresDisplay() {
  const { isLoading, searchSelected, currentPageSearch, setCurrentPageSearch } =
    useAuth();

  const renderContainer = () => {
    const data = searchSelected.results || [];
    return (
      <div className="flex flex-col px-40 gap-3 pb-10">
        <div className="flex flex-row items-center justify-end gap-2 pr-6">
          {currentPageSearch > 1 && (
            <div className="text-white font-medium text-[14px] uppercase cursor-pointer transition-transform scale-100 active:scale-110">
              <FiChevronLeft
                className="h-5 w-5 cursor-pointer"
                onClick={() => {
                  setCurrentPageSearch(searchSelected.currentPage - 1);
                }}
              />
            </div>
          )}
          {searchSelected.hasNextPage && (
            <div className="text-white font-medium text-[14px] uppercase cursor-pointer transition-transform scale-100 active:scale-110">
              <FiChevronRight
                className="h-5 w-5 cursor-pointer"
                onClick={() =>
                  setCurrentPageSearch(searchSelected.currentPage + 1)
                }
              />
            </div>
          )}
        </div>
        <div className="grid grid-cols-5 gap-6">
          {data.map(({ image, id, title: { userPreferred } }) => {
            return (
              <div
                key={id}
                className="flex flex-col gap-1 items-center cursor-pointer mx-2 transition-transform scale-100 hover:scale-105 duration-500"
              >
                <div className="relative">
                  <img className="h-44 w-40" alt="AnimeImage" src={image} />
                  <div className="absolute top-0 left-0 bg-[#00ADB5] px-1 rounded-br-md">
                    <p className="text-xs font-medium text-[#222831]">
                      Episode 1
                    </p>
                  </div>
                  <div className="absolute top-0 right-0 bg-[#00ADB5] px-1 rounded-bl-md">
                    <p className="text-xs font-medium text-[#222831]">Sub</p>
                  </div>
                </div>
                <span className="text-zinc-300 text-sm font-medium text-center line-clamp-2">
                  {userPreferred}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#222831]">
      <Navbar />
      <div className="my-6">
        <ListOfGenre />
      </div>
      {isLoading ? <Loader /> : renderContainer()}
    </div>
  );
}

export default GenresDisplay;
