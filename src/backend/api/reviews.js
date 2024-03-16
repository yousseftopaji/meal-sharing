const express = require("express");
const router = express.Router();
const knex = require("../database");

// GET /api/reviews route
router.get("/", async (req, res) => {
  try {
    const reviews = await knex("Review").select("*");
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/meals/:meal_id/reviews route
router.get("/:meal_id/reviews", async (req, res) => {
  try {
    const { meal_id } = req.params;
    const reviews = await knex("Review").where("meal_id", meal_id);
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/reviews route
router.post("/", async (req, res) => {
  try {
    const { title, description, meal_id, stars, created_date } = req.body;
    await knex("Review").insert({
      title,
      description,
      meal_id,
      stars,
      created_date,
    });
    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/reviews/:id route
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const review = await knex("Review").where("id", id).first();
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT /api/reviews/:id route
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, meal_id, stars, created_date } = req.body;
    await knex("Review")
      .where("id", id)
      .update({ title, description, meal_id, stars, created_date });
    res.json({ message: "Review updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /api/reviews/:id route
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await knex("Review").where("id", id).del();
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
