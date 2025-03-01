import React, { useState, useEffect } from "react";

export const MealsContext = React.createContext();
let url = "http://localhost:5000/api/meals";

export const MealsProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const mealsData = await response.json();
      setData(mealsData);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return (
    <MealsContext.Provider
      value={{ data, setData, error, setError, isLoading, setIsLoading }}
    >
      {children}
    </MealsContext.Provider>
  );
};
