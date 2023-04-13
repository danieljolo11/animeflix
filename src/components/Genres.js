import React, { useState } from "react";
import useAuth from "./AuthProvider";

export const ListOfGenre = () => {
  const { setSearchForm, setCurrentPage } = useAuth();
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

  const [genresShowing, setGenresShowing] = useState(14);
  const [hideMore, setHideMore] = useState(false);

  const genresData = genres.slice(0, genresShowing);

  return (
    <div className="p-4 ">
      <div className="pb-4">
        <span className="text-xl font-semibold text-[#EEEEEE]">Genres</span>
      </div>
      <div
        className={`${
          hideMore ? "h-[7.5rem]" : "h-6"
        } duration-500 transition-[height] flex flex-wrap gap-2 overflow-hidden`}
      >
        {genresData.map((item) => (
          <span
            key={item}
            onClick={() => {
              setCurrentPage(1);
              setSearchForm(item);
            }}
            className="bg-[#393E46] rounded-full px-4 py-0.5 text-white cursor-pointer text-sm"
          >
            {item}
          </span>
        ))}
        {!hideMore && (
          <span
            className="bg-[#393E46] rounded-full px-4 py-0.5 text-white cursor-pointer text-sm"
            onClick={() => {
              setHideMore(true);
              setGenresShowing(45);
            }}
          >
            + More
          </span>
        )}
      </div>
    </div>
  );
};
