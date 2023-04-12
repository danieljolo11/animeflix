import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

// Icons
import { FiSearch } from "react-icons/fi";

function App() {
  const pagenumber = [1, 2, 3, 4, 5];
  const genres = [
    "Action",
    "Adventure",
    "Cars",
    "Comedy",
    "Dementia",
    "Demons",
    "Drama",
    "Dub",
    "Ecchi",
    "Family",
    "Fantasy",
    "Game",
    "Harem",
    "Hentai",
    "Historical",
    "Horror",
    "Josei",
    "Kids",
    "Magic",
    "Martial Arts",
    "Mecha",
    "Military",
    "Music",
    "Mystery",
    "Parody",
    "Police",
    "Psychological",
    "Romance",
    "Samurai",
    "School",
    "Sci-Fi",
    "Seinen",
    "Shoujo",
    "Shoujo Ai",
    "Shounen",
    "Shounen Ai",
    "Slice of Life",
    "Space",
    "Sports",
    "Super Power",
    "Supernatural",
    "Thriller",
    "Vampire",
    "Yaoi",
    "Yuri",
  ];
  const [recentAnimeData, setRecentAnimeData] = useState([]);
  const [topAiringData, setTopAiringData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getApiDatas(); // eslint-disable-next-line
  }, [currentPage]);

  const getApiDatas = async () => {
    const recenturl =
      "https://api.consumet.org/anime/gogoanime/recent-episodes";
    const topairurl = "https://api.consumet.org/anime/gogoanime/top-airing";
    const getRecentEpisode = axios.get(recenturl, {
      params: { page: currentPage, type: 1 },
    });
    const getTopAiring = axios.get(topairurl);
    const [recentApiData, topAiringApiData] = await Promise.allSettled([
      getRecentEpisode,
      getTopAiring,
    ]);

    const { data: recentData, status: recentStatus } = recentApiData.value;
    console.log("recentData:", recentData)
    const { data: topairData, status: topairStatus } = topAiringApiData.value;

    setRecentAnimeData(recentStatus === 200 ? recentData.results : []);
    setTopAiringData(topairStatus === 200 ? topairData.results : []);
  };

  const renderNavbar = (
    <div className="bg-[#393E46] h-16 flex items-center px-4">
      <div className="flex flex-row items-center gap-3 w-full">
        <div className="text-xl font-semibold text-[#EEEEEE]">Animeflix</div>
        <div className="flex flex-row items-center">
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
          />
        </div>
      </div>
    </div>
  );

  const renderAnimeList = (
    <div className="flex flex-row py-6">
      <div className="basis-[70%] flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between px-4 text-[#EEEEEE]">
          <span className="text-xl font-semibold">Recently Updated</span>
          <div className="flex flex-row items-center gap-3">
            {pagenumber.map((item) => (
              <span
                className="text-sm font-medium cursor-pointer"
                key={item}
                onClick={() => setCurrentPage(item)}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {recentAnimeData.map(({ image, title, episodeNumber }) => (
            <div className="flex flex-col gap-1 items-center cursor-pointer mx-2">
              <div className="relative">
                <img className="h-44 w-40" alt="AnimeImage" src={image} />
                <div className="absolute top-0 left-0 bg-[#00ADB5] px-1 rounded-br-md">
                  <p className="text-xs font-medium text-[#222831]">
                    Episode {episodeNumber}
                  </p>
                </div>
                <div className="absolute top-0 right-0 bg-[#00ADB5] px-1 rounded-bl-md">
                  <p className="text-xs font-medium text-[#222831]">Sub</p>
                </div>
              </div>
              <span className="text-zinc-300 text-sm font-medium text-center line-clamp-2">
                {title}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="basis-[30%] flex flex-col gap-3 pt-8 pr-6">
        <div className="text-xl font-medium text-[#EEEEEE]">Top Anime</div>
        {topAiringData.map(({ title, image, genres }, index) => (
          <div className="bg-[#393E46] rounded-xl flex flex-row justify-between items-center overflow-hidden">
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
                    <span className="text-sm font-normal text-[#EEEEEE]">
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
  );

  return (
    <div className="min-h-screen bg-[#222831]">
      {renderNavbar}
      {renderAnimeList}
    </div>
  );
}

export default App;
