import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "./useFetch";

const HomePage = () => {
  const {
    data: meals,
    isLoading,
    hasError: error,
  } = useFetch({ url: "http://localhost:5000/api/meals", initialValue: [] });

  const [randomMeals, setRandomMeals] = useState([]);

  useEffect(() => {
    if (!isLoading && !error && meals.length > 0) {
      // Shuffle the meals array
      const shuffledMeals = meals.sort(() => Math.random() - 0.5);
      // Get the first 3 shuffled meals
      const selectedMeals = shuffledMeals.slice(0, 3);
      setRandomMeals(selectedMeals);
    }
  }, [isLoading, error, meals]);

  return (
    <div>
      <div className="content">
        <h2>Featured Meals</h2>
        {isLoading && <h3>Loading...</h3>}
        {error && <h3>{error}</h3>}
        {!isLoading && randomMeals.length > 0 && (
          <div className="meals-grid">
            {/* Render the selected random meals */}
            {randomMeals.map((meal) => (
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
        <Link to={"/meals"}>
          <button>View All Meals</button>
        </Link>
        <Link to={"/create"}>
          <button>Share Your Meal</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
