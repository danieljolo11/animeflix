import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [recentDataLoading, setRecentDataLoading] = useState(false);
  const [recentAnimeData, setRecentAnimeData] = useState([]);
  const [topAiringData, setTopAiringData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getApiDatas(); // eslint-disable-next-line
  }, []);

  const getApiDatas = useCallback(async () => {
    // API ROUTE
    const recenturl =
      "https://api.consumet.org/anime/gogoanime/recent-episodes";
    const topairurl = "https://api.consumet.org/anime/gogoanime/top-airing";

    // API REQUEST
    const getRecentEpisode = axios.get(recenturl, {
      params: { page: currentPage, type: 1 },
    });
    const getTopAiring = axios.get(topairurl);

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
  }, [currentPage]);

  const memoedValue = useMemo(
    () => ({
      isLoading,
      recentDataLoading,
      recentAnimeData,
      topAiringData,
      currentPage,
      setCurrentPage,
      setRecentDataLoading,
    }),
    [
      isLoading,
      recentDataLoading,
      recentAnimeData,
      topAiringData,
      currentPage,
      setCurrentPage,
      setRecentDataLoading,
    ]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
