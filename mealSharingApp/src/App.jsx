import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Create from "./components/Create";
import HomePage from "./components/HomePage";
import MealCard from "./components/MealCard";
import MealsList from "./components/MealsList";
import Navbar from "./components/Navbar";
import "./index.css";
import "./components/Navbar.css";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<Create />} />
          <Route path="/meals" element={<MealsList />} />
          <Route path="/meals/:id" element={<MealCard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
