import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "./useFetch";
import Reservation from "./Reservation";
import Review from "./Review";

const MealCard = () => {
  const { id } = useParams();
  const {
    data: meal,
    isLoading,
    hasError: error,
  } = useFetch({
    url: `https://meal-sharing-9mjl.onrender.com/api/meals/${id}`,
    initialValue: [],
  });

  const [showReservation, setShowReservation] = useState(false);
  const [showReview, setShowReview] = useState(false);

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
            <p>{formatMealTime(meal.meal_time)}</p>
            <p>
              available seats:
              {isReservationAllowed()
                ? meal.max_reservations
                : `Not anymore :(`}
            </p>

            {isReservationAllowed() && (
              <React.Fragment>
                <button onClick={toggleReservation}>Make Reservation?</button>
                {showReservation && (
                  <Reservation mealId={id} maxGuests={meal.max_reservations} />
                )}
              </React.Fragment>
            )}

            <div>
              <button onClick={toggleReview}>Rate it?</button>
              {showReview && <Review mealId={id} mealTitle={meal.title} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealCard;
