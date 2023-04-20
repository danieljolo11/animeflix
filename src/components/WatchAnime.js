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
  }, [nextEpisode, animeID, episodeId]);

  const getApiDatas = async () => {
    const animeInfoUrl = `https://api.consumet.org/meta/anilist/info/${animeID}`;
    const getAnimeInfo = axios.get(animeInfoUrl, {
      params: { provider: "gogoanime" },
    });

    const [animeInfoApi] = await Promise.allSettled([getAnimeInfo]);

    const { data: info, status: infoStatus } = animeInfoApi.value;

    setAnimeInfoData(infoStatus === 200 ? info : []);
    getWatchServer(info);
  };

  const getWatchServer = async (info) => {
    const getlastData = info.episodes.slice(-1);
    const defaultEpi = getlastData[0].id;
    const currentepisode = nextEpisode ? nextEpisode : episodeId;

    const serverUrl = `https://api.consumet.org/meta/anilist/watch/${
      currentepisode !== null ? currentepisode : defaultEpi
    }`;
    await axios
      .get(serverUrl)
      .then(({ data, status }) => {
        setServerData(status === 200 ? data : []);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const renderContainer = () => {
    const { Referer } = serverData?.headers || [];
    const {
      image,
      title: { english, romaji },
      description,
      episodes,
      currentEpisode,
      type,
      status,
      totalEpisodes,
      startDate,
      studios,
      rating,
      genres,
      popularity,
      duration,
      season,
    } = animeInfoData;

    const AnimeDescriptions = [
      {
        dataname: "Popularity",
        datashown: popularity.toLocaleString(),
      },
      {
        dataname: "Type",
        datashown: type,
      },
      {
        dataname: "Status",
        datashown: status,
      },
      {
        dataname: "Episodes",
        datashown: totalEpisodes,
      },
      {
        dataname: "Rating",
        datashown: (rating / 10).toFixed(1),
      },
      {
        dataname: "Duration",
        datashown: `${duration} mins`,
      },
      {
        dataname: "Season",
        datashown: `${season} ${startDate?.year}`,
      },
    ];

    const seperategenres = genres.join(", ");
    const seperatestudios = studios.join(", ");

    return (
      <div>
        {/* Video and Episodes */}
        <div className="flex flex-row mt-6 h-[80vh] px-4 gap-2">
          <div className="flex basis-[75%]">
            <iframe
              title="mainvideo"
              allowFullScreen={true}
              webkitallowfullscreen="true"
              mozallowfullscreen="true"
              height="100%"
              width="100%"
              src={Referer}
            />
          </div>
          <div className="flex basis-[25%]">
            <div className="w-full">
              <p className="text-white bg-black/80 py-1.5 px-2">Episodes</p>
              <div className="flex flex-col overflow-auto bg-white/30 h-[34rem]">
                {episodes.map((items) => {
                  const defaultEpisode = currentEpisode === items.number;
                  const clickNext = nextEpisode === items.id;
                  const getcurrentepisode = nextEpisode
                    ? clickNext
                    : defaultEpisode;
                  return (
                    <div
                      key={items.id}
                      onClick={() => setNextEpisode(items.id)}
                      className={`${
                        getcurrentepisode ? "bg-[#00ADB5]" : "bg-transparent"
                      } p-2 cursor-pointer flex flex-row items-center gap-3`}
                    >
                      <span
                        className={`${
                          getcurrentepisode ? "text-white" : "text-zinc-900"
                        } text-base font-medium line-clamp-1`}
                      >
                        {items?.number}.
                      </span>
                      <p
                        className={`${
                          getcurrentepisode ? "text-white" : "text-zinc-900"
                        } text-base font-medium line-clamp-1`}
                      >
                        {items?.title}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        {/* Anime Description */}
        <div className="bg-[#393E46] px-4 p-4">
          <div className="flex flex-row justify-between gap-12">
            <div className="flex flex-col">
              <p className="text-[#EEEEEE] text-lg font-medium">{romaji}</p>
              <p className="text-gray-400 text-sm font-normal">{english}</p>
              <p className="text-gray-400 text-sm font-normal line-clamp-3 pt-2">
                {description}
              </p>
              <div className="grid grid-cols-2 gap-1 mt-4">
                <div className="flex flex-row items-center gap-2">
                  <p className="text-zinc-400 text-sm font-normal">Studios:</p>
                  <div className="flex flex-row items-center">
                    <p className="text-gray-300 text-sm font-normal">
                      {seperatestudios}
                    </p>
                  </div>
                </div>
                {AnimeDescriptions.map(({ dataname, datashown }) => (
                  <div className="flex flex-row items-center gap-2">
                    <p className="text-zinc-400 text-sm font-normal">
                      {dataname}:
                    </p>
                    <p className="text-gray-300 text-sm font-normal capitalize">
                      {datashown}
                    </p>
                  </div>
                ))}
                <div className="flex flex-row items-center gap-2">
                  <p className="text-zinc-400 text-sm font-normal">Genres:</p>
                  <div className="flex flex-row items-center">
                    <p className="text-gray-300 text-sm font-normal">
                      {seperategenres}
                    </p>
                  </div>
                </div>
              </div>
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
