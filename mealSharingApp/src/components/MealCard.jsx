import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "./useFetch";
import Reservation from "./Reservation";

const MealCard = () => {
  const { id } = useParams();
  const {
    data: meal,
    isLoading,
    hasError: error,
  } = useFetch({
    url: `http://localhost:5000/api/meals/${id}`,
    initialValue: [],
  });

  const [showReservation, setShowReservation] = useState(false);

  const toggleReservation = () => {
    setShowReservation(!showReservation);
  };

  // Function to check if reservation is allowed
  const isReservationAllowed = () => {
    return meal && meal.max_reservations > 0;
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
            <p>{meal.meal_time}</p>
            <p>available seats: {meal.max_reservations}</p>
            {isReservationAllowed() && (
              <React.Fragment>
                <button onClick={toggleReservation}>Make Reservation</button>
                {showReservation && (
                  <Reservation mealId={id} maxGuests={meal.max_reservations} />
                )}
              </React.Fragment>
            )}
            {!isReservationAllowed() && (
              <p>Reservations are not available for this meal.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MealCard;
