import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, redirect directly to dashboard
    const isLoggedIn = localStorage.getItem('healthngo_admin_logged_in') === 'true';
    if (isLoggedIn) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Pre-defined credentials
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('healthngo_admin_logged_in', 'true');
      
      // Dispatch storage event to let navbar know immediately
      window.dispatchEvent(new Event('storage'));
      
      navigate('/admin/dashboard', { replace: true });
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="admin-login-page animate-fade-in">
      <div className="admin-login-card">
        <div className="admin-login-icon">⚙️</div>
        <h2 className="admin-login-title">Admin Console</h2>
        <p className="admin-login-sub">Access patient requests & volunteer databases</p>

        <form onSubmit={handleLogin}>
          {error && (
            <div className="login-error">
              <span>⚠️</span> {error}
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter admin username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-submit" style={{ marginTop: '10px' }}>
            Login
          </button>
        </form>

        <div className="admin-footer-note">
          <p><strong>Demo Credentials for Admin Access</strong></p>
          <p>Username: <code>admin</code> | Password: <code>admin123</code></p>
        </div>
      </div>
    </div>
  )
}
