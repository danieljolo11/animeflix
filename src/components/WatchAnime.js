import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Loader } from "./Loader";

function WatchAnime() {
  const location = useLocation();
  const { animeID, episodeId } = location.state;

  const [animeInfoData, setAnimeInfoData] = useState([]);
  const [serverData, setServerData] = useState([]);
  const [nextEpisode, setNextEpisode] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getApiDatas(); // eslint-disable-next-line
  }, [nextEpisode]);

  const getApiDatas = async () => {
    const currentepisode = nextEpisode ? nextEpisode : episodeId;
    const serverUrl = `https://api.consumet.org/anime/gogoanime/watch/${currentepisode}`;
    const animeInfoUrl = `https://api.consumet.org/anime/gogoanime/info/${animeID}`;
    const getWatchServer = axios.get(serverUrl, {
      params: { server: "gogocdn" },
    });
    const getAnimeInfo = axios.get(animeInfoUrl);

    const [watchServerApi, animeInfoApi] = await Promise.allSettled([
      getWatchServer,
      getAnimeInfo,
    ]).finally(() => {
      setIsLoading(false);
    });

    const { data: watch, status: watchStatus } = watchServerApi.value;
    const { data: info, status: infoStatus } = animeInfoApi.value;
    console.log("info:", info);
    console.log("watch:", watch);

    setServerData(watchStatus === 200 ? watch : []);
    setAnimeInfoData(infoStatus === 200 ? info : []);
  };

  const renderContainer = () => {
    const { Referer } = serverData?.headers || [];
    const {
      image,
      title,
      otherName,
      description,
      // status,
      // subOrDub,
      // totalEpisodes,
      // type,
      episodes,
      // genres,
    } = animeInfoData;

    return (
      <div>
        <div className="flex flex-row mt-6 h-[80vh] px-4 gap-2">
          <div className="flex basis-[75%]">
            <iframe
              title="mainvideo"
              allowfullscreen="true"
              webkitallowfullscreen="true"
              mozallowfullscreen="true"
              height="100%"
              width="100%"
              src={Referer}
            />
          </div>
          <div className="flex basis-[25%] bg-white/30 mb-[1.7rem]">
            <div className="w-full">
              <p className="text-white bg-black/80 py-1.5 px-2">Episodes</p>
              <div className="flex flex-col">
                {episodes.map((items) => {
                  const currentepisode = nextEpisode ? nextEpisode : episodeId;
                  return (
                    <span
                      onClick={() => setNextEpisode(items.id)}
                      className={`${
                        currentepisode === items.id
                          ? "bg-[#00ADB5]"
                          : "bg-transparent"
                      } p-2 cursor-pointer`}
                    >
                      Episode {items?.number}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#393E46] px-4 p-4">
          <div className="flex flex-row justify-between gap-12">
            <div className="flex flex-col">
              <p className="text-[#EEEEEE] text-lg font-medium">{title}</p>
              <p className="text-gray-400 text-sm font-normal">{otherName}</p>
              <p className="text-gray-400 text-sm font-normal line-clamp-3 pt-2">
                {description}
              </p>
            </div>
            <img
              className="h-full w-full max-w-[14rem] max-h-[14rem] rounded-lg"
              alt="animeImage"
              src={image}
            />
          </div>
        </div>
      </div>
    );
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="min-h-screen bg-[#222831]">
      <Navbar />
      {renderContainer()}
    </div>
  );
}

export default WatchAnime;
