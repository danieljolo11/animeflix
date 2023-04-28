import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(true);
  const [recentDataLoading, setRecentDataLoading] = useState(false);
  const [recentAnimeData, setRecentAnimeData] = useState([]);
  const [topAiringData, setTopAiringData] = useState([]);
  const [searchSelected, setSearchSelected] = useState([]);

  const [selectedGenre, setSelectedGenre] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSearch, setCurrentPageSearch] = useState(1);

  useEffect(() => {
    getApiDatas(); // eslint-disable-next-line
  }, [currentPage]);

  const getApiDatas = async () => {
    // API ROUTE
    const recenturl = "https://api.consumet.org/meta/anilist/recent-episodes";
    const topairurl = "https://api.consumet.org/meta/anilist/trending";

    // API REQUEST
    const getRecentEpisode = axios.get(recenturl, {
      params: {
        page: currentPage,
        perPage: 20,
        provider: "gogoanime",
      },
    });
    const getTopAiring = axios.get(topairurl, {
      params: {
        page: 1,
        perPage: 10,
      },
    });

    // API GET DATA
    const [recentApiData, topAiringApiData] = await Promise.allSettled([
      getRecentEpisode,
      getTopAiring,
    ]).finally(() => {
      setRecentDataLoading(false);
      setIsLoading(false);
    });

    // API DATA'S
    const { data: recentData, status: recentStatus } = recentApiData.value;
    const { data: topairData, status: topairStatus } = topAiringApiData.value;

    // API STATE
    setRecentAnimeData(recentStatus === 200 ? recentData : []);
    setTopAiringData(topairStatus === 200 ? topairData.results : []);
  };

  useEffect(() => {
    getGenreSelected(); // eslint-disable-next-line
  }, [selectedGenre, selectedYear, selectedSeason, selectedFormat, currentPageSearch]);

  const getGenreSelected = async () => {
    setIsLoading(true);
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
      page: currentPageSearch > 0 ? currentPageSearch : null,
      perPage: 50,
      season: selectedSeason ? selectedSeason.toUpperCase() : null,
      year: selectedYear ? selectedYear : null,
      format: selectedFormat ? replaceFormat.toUpperCase() : null,
      genres: genreData.length > 0 ? `[${genreData}]` : null,
    };

    await axios
      .get(url, { params })
      .then(({ data, status }) => {
        if (status === 200) {
          setSearchSelected(data);
          if (location.pathname === "/genresresult") {
            return null;
          } else {
            if (
              selectedGenre.length > 0 ||
              selectedYear ||
              selectedSeason ||
              selectedFormat
            ) {
              return navigate("/genresresult");
            }
          }
        }
      })
      .finally(() => setIsLoading(false));
  };

  const memoedValue = useMemo(
    () => ({
      isLoading,
      searchSelected,
      setSearchSelected,

      // Anime
      recentAnimeData,
      topAiringData,
      currentPage,
      recentDataLoading,
      setCurrentPage,
      setRecentDataLoading,

      // Genres
      selectedGenre,
      selectedYear,
      selectedSeason,
      selectedFormat,
      currentPageSearch,
      setSelectedGenre,
      setSelectedYear,
      setSelectedSeason,
      setSelectedFormat,
      setCurrentPageSearch,
    }),
    [
      isLoading,
      searchSelected,
      setSearchSelected,

      // Anime
      recentAnimeData,
      topAiringData,
      currentPage,
      recentDataLoading,
      setCurrentPage,
      setRecentDataLoading,

      // Genres
      selectedGenre,
      selectedYear,
      selectedSeason,
      selectedFormat,
      currentPageSearch,
      setSelectedGenre,
      setSelectedYear,
      setSelectedSeason,
      setSelectedFormat,
      setCurrentPageSearch,
    ]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
