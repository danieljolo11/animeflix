import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./AuthProvider";
import { Loader } from "./Loader";

// Icons
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";

export default function Anime() {
  const { currentPage, recentAnimeData, setRecentDataLoading, setCurrentPage } =
    useAuth();

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
      <AnimeShown />
    </div>
  );
}

const AnimeShown = () => {
  const navigate = useNavigate();
  const { recentAnimeData, recentDataLoading, topAiringData } = useAuth();
  const data = recentAnimeData.results || [];
  return (
    <div className="flex flex-row">
      {recentDataLoading ? (
        <div className="basis-[70%]">
          <Loader />
        </div>
      ) : (
        <div className="basis-[70%]">
          <div className="grid grid-cols-5 gap-3">
            {data.map(
              ({
                image,
                title: { userPreferred },
                episodeNumber,
                id,
                episodeId,
              }) => (
                <div
                  key={id}
                  className="relative group flex flex-col gap-1 items-center cursor-pointer mx-2 "
                  onClick={() =>
                    navigate("/watch", {
                      state: {
                        animeID: id,
                        episodeId,
                      },
                    })
                  }
                >
                  <div className="">
                    <img className="h-44 w-40" alt="AnimeImage" src={image} />
                  </div>
                  <span className="text-zinc-300 text-sm font-medium text-center line-clamp-2">
                    {userPreferred}
                  </span>
                  <div className="flex flex-row transition-opacity opacity-0 invisible group-hover:visible group-hover:opacity-100 duration-500 absolute top-0 bottom-0 -right-44 h-fit z-20">
                    <div className="absolute -left-1.5 top-2 bottom-0">
                      <AiFillHeart className="text-white rotate-90" />
                    </div>
                    <div className="bg-white h-20 w-fit rounded-md z-20">
                      <span>TEST</span>
                      <span>TEST</span>
                      <span>TEST</span>
                      <span>TEST</span>
                      <span>TEST</span>
                    </div>
                  </div>
                </div>
              )
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
