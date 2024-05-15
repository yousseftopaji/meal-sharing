import Create from "./components/Create";
import HomePage from "./components/HomePage";
import MealCard from "./components/MealCard";
import MealsList from "./components/MealsList";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div>
        <div className="app">
          <Navbar />
        </div>
        <Switch>
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
        </Switch>
      </div>
    </Router>
  );
};

export default App;
