const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");

const mealsRouter = require("./api/meals");
const reservationsRouter = require("./api/reservations");
const reviewsRouter = require("./api/reviews");
const buildPath = path.join(__dirname, "../../dist");
const port = process.env.PORT || 3000;
const cors = require("cors");
const knex = require("./database");

// For week4 no need to look into this!
// Serve the built client html
app.use(express.static(buildPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cors());

router.use("/meals", mealsRouter);
router.use("/reservations", reservationsRouter);
router.use("/reviews", reviewsRouter);
router.get("/", (req, res) => {
  res.send("Youssef");
});

router.get("/my-route", (req, res) => {
  res.send("Hi friend");
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

if (process.env.API_PATH) {
  app.use(process.env.API_PATH, router);
} else {
  throw "API_PATH is not set. Remember to set it in your .env file";
}

// for the frontend. Will first be covered in the react class
app.use("*", (req, res) => {
  res.sendFile(path.join(`${buildPath}/index.html`));
});

module.exports = app;
