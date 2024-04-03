import React, { useState, useEffect } from "react";
import api_URL from "./components/api_URL";

const MealsList = () => {
  const [meals, setMeals] = useState([]);

  const fetchMeals = async () => {
    try {
      const response = await fetch(api_URL("/api/meals"));
      if (!response.ok) {
        throw new Error("Failed to fetch meals");
      }
      const data = await response.json();
      setMeals(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  return (
    <div>
      <h2>Meals List</h2>
      {meals.map((meal) => (
        <div key={meal.id}>
          <h3>{meal.title}</h3>
          <p>Description: {meal.description}</p>
          <p>Price: {meal.price}</p>
        </div>
      ))}
    </div>
  );
};

export default MealsList;
