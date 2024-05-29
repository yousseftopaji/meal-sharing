import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage">
      <Link to="/create">
        <button>Share Your Meal</button>
      </Link>
      <Link to="/meals">
        <button>View All Meals</button>
      </Link>
    </div>
  );
};

export default HomePage;
