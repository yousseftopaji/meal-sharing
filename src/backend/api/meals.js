const express = require("express");
const router = express.Router();
const knex = require("../database");

// router.get("/", async (req, res) => {
//   try {
//     const allMeals = await knex("Meal");
//     res.send(allMeals);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

router.get("/", async (request, response) => {
  try {
    // Start with the base query
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

module.exports = router;
