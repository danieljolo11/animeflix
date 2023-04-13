import React from "react";
import "./App.css";

// Components
import { AuthProvider } from "./components/AuthProvider";
import Layout from "./components/Layout";

function App() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}

export default App;
