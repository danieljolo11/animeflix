import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

// Icons
import { FiSearch } from "react-icons/fi";

function App() {
  const pagenumber = [1, 2, 3, 4, 5];
  const [animeListData, setAnimeListData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getAnimeList(); // eslint-disable-next-line
  }, [currentPage]);

  const getAnimeList = async () => {
    // const topairing = "https://api.consumet.org/anime/gogoanime/top-airing";
    const recentepi =
      "https://api.consumet.org/anime/gogoanime/recent-episodes";
    await axios
      .get(recentepi, { params: { page: currentPage, type: 1 } })
      .then(({ data, status }) => {
        if (status === 200) {
          setAnimeListData(data.results);
        }
        console.log("data:", data);
      });
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
          {animeListData.map(({ image, title, episodeNumber }) => (
            <div className="flex flex-col gap-1 items-center cursor-pointer">
              <div className="relative">
                <img className="h-44 w-40" alt="AnimeImage" src={image} />
                <div className="absolute top-0 left-0 bg-[#00ADB5] px-1 rounded-br-md">
                  <p className="text-xs font-medium text-[#222831]">Episode {episodeNumber}</p>
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
      <div className="basis-[30%]">
        <div>Top Anime</div>
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
