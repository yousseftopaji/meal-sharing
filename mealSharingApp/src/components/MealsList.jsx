import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "./useFetch";

const MealsList = () => {
  const {
    data: meals,
    isLoading,
    hasError: error,
  } = useFetch({ url: "http://localhost:5000/api/meals", initialValue: [] });

  const [showAllMeals, setShowAllMeals] = useState(false);
  const displayedMeals = showAllMeals ? meals : meals.slice(0, 6);

  return (
    <div className="meals-list-container">
      <h2>Meals List</h2>
      {isLoading && <h3>Loading...</h3>}
      {error && <h3>{error}</h3>}
      {!isLoading && (
        <div className="meals-grid">
          {displayedMeals.map((meal) => (
            <div key={meal.id} className="meal-cards">
              <Link to={`/meals/${meal.id}`} className="meal-link">
                <h3 className="meal-title">{meal.title}</h3>
                <img
                  src={meal.image_url}
                  alt={meal.title}
                  className="meal-images"
                />
                <p>Description: {meal.description}</p>
                <p>Price: {meal.price}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
      {meals.length > 6 && (
        <button onClick={() => setShowAllMeals(!showAllMeals)}>
          {showAllMeals ? "Show Less" : "Show All"}
        </button>
      )}
    </div>
  );
};

export default MealsList;
