import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

// Components
import { AuthProvider } from "./components/AuthProvider";
import Layout from "./components/Layout";
import WatchAnime from "./components/WatchAnime";
import GenresDisplay from "./components/GenresDisplay";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/genresresult" element={<GenresDisplay />} />
        <Route path={`/watch`} element={<WatchAnime />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
