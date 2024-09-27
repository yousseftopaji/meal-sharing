import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { MealsContext } from "./useContext/MealsContext";

const MealCard = () => {
  const { id } = useParams();
  const {
    isLoading,
    setIsLoading,
    error,
    setError,
    setData: setMeal,
    data: meal,
  } = useContext(MealsContext);

  useEffect(() => {
    const fetchMeal = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/meals/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch meal");
        }
        const mealData = await response.json();
        setMeal(mealData);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch meal");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeal();
  }, [id]);

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {meal && (
        <div>
          <h2>{meal.title}</h2>
          <h3>{meal.description}</h3>
          <p>{meal.location}</p>
          <p>{meal.price} DKK</p>
          <img src={meal.image_url} alt={meal.title} />
        </div>
      )}
    </div>
  );
};

export default MealCard;
