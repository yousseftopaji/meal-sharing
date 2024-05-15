import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "./useFetch";

const MealCard = () => {
  const { id } = useParams();
  const {
    data: meal,
    isLoading,
    hasError: error,
  } = useFetch({
    url: `http://localhost:5000/api/meals/${id}`,
    initialValue: [],
  });
  return (
    <div className="meal-card-container">
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {meal && (
        <div className="meal-card">
          <div
            className="meal-image"
            style={{ backgroundImage: `url(${meal.image_url})` }}
          ></div>
          <div className="meal-details">
            <h2>{meal.title}</h2>
            <h3>{meal.description}</h3>
            <p>{meal.location}</p>
            <p>{meal.price} DKK</p>
            <p>{meal.meal_time}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealCard;
