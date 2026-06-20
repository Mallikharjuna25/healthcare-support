import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Footer Top Grid */}
        <div className="footer-top">
          {/* Column 1: Brand Info */}
          <div>
            <div className="footer-brand">
              <span style={{ fontSize: '1.25rem' }}>⚕️</span> Arogya Care
            </div>
            <p className="footer-desc">
              Empowering lives through accessible healthcare and dedicated volunteer support. Join us in making a healthy future possible for everyone.
            </p>
          </div>
          
          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link to="/" className="footer-link">Home</Link>
              </li>
              <li>
                <Link to="/about" className="footer-link">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Portals */}
          <div>
            <h4 className="footer-col-title">Registration</h4>
            <ul className="footer-links">
              <li>
                <Link to="/patient-support" className="footer-link">🏥 Support Request</Link>
              </li>
              <li>
                <Link to="/volunteer" className="footer-link">🤝 Volunteer Portal</Link>
              </li>
              <li>
                <Link to="/admin/login" className="footer-link">⚙️ Admin Console</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Helpline */}
          <div>
            <h4 className="footer-col-title">Emergency Help</h4>
            <ul className="footer-links">
              <li className="footer-link" style={{ cursor: 'default' }}>
                📱 Helpline: 1800-123-4567
              </li>
              <li className="footer-link" style={{ cursor: 'default' }}>
                🚨 Critical: +91-98765-43210
              </li>
              <li className="footer-link">
                📧 <a href="mailto:support@healthngo.org" style={{ color: 'inherit' }}>support@healthngo.org</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Arogya Care NGO. All rights reserved. | Stored Securely & Locally</p>
          <p>Made with ❤️ for Community Health</p>
        </div>
      </div>
    </footer>
  )
}
