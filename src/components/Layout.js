import React from "react";

// Components
import { Navbar } from "./Navbar";
import { ListOfGenre } from "./Genres";
import Anime from "./Anime";
import useAuth from "./AuthProvider";
import { Loader } from "./Loader";

function Layout() {
  const { isLoading } = useAuth();

  return isLoading ? (
    <Loader />
  ) : (
    <div className="min-h-screen bg-[#222831]">
      <Navbar />
      <ListOfGenre />
      <Anime />
    </div>
  );
}

export default Layout;
