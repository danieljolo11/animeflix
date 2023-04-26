import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { Combobox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, CheckCircleIcon } from "@heroicons/react/20/solid";

export const ListOfGenre = () => {
  const genres = [
    "Action",
    "Adventure",
    "Cars",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Mahou Shoujo",
    "Mecha",
    "Music",
    "Mystery",
    "Psychological",
    "Romance",
    "Sci-Fi",
    "Slice of Life",
    "Sports",
    "Supernatural",
    "Thriller",
  ];
  const seasons = ["winter", "spring", "summer", "fall"];
  const formats = [
    "TV show",
    "movie",
    "TV short",
    "OVA",
    "ONA",
    "special",
    "music",
  ];

  const [selectedGenre, setSelectedGenre] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");

  const filteredGenres =
    query === ""
      ? genres
      : genres.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  useEffect(() => {
    getGenreSelected(); // eslint-disable-next-line
  }, [selectedGenre, selectedYear, selectedSeason, selectedFormat]);

  const getYears = () => {
    const year = new Date().getFullYear();
    return Array.from(new Array(84), (val, index) => year - index);
  };

  const getGenreSelected = async () => {
    let genreData = [];
    let replaceFormat = "";
    const sortedGenre = selectedGenre.sort();
    sortedGenre.map((item) => {
      return genreData.push(`"${item}"`);
    });

    if (selectedFormat === "TV show") {
      replaceFormat = selectedFormat.replace(" show", "");
    } else if (selectedFormat === "TV short") {
      replaceFormat = selectedFormat.replace(" ", "_");
    } else {
      replaceFormat = selectedFormat;
    }

    const url = `https://api.consumet.org/meta/anilist/advanced-search`;
    const params = {
      page: 1,
      perPage: 20,
      season: selectedSeason ? selectedSeason.toUpperCase() : null,
      year: selectedYear ? selectedYear : null,
      type: "ANIME",
      format: selectedFormat ? replaceFormat.toUpperCase() : null,
      genres: genreData.length > 0 ? `[${genreData}]` : null,
    };

    await axios.get(url, { params }).then(({ data, status }) => {
      if (status === 200) {
        console.log("result: ", data);
      }
    });
  };

  const renderGenreSelection = () => {
    return (
      <div className="">
        <div className="max-w-[15rem]">
          <Combobox value={selectedGenre} onChange={setSelectedGenre} multiple>
            <div className="relative mt-1">
              <div className="relative w-full cursor-default">
                <Combobox.Input
                  className="w-full border-none py-2 pl-3 pr-10 text-xs leading-5 text-gray-900 rounded-lg focus:outline-none capitalize"
                  displayValue={(genres) =>
                    genres.map((item) => item).join(", ")
                  }
                  placeholder="Genres"
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery("")}
              >
                <Combobox.Options className="absolute mt-1 z-50 overflow-y-scroll scrollbar max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredGenres.length === 0 && query !== "" ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    filteredGenres.map((item) => (
                      <Combobox.Option
                        key={item}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? "bg-[#00ADB5] text-white" : "text-gray-900"
                          }`
                        }
                        value={item}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {item}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? "text-white" : "text-[#00ADB5]"
                                }`}
                              >
                                <CheckCircleIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        </div>
      </div>
    );
  };

  const renderYearSelection = () => {
    const years = getYears();

    return (
      <div className="">
        <div className="max-w-[15rem]">
          <Combobox value={selectedYear} onChange={setSelectedYear}>
            <div className="relative mt-1">
              <div className="relative w-full cursor-default">
                <Combobox.Input
                  className="w-full border-none py-2 pl-3 pr-10 text-xs leading-5 text-gray-900 rounded-lg focus:outline-none"
                  displayValue={(year) => year}
                  placeholder="Year"
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Combobox.Options className="absolute mt-1 z-50 overflow-y-scroll scrollbar max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {years.length === 0 && query !== "" ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    years.map((year) => (
                      <Combobox.Option
                        key={year}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? "bg-[#00ADB5] text-white" : "text-gray-900"
                          }`
                        }
                        value={year}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {year}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? "text-white" : "text-[#00ADB5]"
                                }`}
                              >
                                <CheckCircleIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        </div>
      </div>
    );
  };

  const renderSeasonSelection = () => {
    return (
      <div className="">
        <div className="max-w-[15rem]">
          <Combobox value={selectedSeason} onChange={setSelectedSeason}>
            <div className="relative mt-1">
              <div className="relative w-full cursor-default">
                <Combobox.Input
                  className="w-full border-none py-2 pl-3 pr-10 text-xs leading-5 text-gray-900 rounded-lg focus:outline-none capitalize"
                  displayValue={(season) => season}
                  placeholder="Season"
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Combobox.Options className="absolute mt-1 z-50 overflow-y-scroll scrollbar max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {seasons.length === 0 && query !== "" ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    seasons.map((season) => (
                      <Combobox.Option
                        key={season}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? "bg-[#00ADB5] text-white"
                              : "text-gray-900 capitalize"
                          }`
                        }
                        value={season}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate capitalize ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {season}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active
                                    ? "text-white"
                                    : "text-[#00ADB5] capitalize"
                                }`}
                              >
                                <CheckCircleIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        </div>
      </div>
    );
  };

  const renderFormatSelection = () => {
    return (
      <div className="">
        <div className="max-w-[15rem]">
          <Combobox value={selectedFormat} onChange={setSelectedFormat}>
            <div className="relative mt-1">
              <div className="relative w-full cursor-default">
                <Combobox.Input
                  className="w-full border-none py-2 pl-3 pr-10 text-xs leading-5 text-gray-900 rounded-lg focus:outline-none capitalize"
                  displayValue={(format) => format}
                  placeholder="Format"
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Combobox.Options className="absolute mt-1 z-50 overflow-y-scroll scrollbar max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {formats.length === 0 && query !== "" ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    formats.map((format) => (
                      <Combobox.Option
                        key={format}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 capitalize ${
                            active ? "bg-[#00ADB5] text-white" : "text-gray-900"
                          }`
                        }
                        value={format}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate capitalize ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {format}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 capitalize ${
                                  active ? "text-white" : "text-[#00ADB5]"
                                }`}
                              >
                                <CheckCircleIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-row gap-4 p-4">
      {renderGenreSelection()}
      {renderYearSelection()}
      {renderSeasonSelection()}
      {renderFormatSelection()}
    </div>
  );
};
