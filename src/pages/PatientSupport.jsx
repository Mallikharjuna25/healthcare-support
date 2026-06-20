import React, { useState } from 'react'
import { saveSubmission } from '../utils/storage'
import VoiceInput from '../components/VoiceInput'

export default function PatientSupport() {
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
    if (!formData.fullName.trim()) return setError('Please enter the patient\'s full name.');
    if (!formData.phone.trim()) return setError('Please enter a phone number.');
    if (!formData.message.trim()) return setError('Please describe the assistance needed.');

    try {
      saveSubmission({
        ...formData,
        role: 'patient'
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
    <div className="patient-support-page animate-fade-in">
      {/* Page Hero Banner */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="page-hero-badge">Patient Care</span>
          <h1 className="page-hero-title">Request Healthcare Support</h1>
          <p className="page-hero-sub">We offer free medicine refills, diagnostic camp scheduling, and clinical referrals.</p>
        </div>
      </section>

      {/* Form Section */}
      <section className="form-section">
        <div className="container">
          <div className="form-layout">
            
            {/* Left: Info Promo Card and Checklists */}
            <div>
              <div className="info-promo-card">
                <h3 className="info-promo-title">Healthcare Support Programs</h3>
                <p className="info-promo-body">Our team is committed to providing prompt assistance to eligible families, senior citizens, and patients managing chronic conditions.</p>
              </div>

              <div className="info-items">
                <div className="info-item">
                  <div className="info-item-icon">💊</div>
                  <div>
                    <div className="info-item-name">Medicine Refills</div>
                    <div className="info-item-desc">Free refills for chronic illnesses like diabetes.</div>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-item-icon">🩺</div>
                  <div>
                    <div className="info-item-name">Health Camps</div>
                    <div className="info-item-desc">Priority scheduling at our community checkup clinics.</div>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-item-icon">🔒</div>
                  <div>
                    <div className="info-item-name">Confidential Records</div>
                    <div className="info-item-desc">Your health history is strictly protected locally.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form Card */}
            <div className="form-card">
              {submitted ? (
                <div className="form-success">
                  <div className="success-icon-wrap">✅</div>
                  <h3 className="success-title">Request Submitted!</h3>
                  <p className="success-body">
                    Thank you for reaching out. A coordinator will contact you at <strong>{formData.phone || 'your phone number'}</strong> within 24 hours.
                  </p>
                  <div className="success-actions">
                    <button onClick={handleReset} className="btn-reset-form">
                      Submit Another Request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 className="form-card-title">Patient Support Form</h3>
                  <p className="form-card-sub">Please fill out all required fields. Role is preset as Patient.</p>
                  
                  {error && <div className="error-msg" style={{ marginBottom: '14px' }}>⚠️ {error}</div>}

                  <div className="form-group">
                    <label className="form-label" htmlFor="fullName">Full Name <span className="req">*</span></label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        name="fullName"
                        placeholder="Enter patient's full name"
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
                      placeholder="Enter 10-digit mobile number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email Address <span className="optional">(Optional)</span></label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="message">Medical Support Details <span className="req">*</span></label>
                    <div className="textarea-wrapper">
                      <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        rows="4"
                        placeholder="Describe current symptoms, medicines, or prescription details..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                      <div className="voice-wrapper">
                        <VoiceInput onResult={(text) => handleVoiceResult('message', text)} />
                      </div>
                    </div>
                    <small style={{ display: 'block', fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                      Tip: Click the microphone to dictate your details instead of typing.
                    </small>
                  </div>

                  <button type="submit" className="btn-submit">
                    Submit Request
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
