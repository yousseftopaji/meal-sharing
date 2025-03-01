import React from "react";
import "./MealsList.css";

const SortControl = ({
  sortKey,
  sortDir,
  onSortKeyChange,
  onSortDirChange,
}) => {
  const handleSortKeyChange = (e) => {
    onSortKeyChange(e.target.value);
  };

  const handleSortDirChange = (e) => {
    onSortDirChange(e.target.value);
  };

  return (
    <div className="sort-control">
      <select
        value={sortKey}
        onChange={handleSortKeyChange}
        className="sort-select"
      >
        <option value="meal_time">Meal Time</option>
        <option value="price">Price</option>
        <option value="title">Title</option>
      </select>
      <select
        value={sortDir}
        onChange={handleSortDirChange}
        className="sort-select"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default SortControl;
