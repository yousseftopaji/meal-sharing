import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "./useFetch";
import Reservation from "./Reservation";
import Review from "./Review";
import "./MealCard.css";
import "./Reservation.css";

const MealCard = () => {
  const { id } = useParams();
  const {
    data: meal,
    isLoading,
    hasError: error,
  } = useFetch({
    url: `https://meal-sharing-9mjl.onrender.com/api/meals/${id}`,
    initialValue: {},
  });

  const {
    data: reviewData,
    isLoading: reviewsLoading,
    hasError: reviewsError,
  } = useFetch({
    url: `https://meal-sharing-9mjl.onrender.com/api/reviews/${id}/reviews`,
    initialValue: { reviews: [] },
  });

  const [showReservation, setShowReservation] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [reviewsToShow, setReviewsToShow] = useState(3);

  const toggleReservation = () => {
    setShowReservation(!showReservation);
  };

  const toggleReview = () => {
    setShowReview(!showReview);
  };

  const isReservationAllowed = () => {
    if (!meal) {
      return false;
    }

    const mealTime = new Date(meal.meal_time);
    const currentTime = new Date();

    return mealTime > currentTime && meal.max_reservations > 0;
  };

  const formatMealTime = (mealTime) => {
    const date = new Date(mealTime);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const sortedReviews = reviewData.reviews.sort((a, b) => {
    return new Date(b.created_date) - new Date(a.created_date);
  });

  const loadMoreReviews = () => {
    setReviewsToShow(reviewsToShow + 3);
  };

  return (
    <div
      className="meal-card-container"
      style={{ backgroundImage: `url(${meal.image_url})` }}
    >
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {meal && (
        <div className="meal-card">
          <div className="meal-details">
            <h2>{meal.title}</h2>
            <h3>{meal.description}</h3>
            <p>Location: {meal.location}</p>
            <p>Price: {meal.price} DKK</p>
            <p>Time of the meal: {formatMealTime(meal.meal_time)}</p>
            <p>
              Available seats:
              {isReservationAllowed()
                ? meal.max_reservations
                : `Not anymore :(`}
            </p>
            <div className="button-container">
              {isReservationAllowed() && (
                <React.Fragment>
                  <button onClick={toggleReservation}>Make Reservation?</button>
                  {showReservation && (
                    <Reservation
                      mealId={id}
                      maxGuests={meal.max_reservations}
                    />
                  )}
                </React.Fragment>
              )}

              <div>
                <button onClick={toggleReview}>Rate it?</button>
                {showReview && <Review mealId={id} mealTitle={meal.title} />}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="reviews-display">
        {reviewsLoading && <div>Loading Reviews...</div>}
        {reviewsError && <div>Error loading reviews.</div>}
        {sortedReviews.length > 0 ? (
          sortedReviews.slice(0, reviewsToShow).map((review) => (
            <div key={review.id} className="review">
              <h3>{review.description}</h3>
              <p>{formatMealTime(review.created_date)}</p>
              <p>Rating: {review.stars}</p>
            </div>
          ))
        ) : (
          <div>No reviews available</div>
        )}
        {sortedReviews.length > reviewsToShow && (
          <button onClick={loadMoreReviews}>Load More</button>
        )}
      </div>
    </div>
  );
};

export default MealCard;
