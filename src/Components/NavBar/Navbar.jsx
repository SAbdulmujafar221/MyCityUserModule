import { Link , useLocation } from "react-router";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./Navbar.css";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const location = useLocation();

  return (
    <nav className="navBar">
      <div className="logo-search">
        <h1 className="navbar-logo">LOGO</h1>

        <div
          className="search-wrapper"
          onMouseEnter={() => setIsFocused(true)}
          onMouseLeave={() => setIsFocused(false)}
        >
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            className={`search-input ${isFocused ? "expanded" : ""}`}
          />
        </div>
      </div>

      {/* Navigation Items */}
      <div className={`navItems ${menuOpen ? "open" : ""}`}>
        <div className="nav-content">
          <ul>
            <Link to="/">
              <li className={`menu-item ${location.pathname === "/" ? "active" : ""}`}>Home</li>
            </Link>

            {/* <Link to="/">
              <li>
                <p className="menu-item">Tourism</p>
              </li>
            </Link> */}
            <Link to="/Education">
              <li>
                <p className={`menu-item ${location.pathname === "/Education" ? "active" : ""}`}>Entertainment</p>
              </li>
            </Link>
            <Link to="/Projects">
              <li>
                <p className={`menu-item ${location.pathname === "/Projects" ? "active" : ""}`}>Shopping</p>
              </li>
            </Link>
            <Link to="/Hotels">
              <li>
                <p className={`menu-item ${location.pathname === "/Hotels" ? "active" : ""}`}>Hotels</p>
              </li>
            </Link>
            <Link to="/Contact Me">
              <li>
                <p className={`menu-item ${location.pathname === "/Contact Me" ? "active" : ""}`}>Pay Bills</p>
              </li>
            </Link>
          </ul>
        </div>
      </div>

      <div className="profile">
        <Link to="/register">
          <button className="login-btn">Sign Up</button>
        </Link>
        <Link to="/Login">
          <button className="signup-btn">LogIn</button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
