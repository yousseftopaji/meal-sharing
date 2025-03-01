import React, { useState } from "react";
import "./Reservation.css";

const Reservation = ({ mealId, maxGuests }) => {
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhoneNumber, setContactPhoneNumber] = useState("");

  const handleGuestsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > maxGuests) {
      alert(`Available reservations cannot exceed ${maxGuests} :(`);
      setNumberOfGuests(maxGuests);
    } else {
      setNumberOfGuests(value);
    }
  };

  const handleReservation = async () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];

    const reservationData = {
      number_of_guests: numberOfGuests,
      meal_id: mealId,
      created_date: formattedDate,
      contact_name: contactName,
      contact_email: contactEmail,
      contact_phonenumber: contactPhoneNumber,
    };

    try {
      const response = await fetch(
        "https://meal-sharing-9mjl.onrender.com/api/reservations/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reservationData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to make reservation");
      }

      if (response.status === 200 || response.status === 201) {
        alert("Reservation made successfully");
        window.location.href = `https://meal-sharing-1-tqul.onrender.com/meals/${mealId}`;
      }
    } catch (error) {
      console.error("Error making reservation:", error.message);
      alert(`Error making reservation: ${error.message}`);
    }
  };

  return (
    <div className="form-container">
      <h2>Make a Reservation</h2>
      <label>Number of Guests:</label>
      <input
        type="number"
        value={numberOfGuests}
        onChange={handleGuestsChange}
        min={1}
        max={maxGuests}
        required
      />
      <label>Contact Name:</label>
      <input
        type="text"
        value={contactName}
        onChange={(e) => setContactName(e.target.value)}
        required
      />
      <label>Contact Email:</label>
      <input
        type="email"
        value={contactEmail}
        onChange={(e) => setContactEmail(e.target.value)}
        required
      />
      <label>Contact Phone Number:</label>
      <input
        type="tel"
        value={contactPhoneNumber}
        onChange={(e) => setContactPhoneNumber(e.target.value)}
        required
      />
      <button onClick={handleReservation}>Submit Reservation</button>
    </div>
  );
};

export default Reservation;
