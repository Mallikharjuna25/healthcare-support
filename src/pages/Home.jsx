import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="home-page animate-fade-in">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-inner">
          {/* Left: Text Content */}
          <div>
            <span className="hero-badge">⚕️ Caring Beyond Boundaries</span>
            <h1 className="hero-title">
              Providing Health and Hope to those in Need
            </h1>
            <p className="hero-subtitle">
              Arogya Care is a dedicated NGO providing free healthcare services, medicine distribution, and consultation to marginalized communities. Join hands with us to heal lives.
            </p>
            <div className="hero-actions">
              <Link to="/patient-support" className="btn btn-primary">
                ❤️ Request Support
              </Link>
              <Link to="/volunteer" className="btn btn-outline" style={{ color: 'var(--primary-dark)', borderColor: 'var(--primary-dark)' }}>
                🤝 Become a Volunteer
              </Link>
            </div>
            
            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-num">12,500+</div>
                <div className="hero-stat-label">Patients Supported</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-num">850+</div>
                <div className="hero-stat-label">Active Volunteers</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-num">150+</div>
                <div className="hero-stat-label">Health Camps</div>
              </div>
            </div>
          </div>

          {/* Right: Floating Visual Cards */}
          <div className="hero-visual">
            <div className="card-stack">
              <div className="float-card float-card-a">
                <div className="fc-header">
                  <div className="fc-avatar fc-avatar-p">❤️</div>
                  <div>
                    <div className="fc-name">Sita Ram</div>
                    <div className="fc-loc">Hyderabad</div>
                  </div>
                </div>
                <span className="fc-tag fc-tag-p">Patient Assisted</span>
                <div className="fc-time">Just now</div>
              </div>
              
              <div className="float-card float-card-b">
                <div className="fc-header">
                  <div className="fc-avatar fc-avatar-v">🩺</div>
                  <div>
                    <div className="fc-name">Dr. Amit Paul</div>
                    <div className="fc-loc">On Call</div>
                  </div>
                </div>
                <span className="fc-tag fc-tag-v">Volunteer Doctor</span>
                <div className="fc-time">Active now</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="steps-section">
        <div className="container">
          <div className="steps-header">
            <span className="section-label">📋 Operations Workflow</span>
            <h2 className="section-title">How Our Support Works</h2>
            <p className="section-desc">A simple, transparent process to connect patients with volunteer resources</p>
          </div>
          
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-num">1</div>
              <div className="step-icon">📝</div>
              <h4 className="step-title">Submit Details</h4>
              <p className="step-desc">Fill out our simple support or volunteer forms, using voice search if preferred.</p>
            </div>
            
            <div className="step-card">
              <div className="step-num">2</div>
              <div className="step-icon">⚙️</div>
              <h4 className="step-title">Review & Categorize</h4>
              <p className="step-desc">Our administrative staff screens, categorizes, and organizes submissions in the console.</p>
            </div>
            
            <div className="step-card">
              <div className="step-num">3</div>
              <div className="step-icon">🤝</div>
              <h4 className="step-title">Volunteer Match</h4>
              <p className="step-desc">Registered medical volunteers are assigned based on patient requirements.</p>
            </div>

            <div className="step-card">
              <div className="step-num">4</div>
              <div className="step-icon">💊</div>
              <h4 className="step-title">Deliver Support</h4>
              <p className="step-desc">Medicines, counseling, or outpatient consultation support is delivered completely free.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="services-section">
        <div className="container">
          <div className="services-layout">
            <div className="services-text">
              <span className="section-label">🏥 NGO Programs</span>
              <h2 className="section-title">Healthcare Support Services</h2>
              <p className="section-desc">We target the most critical care layers to ensure no family goes without treatment due to lack of funds.</p>
              <Link to="/about" className="btn btn-primary">Learn About Our Mission</Link>
            </div>

            <div className="services-grid">
              <div className="service-card">
                <div className="service-icon">💊</div>
                <h4 className="service-name">Prescription Assistance</h4>
                <p className="service-desc">Providing free medicines for chronic illnesses such as diabetes and hypertension.</p>
              </div>

              <div className="service-card">
                <div className="service-icon">🤱</div>
                <h4 className="service-name">Maternal & Child Care</h4>
                <p className="service-desc">Nutrition packs, prenatal supplements, and pediatric checkups for new mothers.</p>
              </div>

              <div className="service-card">
                <div className="service-icon">🧠</div>
                <h4 className="service-name">Mental Health Counseling</h4>
                <p className="service-desc">Free therapy sessions and support groups for anxiety, depression, and stress.</p>
              </div>

              <div className="service-card">
                <div className="service-icon">🩺</div>
                <h4 className="service-name">Free Health Camps</h4>
                <p className="service-desc">Bi-weekly diagnostic camps led by local volunteer doctors in underserved localities.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-inner">
          <h2 className="cta-title">Help Us Build a Healthier Community</h2>
          <p className="cta-sub">Whether you need help or want to lend a hand, there is a place for you at Arogya Care. Join our mission today.</p>
          <div className="cta-actions">
            <Link to="/patient-support" className="btn btn-primary" style={{ background: 'white', color: 'var(--primary)' }}>
              ❤️ Get Support
            </Link>
            <Link to="/volunteer" className="btn btn-outline">
              🤝 Volunteer With Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
