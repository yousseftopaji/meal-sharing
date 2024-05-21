import React, { useState } from "react";

const Reservation = ({ mealId, maxGuests }) => {
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [contactName, setContactName] = useState("Name");
  const [contactEmail, setContactEmail] = useState("Name@email.com");
  const [contactPhoneNumber, setContactPhoneNumber] = useState("12312312");

  const handleGuestsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > maxGuests) {
      alert(`Available reservations cannot exeed ${maxGuests} :(`);
      setNumberOfGuests(maxGuests);
    } else {
      setNumberOfGuests(value);
    }
  };

  const handleReservation = async () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    const reservationData = {
      number_of_guests: numberOfGuests,
      meal_id: mealId,
      created_date: formattedDate,
      contact_name: contactName,
      contact_email: contactEmail,
      contact_phonenumber: contactPhoneNumber,
    };

    try {
      const response = await fetch("http://localhost:5000/api/reservations/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) {
        throw new Error("Failed to make reservation");
      }
      if (response.status === 200 || response.status === 201) {
        alert("Reservation made successfully");
        window.location.href = `http://localhost:5173/meals/${mealId}`;
      }
    } catch (error) {
      console.error("Error making reservation:", error.message);
      alert(`Error making reservation: ${error.message}`);
    }
  };

  return (
    <div>
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
