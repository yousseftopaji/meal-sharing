import { useEffect, useState } from "react";
import api_URL from "./api_URL";

export default function MealsList() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading === true) {
    console.log(isLoading);
  } else {
    console.log(isLoading, "Not any more!");
  }
  const fetchMeals = async () => {
    try {
      const response = await fetch(api_URL("/api/meals"));
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to fetch meals");
      }
      const data = await response.json();
      setMeals(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMeals(), 1000;
  }, []);

  return (
    <div>
      <h2>Meals List</h2>
      {isLoading && <h3>Loading...</h3>}
      {!isLoading &&
        meals.map((meal) => (
          <div key={meal.id}>
            <h3>{meal.title}</h3>
            <p>Description: {meal.description}</p>
            <p>Price: {meal.price}</p>
          </div>
        ))}
    </div>
  );
}
