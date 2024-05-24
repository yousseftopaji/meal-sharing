import React, { useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

export default function Create() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [maxReservation, setMaxReservation] = useState("");
  const [mealTime, setMealTime] = useState(new Date());
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    const formattedMealTime = format(mealTime, "yyyy-MM-dd HH:mm:ss");

    const newMeal = {
      title,
      description,
      location,
      price,
      max_reservations: maxReservation,
      image_url: image,
      meal_time: formattedMealTime,
      created_date: formattedDate,
    };

    try {
      const response = await fetch("http://localhost:5000/api/meals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMeal),
      });

      if (!response.ok) {
        throw new Error("Failed to create a new meal");
      }

      if (response.status === 201 || response.status === 200) {
        alert("A new meal has been added successfully");
        setDescription("");
        window.location.href = `http://localhost:5173/meals/`;
      }
    } catch (error) {
      console.error(error);
      alert(`Error submitting review: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>You can add the meal that you wish to share it!</h1>
      <form onSubmit={handleSubmit}>
        <label>Meal Title</label>
        <input
          type="text"
          placeholder="Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Description</label>
        <textarea
          placeholder="More info about the meal"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label>Location:</label>
        <input
          placeholder="Location"
          type="text"
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <label>Price:</label>
        <input
          placeholder="Price in DKK"
          type="number"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label>Max Reservation</label>
        <input
          placeholder="Max reservation"
          type="number"
          required
          value={maxReservation}
          onChange={(e) => setMaxReservation(e.target.value)}
        />
        <label>Meal Time</label>
        <DatePicker
          selected={mealTime}
          onChange={(date) => setMealTime(date)}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
        />
        <label>Image</label>
        <input
          placeholder="Image URL"
          type="text"
          required
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button>Add Meal</button>
      </form>
      <Link to={"/meals"}>
        <button>View All Meals</button>
      </Link>
    </div>
  );
}
