import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import "./Navbar.css";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check login status
  const checkLoginStatus = () => {
    const userData = localStorage.getItem("user");
    try {
      const parsedUser = JSON.parse(userData);
      if (parsedUser?.message === "Login successful") {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (err) {
      setIsLoggedIn(false);
    }
  };

  // Run on mount and listen for storage changes
  useEffect(() => {
    checkLoginStatus();

    // Listen for storage changes (e.g., login/logout in another tab)
    const handleStorageChange = () => {
      checkLoginStatus();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      // Call backend logout API
      await axios.post(
        "https://f5d5-122-166-70-72.ngrok-free.app/client/logout",
        {},
        { withCredentials: true }
      );

      // Clear localStorage
      localStorage.removeItem("user");

      // Navigate to home page with full reload
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
      // Clear localStorage and navigate even if API fails
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
  };

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;

      if (location.pathname === "/") {
        setIsScrolled(scrollPosition > viewportHeight);
      } else {
        setIsScrolled(true);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <nav className={`navBar ${isScrolled ? "scrolled" : ""}`}>
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

      <div className="navItems">
        <div className="nav-content">
          <ul>
            <Link to="/">
              <li className={`menu-item ${location.pathname === "/" ? "active" : ""}`}>
                Home
              </li>
            </Link>
            <Link to="/Education">
              <li>
                <p className={`menu-item ${location.pathname === "/Education" ? "active" : ""}`}>
                  Entertainment
                </p>
              </li>
            </Link>
            <Link to="/Projects">
              <li>
                <p className={`menu-item ${location.pathname === "/Projects" ? "active" : ""}`}>
                  Shopping
                </p>
              </li>
            </Link>
            <Link to="/Hotels">
              <li>
                <p className={`menu-item ${location.pathname === "/Hotels" ? "active" : ""}`}>
                  Hotels
                </p>
              </li>
            </Link>
            <Link to="/Contact Me">
              <li>
                <p className={`menu-item ${location.pathname === "/Contact Me" ? "active" : ""}`}>
                  Pay Bills
                </p>
              </li>
            </Link>
          </ul>
        </div>
      </div>

      {isLoggedIn ? (
        <div className="profile-actions">
          <button onClick={() => navigate("/Profile")} className="profile-btn">
            Profile
          </button>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      ) : (
        <div className="profile">
          <Link to="/Register">
            <p className="login-btn">Sign Up</p>
          </Link>
          <Link to="/login">
            <button className="signup-btn">Login</button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;