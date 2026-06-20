import React, { useState } from 'react'
import { saveSubmission } from '../utils/storage'
import VoiceInput from '../components/VoiceInput'

export default function Volunteer() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
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

    // Validations
    if (!formData.fullName.trim()) return setError('Please enter your full name.');
    if (!formData.phone.trim()) return setError('Please enter your phone number.');
    if (!formData.email.trim()) return setError('Please enter your email address.');
    if (!formData.message.trim()) return setError('Please share your volunteer interest or background.');

    try {
      saveSubmission({
        ...formData,
        role: 'volunteer'
      });
      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ fullName: '', phone: '', email: '', message: '' });
  };

  return (
    <div className="volunteer-registration-page animate-fade-in">
      {/* Page Hero Banner */}
      <section className="page-hero" style={{ background: 'linear-gradient(135deg, var(--teal) 0%, var(--primary) 100%)' }}>
        <div className="page-hero-inner">
          <span className="page-hero-badge" style={{ background: 'rgba(255,255,255,0.2)' }}>Get Involved</span>
          <h1 className="page-hero-title">Join as a Volunteer</h1>
          <p className="page-hero-sub">Lend your skills and time to power free diagnostic health checkups and outreach camps.</p>
        </div>
      </section>

      {/* Form Section */}
      <section className="form-section">
        <div className="container">
          <div className="form-layout">
            
            {/* Left: Onboarding Info Card */}
            <div>
              <div className="info-promo-card" style={{ background: 'linear-gradient(135deg, var(--teal), var(--primary))' }}>
                <h3 className="info-promo-title">Volunteer Network</h3>
                <p className="info-promo-body">We are looking for medical practitioners, medical students, drivers, administrative helpers, and awareness campaign managers.</p>
              </div>

              <div className="info-items">
                <div className="info-item">
                  <div className="info-item-icon" style={{ color: 'var(--teal)' }}>🩺</div>
                  <div>
                    <div className="info-item-name">Clinical Doctors & Nurses</div>
                    <div className="info-item-desc">Support local weekend diagnostics and medicine camps.</div>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-item-icon" style={{ color: 'var(--teal)' }}>📚</div>
                  <div>
                    <div className="info-item-name">Awareness Campaigns</div>
                    <div className="info-item-desc">Educate community members on hygiene and preventative care.</div>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-item-icon" style={{ color: 'var(--teal)' }}>🎓</div>
                  <div>
                    <div className="info-item-name">Student Internship</div>
                    <div className="info-item-desc">Receive official service certificates and practical training.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form Card */}
            <div className="form-card">
              {submitted ? (
                <div className="form-success">
                  <div className="success-icon-wrap" style={{ background: 'linear-gradient(135deg, var(--teal), var(--teal-light))' }}>🤝</div>
                  <h3 className="success-title">Registration Submitted!</h3>
                  <p className="success-body">
                    Welcome aboard! Our onboarding coordinator will reach out to you via email or phone within 48 hours.
                  </p>
                  <div className="success-actions">
                    <button onClick={handleReset} className="btn-reset-form">
                      Register Another Volunteer
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 className="form-card-title">Volunteer Registration Form</h3>
                  <p className="form-card-sub">Please fill out all required fields. Role is preset as Volunteer.</p>
                  
                  {error && <div className="error-msg" style={{ marginBottom: '14px' }}>⚠️ {error}</div>}

                  <div className="form-group">
                    <label className="form-label" htmlFor="fullName">Full Name <span className="req">*</span></label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        name="fullName"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                      <div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', zIndex: '10' }}>
                        <VoiceInput onResult={(text) => handleVoiceResult('fullName', text)} />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">Phone Number <span className="req">*</span></label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      name="phone"
                      placeholder="Enter mobile number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email Address <span className="req">*</span></label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="message">Skills & Availability <span className="req">*</span></label>
                    <div className="textarea-wrapper">
                      <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        rows="4"
                        placeholder="Describe your background, professional skills, and availability (e.g. weekends)..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                      <div className="voice-wrapper">
                        <VoiceInput onResult={(text) => handleVoiceResult('message', text)} />
                      </div>
                    </div>
                    <small style={{ display: 'block', fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                      Tip: Use voice input to speak about your skills and availability.
                    </small>
                  </div>

                  <button type="submit" className="btn-submit" style={{ background: 'linear-gradient(135deg, var(--teal), var(--teal-light))', boxShadow: '0 4px 16px rgba(13,148,136,0.3)' }}>
                    Register Now
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
