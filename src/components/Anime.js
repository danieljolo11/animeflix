import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./AuthProvider";
import { Loader } from "./Loader";

// Icons
import { FiChevronLeft, FiChevronRight, FiSmile } from "react-icons/fi";

export default function Anime() {
  const { currentPage, recentAnimeData, setRecentDataLoading, setCurrentPage } =
    useAuth();

  return (
    <div className="flex flex-col py-2 gap-3">
      <div className="flex flex-row items-center justify-between pl-4 text-[#EEEEEE] relative max-w-[64rem]">
        <span className="text-xl font-semibold">Recently Updated</span>
        <div className="flex flex-row items-center gap-2 pr-6 md:pr-6 lg:pr-10">
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
      <AnimeShown />
    </div>
  );
}

const AnimeShown = () => {
  const navigate = useNavigate();
  const { recentAnimeData, recentDataLoading, topAiringData } = useAuth();
  const data = recentAnimeData.results || [];

  return (
    <div className="flex flex-col md:flex-row lg:flex-row">
      {recentDataLoading ? (
        <div className="basis-[70%]">
          <Loader />
        </div>
      ) : (
        <div className="lg:basis-[70%]">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {data.map(
              ({
                image,
                title: { userPreferred },
                episodeNumber,
                id,
                episodeId,
                rating,
                genres,
                type,
                episodeTitle,
              }) => {
                const test = [...genres];
                const splicedGenres = test.splice(0, 3);
                return (
                  <div
                    key={id}
                    className="group relative flex flex-col items-center overflow-hidden"
                    onClick={() =>
                      navigate("/watch", {
                        state: {
                          animeID: id,
                          episodeId,
                        },
                      })
                    }
                  >
                    <img
                      className="h-44 w-40 rounded-md"
                      alt="AnimeImage"
                      src={image}
                    />
                    <span className="text-zinc-300 text-sm font-medium text-center line-clamp-2">
                      {userPreferred}
                    </span>
                    <div className="absolute top-0 left-0 w-full h-full -rotate-x-90 origin-bottom transition-all group-hover:rotate-x-0 duration-700">
                      <div className="flex flex-col justify-between bg-white/90 rounded-md gap-3 h-full w-auto z-20 p-5">
                        <div className="flex flex-col gap-3">
                          <div className="flex flex-row items-center justify-between">
                            <span className="text-zinc-900 font-medium text-sm">
                              Episode: {episodeNumber}
                            </span>
                            {rating && (
                              <div className="flex flex-row items-center gap-1">
                                <FiSmile />
                                <span className="text-zinc-900 font-medium text-sm">
                                  {rating}%
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="text-zinc-900 font-medium text-sm">
                            {type}
                          </div>
                        </div>
                        <div className="flex flex-col items-start gap-2">
                          {splicedGenres.map((item) => {
                            return (
                              <div className="bg-[#008fb5] py-1 px-2 rounded-full text-xs text-white">
                                {item}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      )}
      <div className="basis-[30%] flex flex-col gap-3 pr-6">
        <div className="text-xl font-medium text-[#EEEEEE]">Trending Anime</div>
        {topAiringData.map(
          ({ title: { english }, image, genres, id }, index) => {
            const seperategenres = genres.join(", ");
            return (
              <div
                key={english}
                className="bg-black/40 rounded-xl flex flex-row justify-between items-center overflow-hidden transition-transform scale-100 hover:scale-105 duration-500 cursor-pointer"
                onClick={() =>
                  navigate("/watch", {
                    state: {
                      animeID: id,
                      episodeId: null,
                    },
                  })
                }
              >
                <div className="flex flex-row items-center gap-2">
                  <span
                    className={`bg-[#008fb5] text-4xl w-14 flex justify-center items-center py-4`}
                  >
                    {index + 1}
                  </span>
                  <div className="flex flex-col w-full">
                    <span className="text-[#EEEEEE] text-sm line-clamp-2">
                      {english}
                    </span>
                    <p className="flex-row items-center truncate w-[17.5rem] text-sm font-normal text-[#EEEEEE]">
                      {seperategenres}
                    </p>
                  </div>
                </div>
                <img
                  className="h-[4.5rem] w-14"
                  alt="TopAirImage"
                  src={image}
                />
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};
