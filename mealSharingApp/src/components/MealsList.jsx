import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import SortControl from "./SortControl";
import { useFetch } from "./useFetch";
import "./MealsList.css";

const truncateDescription = (description) => {
  return description.length > 50
    ? description.substring(0, 50) + "..."
    : description;
};

const MealsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("meal_time");
  const [sortDir, setSortDir] = useState("asc");
  const [displayedCount, setDisplayedCount] = useState(8);

  const {
    data: meals,
    isLoading,
    hasError: error,
  } = useFetch({
    url: "https://meal-sharing-9mjl.onrender.com/api/meals",
    initialValue: [],
  });

  const [filteredMeals, setFilteredMeals] = useState([]);

  useEffect(() => {
    let url = `https://meal-sharing-9mjl.onrender.com/api/meals?sortKey=${sortKey}&sortDir=${sortDir}`;
    if (searchTerm) {
      url += `&title=${searchTerm}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => setFilteredMeals(data))
      .catch((error) => console.error("Error fetching meals:", error));
  }, [searchTerm, sortKey, sortDir]);

  const futureMeals = filteredMeals.filter(
    (meal) => new Date(meal.meal_time) > new Date()
  );
  const pastMeals = filteredMeals.filter(
    (meal) => new Date(meal.meal_time) <= new Date()
  );

  const handleLoadMore = () => {
    setDisplayedCount(displayedCount + 8);
  };

  return (
    <div className="meals-list-container">
      <SearchBar onSearch={setSearchTerm} />
      <SortControl
        sortKey={sortKey}
        sortDir={sortDir}
        onSortKeyChange={setSortKey}
        onSortDirChange={setSortDir}
      />

      <h2>Upcoming Meals</h2>
      {isLoading && <h3>Loading...</h3>}
      {error && <h3>{error}</h3>}
      {!isLoading && futureMeals.length > 0 && (
        <div className="meals-grid">
          {futureMeals.slice(0, displayedCount).map((meal) => (
            <div key={meal.id} className="meal-cards">
              <Link to={`/meals/${meal.id}`} className="meal-link">
                <h3 className="meal-title">{meal.title}</h3>
                <img
                  src={meal.image_url}
                  alt={meal.title}
                  className="meal-images"
                />
                <p className="meal-description">
                  {truncateDescription(meal.description)}
                </p>
                <p>Price: {meal.price}</p>
                <p>Meal Time: {new Date(meal.meal_time).toLocaleString()}</p>
              </Link>
              <Link to={`/meals/${meal.id}`}>
                <button>See more!</button>
              </Link>
            </div>
          ))}
          {displayedCount < futureMeals.length && (
            <button onClick={handleLoadMore} className="loadMore">
              Load More
            </button>
          )}
        </div>
      )}
      {!isLoading && futureMeals.length === 0 && (
        <h3>No upcoming meals found</h3>
      )}

      <h2>Past Meals</h2>
      {!isLoading && pastMeals.length > 0 && (
        <div className="meals-grid">
          {pastMeals.slice(0, displayedCount).map((meal) => (
            <div key={meal.id} className="meal-cards">
              <Link to={`/meals/${meal.id}`} className="meal-link">
                <h3 className="meal-title">{meal.title}</h3>
                <img
                  src={meal.image_url}
                  alt={meal.title}
                  className="meal-images"
                />
                <p className="meal-description">
                  {truncateDescription(meal.description)}
                </p>
                <p>Price: {meal.price}</p>
                <p>Meal Time: {new Date(meal.meal_time).toLocaleString()}</p>
              </Link>
            </div>
          ))}
          {displayedCount < pastMeals.length && (
            <button onClick={handleLoadMore}>Load More</button>
          )}
        </div>
      )}
      {!isLoading && pastMeals.length === 0 && <h3>No past meals found</h3>}
    </div>
  );
};

export default MealsList;
