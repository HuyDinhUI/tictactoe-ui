import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import DefaultLayout from "./components/Layouts/DefaultLayout/DefaultLayout";
import Home from "./pages/Home/index";
import Play from "./pages/Play";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <DefaultLayout>
                <Home />
              </DefaultLayout>
            }
          />
          <Route
            path="/play/mode"
            element={
              <DefaultLayout>
                <Play />
              </DefaultLayout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
