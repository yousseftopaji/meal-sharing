import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MealsContext } from "./useContext/MealsContext";

const MealsList = () => {
  const { isLoading, error, data: meals } = useContext(MealsContext);

  return (
    <div className="meals-list-container">
      <h2>Meals List</h2>
      {isLoading && <h3>Loading...</h3>}
      {error && <h3>{error}</h3>}
      {!isLoading && (
        <div className="meals-grid">
          {meals.map((meal) => (
            <div key={meal.id} className="meal-card">
              <Link to={`/meals/${meal.id}`} className="meal-link">
                <h3>{meal.title}</h3>
                <p>Description: {meal.description}</p>
                <p>Price: {meal.price}</p>
                <img
                  src={meal.image_url}
                  alt={meal.title}
                  className="meal-image"
                />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MealsList;
