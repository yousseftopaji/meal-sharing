import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to={"/"}>
        <h1>Meal sharing app</h1>
      </Link>
      <div className="links">
        <Link to="/">Home </Link>
        <Link to="/create">New Meal </Link>
        <Link to="/meals">All meals </Link>
      </div>
    </nav>
  );
};

export default Navbar;
