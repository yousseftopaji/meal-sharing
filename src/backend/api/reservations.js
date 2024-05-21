const express = require("express");
const router = express.Router();
const knex = require("../database");

// GET all reservations
router.get("/", async (req, res) => {
  try {
    const reservations = await knex("Reservation");
    res.json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST a new reservation
router.post("/", async (req, res) => {
  try {
    const addNewReservation = req.body;
    const newReservation = await knex("Reservation").insert(addNewReservation);

    res.status(201).json({ data: newReservation, message: "ok" });
  } catch (error) {
    console.error(error);
    res.status(500).send("something went wrong");
  }
});

// Get the reservation by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const reservationId = await knex
      .select("*")
      .from("Reservation")
      .where({ id });
    if (reservationId) {
      res.json(reservationId);
    }
  } catch (error) {
    console.error(error);
  }
});

// PUT	Updates the reservation by id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      number_of_guests,
      meal_id,
      created_date,
      contact_phonenumber,
      contact_name,
      contact_email,
    } = req.body;
    const updatedReservation = await knex("Reservation")
      .where({ id: id })
      .update({
        number_of_guests,
        meal_id,
        created_date,
        contact_phonenumber,
        contact_name,
        contact_email,
      });
    if (updatedMeal) {
      return res.json(updatedReservation);
    } else {
      return res.send("No updated reservation found.");
    }
  } catch (error) {
    console.error(error);
  }
});

// Delete the reservation by id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReservation = await knex("Reservation")
      .where({ id: id })
      .del();
    if (deletedReservation) {
      return res.json({ message: "Reservation deleted" });
    } else {
      return res.json({ message: "Reservation not found" });
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
