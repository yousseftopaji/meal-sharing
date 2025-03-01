const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
  try {
    let mealsQuery = knex("Meal");

    const {
      maxPrice,
      availableReservations,
      title,
      dateAfter,
      dateBefore,
      limit,
      sortKey,
      sortDir,
    } = request.query;

    if (maxPrice) {
      mealsQuery = mealsQuery.where("price", "<=", maxPrice);
    }

    if (availableReservations === "true") {
      mealsQuery = mealsQuery.whereRaw(
        "max_reservations > (SELECT IFNULL(SUM(number_of_guests), 0) FROM Reservation WHERE meal_id = Meal.id)"
      );
    } else if (availableReservations === "false") {
      mealsQuery = mealsQuery.whereRaw(
        "max_reservations <= (SELECT IFNULL(SUM(number_of_guests), 0) FROM Reservation WHERE meal_id = Meal.id)"
      );
    }

    if (title) {
      mealsQuery = mealsQuery.where("title", "like", `%${title}%`);
    }

    if (dateAfter) {
      mealsQuery = mealsQuery.where("meal_time", ">", dateAfter);
    }

    if (dateBefore) {
      mealsQuery = mealsQuery.where("meal_time", "<", dateBefore);
    }

    if (sortKey) {
      mealsQuery = mealsQuery.orderBy(sortKey, sortDir || "asc");
    }

    if (limit) {
      mealsQuery = mealsQuery.limit(limit);
    }

    const meals = await mealsQuery;
    response.json(meals);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const mealById = await knex("Meal").where("id", id).first();
    res.json(mealById);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      location,
      price,
      max_reservations,
      image_url,
      meal_time,
      created_date,
    } = req.body;

    await knex("Meal").where({ id }).update({
      title,
      description,
      location,
      price,
      max_reservations,
      image_url,
      meal_time,
      created_date,
    });

    // Fetch the updated meal
    const updatedMeal = await knex("Meal").where("id", id).first();

    res.json(updatedMeal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// It is necessary to make adjust the post function, the id must depend on .length
router.post("/", async (req, res) => {
  const newMeal = req.body;
  try {
    await knex("Meal").insert(newMeal);
    res.status(201).json({ message: "A new meal added", meal: newMeal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await knex("Meal").where("id", id).del();
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/future-meals", async (req, res) => {
  try {
    const futureMeals = await knex("Meal").where("meal_time", ">", new Date());
    res.json(futureMeals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/past-meals", async (req, res) => {
  try {
    const pastMeals = await knex("Meal").where("meal_time", "<", new Date());
    res.json(pastMeals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/all-meals", async (req, res) => {
  try {
    const allMeals = await knex("Meal");
    res.send(allMeals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/first-meal", async (req, res) => {
  try {
    const firstMeal = await knex("Meal").orderBy("id").first();
    res.json(firstMeal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/last-meal", async (req, res) => {
  try {
    const lastMeal = await knex("Meal").orderBy("id", "desc").first();
    res.json(lastMeal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
