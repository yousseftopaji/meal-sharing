import Create from "./components/Create";
import HomePage from "./components/HomePage";
import MealCard from "./components/MealCard";
import MealsList from "./components/MealsList";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div>
        <div className="app">
          <Navbar />
        </div>
        <Routes>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/create">
            <Create />
          </Route>
          <Route exact path="/meals">
            <MealsList />
          </Route>
          <Route path="/meals/:id">
            <MealCard />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
