import React from "react";

// Icons
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import useAuth from "./AuthProvider";

export default function Anime() {
  const {
    currentPage,
    recentDataLoading,
    recentAnimeData,
    topAiringData,
    setRecentDataLoading,
    setCurrentPage,
  } = useAuth();

  const Loader = (
    <div className="min-h-screen flex justify-center items-center bg-[#222831]">
      <div className="pyramid-loader">
        <div className="wrapper">
          <span className="side side1"></span>
          <span className="side side2"></span>
          <span className="side side3"></span>
          <span className="side side4"></span>
          <span className="shadow"></span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col py-2 gap-3">
      <div className="flex flex-row items-center justify-between pl-4 text-[#EEEEEE] relative max-w-[64rem]">
        <span className="text-xl font-semibold">Recently Updated</span>
        <div className="flex flex-row items-center gap-2 pr-10">
          {currentPage > 1 && (
            <div className="group flex flex-col items-center overflow-hidden">
              <span className="bg-[#EEEEEE] px-3 py-0.5 rounded-lg text-[#222831] text-xs invisible group-hover:visible absolute -top-5">
                Page {currentPage - 1}
              </span>
              <FiChevronLeft
                className="h-5 w-5 cursor-pointer"
                onClick={() => {
                  setRecentDataLoading(true);
                  setCurrentPage(currentPage - 1);
                }}
              />
            </div>
          )}
          {recentAnimeData.hasNextPage && (
            <div className="group flex flex-col items-center overflow-hidden">
              <p className="bg-[#EEEEEE] px-3 py-0.5 rounded-lg text-[#222831] text-xs invisible group-hover:visible absolute -top-5">
                Page {currentPage + 1}
              </p>
              <FiChevronRight
                className="h-5 w-5 cursor-pointer hover"
                onClick={() => {
                  setRecentDataLoading(true);
                  setCurrentPage(currentPage + 1);
                }}
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-row">
        {recentDataLoading ? (
          <div className="basis-[70%]">{Loader}</div>
        ) : (
          <div className="basis-[70%]">
            <div className="grid grid-cols-5 gap-3">
              {recentAnimeData.results.map(
                ({ image, title, episodeNumber }) => (
                  <div
                    key={title}
                    className="flex flex-col gap-1 items-center cursor-pointer mx-2 transition-transform scale-100 hover:scale-105 duration-500"
                  >
                    <div className="relative">
                      <img className="h-44 w-40" alt="AnimeImage" src={image} />
                      <div className="absolute top-0 left-0 bg-[#00ADB5] px-1 rounded-br-md">
                        <p className="text-xs font-medium text-[#222831]">
                          Episode {episodeNumber}
                        </p>
                      </div>
                      <div className="absolute top-0 right-0 bg-[#00ADB5] px-1 rounded-bl-md">
                        <p className="text-xs font-medium text-[#222831]">
                          Sub
                        </p>
                      </div>
                    </div>
                    <span className="text-zinc-300 text-sm font-medium text-center line-clamp-2">
                      {title}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        )}
        <div className="basis-[30%] flex flex-col gap-3 pr-6">
          <div className="text-xl font-medium text-[#EEEEEE]">Top Anime</div>
          {topAiringData.map(({ title, image, genres }, index) => (
            <div
              key={title}
              className="bg-[#393E46] rounded-xl flex flex-row justify-between items-center overflow-hidden transition-transform scale-100 hover:scale-105 duration-500 cursor-pointer"
            >
              <div className="flex flex-row items-center gap-2">
                <span className="text-4xl w-12 flex justify-center items-center py-4 rounded-r-3xl bg-[#EEEEEE]">
                  {index + 1}
                </span>
                <div className="flex flex-col">
                  <span className="text-[#EEEEEE] text-sm line-clamp-2">
                    {title}
                  </span>
                  <p className="flex-row items-center truncate w-[17.5rem] text-[#EEEEEE] space-x-2">
                    {genres.map((item) => (
                      <span
                        className="text-sm font-normal text-[#EEEEEE]"
                        key={item}
                      >
                        {item},
                      </span>
                    ))}
                  </p>
                </div>
              </div>
              <img className="h-[4.5rem] w-14" alt="TopAirImage" src={image} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
