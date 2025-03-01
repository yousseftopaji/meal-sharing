import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.svg";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to={"/"}>
        <div className="logo-container">
          <img src={logo} alt="Meal Sharing App Logo" className="logo" />
        </div>
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
