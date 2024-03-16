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

// GET a reservation by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const reservation = await knex("Reservation").where("id", id).first();
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    res.json(reservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST a new reservation
router.post("/", async (req, res) => {
  const newReservation = req.body;
  try {
    await knex("Reservation").insert(newReservation);
    res.status(201).json({ message: "Reservation created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT update a reservation by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedReservation = req.body;
  try {
    await knex("Reservation").where("id", id).update(updatedReservation);
    res.json({ message: "Reservation updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE a reservation by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await knex("Reservation").where("id", id).del();
    res.json({ message: "Reservation deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
