import React from 'react'

export default function About() {
  return (
    <div className="about-page animate-fade-in">
      {/* Page Hero Banner */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="page-hero-badge">About Us</span>
          <h1 className="page-hero-title">Our Mission & Team</h1>
          <p className="page-hero-sub">Dedicated to making quality healthcare accessible for all, one patient at a time.</p>
        </div>
      </section>

      <div className="container" style={{ padding: '60px 24px' }}>
        {/* Mission & Vision Section */}
        <section className="mission-grid">
          <div className="mv-card mission">
            <div className="mv-icon">🎯</div>
            <h3 className="mv-title">Our Mission</h3>
            <p className="mv-text">To eliminate healthcare disparities by providing free medical services, essential prescriptions, and health education to underprivileged communities through our volunteer network.</p>
          </div>
          
          <div className="mv-card vision">
            <div className="mv-icon">👁️</div>
            <h3 className="mv-title">Our Vision</h3>
            <p className="mv-text">We envision a society where every individual has immediate access to critical healthcare services and supportive networks, regardless of their socioeconomic or physical status.</p>
          </div>
        </section>

        {/* Who We Help Section */}
        <section className="who-we-help" style={{ textAlign: 'center', margin: '40px 0' }}>
          <span className="section-label">Beneficiaries</span>
          <h2 className="section-title">Who We Support</h2>
          <p className="section-desc" style={{ margin: '0 auto 40px' }}>Our free medical programs are tailored to help those who fall through the gaps of the traditional healthcare system.</p>
          
          <div className="who-grid">
            <div className="who-card">
              <div className="who-icon">👴</div>
              <h4 className="who-title">Senior Citizens</h4>
              <p className="who-desc">Elderly individuals who need home visits, medicine delivery, or support for age-related ailments.</p>
            </div>
            
            <div className="who-card">
              <div className="who-icon">🤱</div>
              <h4 className="who-title">Mothers & Infants</h4>
              <p className="who-desc">Providing nutrition guidance, health checkups, and necessary supplements for pregnant women and newborns.</p>
            </div>
            
            <div className="who-card">
              <div className="who-icon">💼</div>
              <h4 className="who-title">Daily Wage Earners</h4>
              <p className="who-desc">Ensuring that illness doesn't lead to financial ruin by covering diagnostic fees and medication costs.</p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="values-box">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '8px' }}>Our Core Values</h2>
          <p className="section-desc" style={{ textAlign: 'center', margin: '0 auto 32px' }}>The guiding principles behind our daily healthcare outreach activities.</p>
          
          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon">❤️</div>
              <h4 className="value-name">Compassion First</h4>
              <p className="value-desc">We treat every patient with dignity, empathy, and absolute confidentiality.</p>
            </div>

            <div className="value-item">
              <div className="value-icon">🔒</div>
              <h4 className="value-name">Trust & Integrity</h4>
              <p className="value-desc">All user requests are stored securely and handled with strict transparency.</p>
            </div>

            <div className="value-item">
              <div className="value-icon">🤝</div>
              <h4 className="value-name">Community Driven</h4>
              <p className="value-desc">We believe locally organized health initiatives are the key to long-term impact.</p>
            </div>

            <div className="value-item">
              <div className="value-icon">⚕️</div>
              <h4 className="value-name">Clinical Excellence</h4>
              <p className="value-desc">Connecting beneficiaries with licensed and experienced medical professionals.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
