import React from "react";

// Components
import { Navbar } from "./Navbar";
import { ListOfGenre } from "./Genres";
import Anime from "./Anime";
import useAuth from "./AuthProvider";

function Layout() {
  const { isLoading } = useAuth();

  const Loader = (
    <div className="min-h-screen flex justify-center items-center bg-[#222831]">
      <div className="pyramid-loader">
        <div className="wrapper">
          <span className="side side1"></span>
          <span className="side side2"></span>
          <span className="side side3"></span>
          <span className="side side4"></span>
          <span className="shadow"></span>
        </div>
      </div>
    </div>
  );

  return isLoading ? (
    Loader
  ) : (
    <div className="min-h-screen bg-[#222831]">
      <Navbar />
      <ListOfGenre />
      <Anime />
    </div>
  );
}

export default Layout;
