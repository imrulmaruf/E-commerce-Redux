import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectTotalItems } from "../../features/cart/selectors";

export default function Navbar({ darkMode, toggleDarkMode }) {
  const count = useSelector(selectTotalItems);
  const [hide, setHide] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  let lastScroll = 0;

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setHide(current > lastScroll && current > 100);
      setScrolled(current > 50);
      lastScroll = current;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${hide ? "navbar-hide" : ""} ${scrolled ? "navbar-scrolled" : ""} ${darkMode ? "dark" : ""}`}>
        <div className="navbar-container">
          <Link to="/" className="logo">
            <span className="logo-icon">🛍️</span>
            <span className="logo-text">MyShop</span>
          </Link>

          <div className="nav-actions">
            <Link to="/cart" className="cart-link">
              🛒
              {count > 0 && <span className="cart-badge">{count}</span>}
            </Link>
            <button className="theme-toggle" onClick={toggleDarkMode}>
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <div className="mobile-bottom-nav">
        <Link to="/" className="nav-item">
          <span>🏠</span>
          <span>Home</span>
        </Link>
        <Link to="/cart" className="nav-item cart-item">
          <span>🛒</span>
          <span>Cart</span>
          {count > 0 && <span className="cart-badge-mobile">{count}</span>}
        </Link>
        <button className="nav-item theme-mobile" onClick={toggleDarkMode}>
          <span>{darkMode ? "☀️" : "🌙"}</span>
          <span>Theme</span>
        </button>
      </div>
    </>
  );
}
