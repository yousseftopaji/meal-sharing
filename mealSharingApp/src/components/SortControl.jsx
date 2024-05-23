import React from "react";

const SortControl = ({
  sortKey,
  sortDir,
  onSortKeyChange,
  onSortDirChange,
}) => {
  return (
    <div className="sort-controls">
      <label>
        Sort by:
        <select
          value={sortKey}
          onChange={(e) => onSortKeyChange(e.target.value)}
        >
          <option value="meal_time">Date</option>
          <option value="title">Title</option>
          <option value="price">Price</option>
        </select>
      </label>
      <label>
        Direction:
        <select
          value={sortDir}
          onChange={(e) => onSortDirChange(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>
    </div>
  );
};

export default SortControl;
