import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if admin is logged in
    const loggedIn = localStorage.getItem('healthngo_admin_logged_in') === 'true';
    setIsAdmin(loggedIn);
    setIsOpen(false); // Close menu on page change
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('healthngo_admin_logged_in');
    setIsAdmin(false);
    navigate('/');
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isOpen ? 'menu-open' : ''}`}>
      <div className="navbar-inner">
        <Link to="/" className="brand">
          <span className="brand-icon">⚕️</span>
          <div>
            <div className="brand-name">Arogya Care</div>
            <div className="brand-tagline">Caring Beyond Boundaries</div>
          </div>
        </Link>

        {/* Hamburger Menu Icon */}
        <button 
          className={`hamburger ${isOpen ? 'open' : ''}`} 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Navigation Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Nav Links */}
        <div className={`nav-links ${isOpen ? 'nav-open' : ''}`}>
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            About
          </NavLink>
          <NavLink to="/patient-support" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Patient Support
          </NavLink>
          <NavLink to="/volunteer" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Volunteer
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Contact
          </NavLink>
          {isAdmin ? (
            <>
              <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? 'nav-link active nav-admin' : 'nav-link nav-admin'}>
                Dashboard ⚙️
              </NavLink>
              <button onClick={handleLogout} className="nav-link" style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer' }}>
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/admin/login" className={({ isActive }) => isActive ? 'nav-link active nav-admin' : 'nav-link nav-admin'}>
              Admin Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}
