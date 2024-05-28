import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import "./Review.css";

export default function Review({ mealId, mealTitle }) {
  const [description, setDescription] = useState("");
  const [stars, setStars] = useState(1);
  const [hover, setHover] = useState(null);
  const [averageRating, setAverageRating] = useState(0);

  const fetchAverageRating = async () => {
    try {
      const response = await fetch(
        `https://meal-sharing-9mjl.onrender.com/api/reviews/${mealId}/reviews`
      );
      const data = await response.json();
      setAverageRating(data.averageRating);
    } catch (error) {
      console.error("Error fetching average rating:", error);
    }
  };
  useEffect(() => {
    fetchAverageRating();
  }, [mealId]);

  const handleReviewSubmission = async () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    const reviewData = {
      title: mealTitle,
      description,
      meal_id: mealId,
      stars,
      created_date: formattedDate,
    };

    try {
      const response = await fetch(
        "https://meal-sharing-9mjl.onrender.com/api/reviews",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reviewData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      if (response.status === 201) {
        alert("Review submitted successfully");
        setDescription("");
        setStars(1);
        fetchAverageRating();
        window.location.href = `http://localhost:5173/meals/${mealId}`;
      }
    } catch (error) {
      console.error(error);
      alert(`Error submitting review: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Leave a Review</h2>
      <div>What do you think?</div>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <div>
        {Array(5)
          .fill(null)
          .map((_, index) => {
            const ratingValue = index + 1;
            return (
              <label key={`star-${mealId}-${ratingValue}`}>
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onChange={() => setStars(ratingValue)}
                />
                <FaStar
                  size={50}
                  color={
                    ratingValue <= (hover || stars) ? "#ffc107" : "#737680"
                  }
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                  className="star"
                />
              </label>
            );
          })}
        <p>Your rating is {stars}</p>
      </div>

      <button onClick={handleReviewSubmission}>Submit Review</button>
      <h3>Average Rating: {averageRating}</h3>
    </div>
  );
}
