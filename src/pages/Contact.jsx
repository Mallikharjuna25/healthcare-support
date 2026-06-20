import React, { useState } from 'react'
import { saveContact } from '../utils/storage'
import VoiceInput from '../components/VoiceInput'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVoiceResult = (fieldName, text) => {
    setFormData((prev) => ({ 
      ...prev, 
      [fieldName]: prev[fieldName] ? `${prev[fieldName]} ${text}` : text 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) return setError('Please enter your name.');
    if (!formData.email.trim()) return setError('Please enter your email.');
    if (!formData.message.trim()) return setError('Please enter your message.');

    try {
      saveContact(formData);
      setSubmitted(true);
    } catch (err) {
      setError('Failed to send message. Please try again.');
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-page animate-fade-in">
      {/* Page Hero Banner */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="page-hero-badge">Get In Touch</span>
          <h1 className="page-hero-title">Contact Our Team</h1>
          <p className="page-hero-sub">Have questions, feedback, or want to collaborate? Write to us and we'll reply soon.</p>
        </div>
      </section>

      <div className="container" style={{ padding: '60px 24px' }}>
        <div className="contact-grid">
          {/* Left Column: Contact Cards */}
          <div>
            <div className="contact-info-card">
              <h3 className="contact-info-title">Arogya Care NGO</h3>
              <p className="contact-info-sub">Feel free to reach out to us during working hours.</p>
              
              <div className="contact-detail">
                <div className="contact-detail-icon">📞</div>
                <div>
                  <div className="contact-detail-label">General Helpline</div>
                  <div className="contact-detail-value">1800-123-4567</div>
                </div>
              </div>

              <div className="contact-detail">
                <div className="contact-detail-icon">📱</div>
                <div>
                  <div className="contact-detail-label">Emergency Helpline</div>
                  <div className="contact-detail-value">+91-98765-43210</div>
                </div>
              </div>

              <div className="contact-detail">
                <div className="contact-detail-icon">📧</div>
                <div>
                  <div className="contact-detail-label">Email Support</div>
                  <div className="contact-detail-value">support@healthngo.org</div>
                </div>
              </div>

              <div className="contact-detail">
                <div className="contact-detail-icon">🏢</div>
                <div>
                  <div className="contact-detail-label">Office Address</div>
                  <div className="contact-detail-value">12 Wellness Lane, Sector 4, Hyderabad</div>
                </div>
              </div>
            </div>

            {/* Map Placeholder Box */}
            <div className="map-box">
              <span className="map-icon">📍</span>
              <span>Find us on Google Maps</span>
              <span style={{ fontSize: '0.78rem', opacity: 0.8 }}>Madhapur, Hyderabad, India</span>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="form-card">
            {submitted ? (
              <div className="form-success">
                <div className="success-icon-wrap">✉️</div>
                <h3 className="success-title">Message Sent!</h3>
                <p className="success-body">
                  Thank you for reaching out. We have received your query and will reply via email shortly.
                </p>
                <div className="success-actions">
                  <button onClick={handleReset} className="btn-reset-form">
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="form-card-title">Send a Message</h3>
                <p className="form-card-sub">All details are stored securely and processed locally.</p>
                
                {error && <div className="error-msg" style={{ marginBottom: '14px' }}>⚠️ {error}</div>}

                <div className="form-group">
                  <label className="form-label" htmlFor="name">Your Name <span className="req">*</span></label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', zIndex: '10' }}>
                      <VoiceInput onResult={(text) => handleVoiceResult('name', text)} />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address <span className="req">*</span></label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">Your Message <span className="req">*</span></label>
                  <div className="textarea-wrapper">
                    <textarea
                      className="form-control"
                      id="message"
                      rows="5"
                      placeholder="Write your query or message here..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                    <div className="voice-wrapper">
                      <VoiceInput onResult={(text) => handleVoiceResult('message', text)} />
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn-submit">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
