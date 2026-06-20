import React, { useState, useEffect } from 'react'
import { getAllEntries, seedDemoData, clearAllData, formatDate, isToday } from '../utils/storage'

export default function AdminDashboard() {
  const [entries, setEntries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [summaryNarrative, setSummaryNarrative] = useState('');
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

  // Load entries on mount
  useEffect(() => {
    seedDemoData();
    refreshData();
  }, []);

  const refreshData = () => {
    setEntries(getAllEntries());
  };

  const handleSeedData = () => {
    seedDemoData();
    refreshData();
  };

  const handleClearData = () => {
    if (window.confirm("Are you sure you want to reset the database? This will empty all local storage.")) {
      clearAllData();
      setEntries([]);
      setSummaryNarrative('');
    }
  };

  const handleDeleteEntry = (id, role) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      if (role === 'contact') {
        const currentContacts = JSON.parse(localStorage.getItem('healthngo_contacts')) || [];
        const updated = currentContacts.filter(c => c.id !== id);
        localStorage.setItem('healthngo_contacts', JSON.stringify(updated));
      } else {
        const currentSubs = JSON.parse(localStorage.getItem('healthngo_submissions')) || [];
        const updated = currentSubs.filter(s => s.id !== id);
        localStorage.setItem('healthngo_submissions', JSON.stringify(updated));
      }
      refreshData();
      if (summaryNarrative) {
        // Re-trigger narrative compilation if open
        setTimeout(() => triggerAISummary(), 100);
      }
    }
  };

  const triggerAISummary = () => {
    setIsGeneratingSummary(true);
    setTimeout(() => {
      const patientCount = entries.filter(e => e.role === 'patient').length;
      const volunteerCount = entries.filter(e => e.role === 'volunteer').length;

      const urgencyKeywords = ['urgent', 'emergency', 'critical', 'severe', 'immediately', 'asap', 'pain', 'heart', 'refill', 'bpl'];
      const urgentEntries = entries.filter(e => {
        const text = (e.message || '').toLowerCase();
        return urgencyKeywords.some(kw => text.includes(kw));
      });

      let textReport = `System contains ${entries.length} records. `;
      textReport += `We have ${patientCount} active patient(s) requesting assistance and ${volunteerCount} volunteer(s) on file. `;
      if (urgentEntries.length > 0) {
        textReport += `🚨 ALERT: ${urgentEntries.length} requests contain time-critical keywords requiring urgent coordination.`;
      } else {
        textReport += `🟢 Status: Operations normal. No active critical keyword flags.`;
      }
      
      setSummaryNarrative(textReport);
      setIsGeneratingSummary(false);
    }, 500);
  };

  // Filter entries
  const filteredEntries = entries.filter(entry => {
    const matchesSearch = 
      (entry.fullName && entry.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (entry.name && entry.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (entry.phone && entry.phone.includes(searchTerm)) ||
      (entry.email && entry.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (entry.message && entry.message.toLowerCase().includes(searchTerm.toLowerCase()));

    if (roleFilter === 'all') return matchesSearch;
    return entry.role === roleFilter && matchesSearch;
  });

  // Compile totals for Stat cards
  const totalCount = entries.length;
  const patientsCount = entries.filter(e => e.role === 'patient').length;
  const volunteersCount = entries.filter(e => e.role === 'volunteer').length;
  const contactsCount = entries.filter(e => e.role === 'contact').length;
  const todayCount = entries.filter(e => isToday(e.timestamp)).length;

  return (
    <div className="dashboard-page animate-fade-in">
      <div className="container">
        
        {/* Header */}
        <header className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Admin Dashboard ⚙️</h1>
            <p className="dashboard-subtitle">Local Engagement & Service Management Console</p>
          </div>
          <div className="dashboard-actions">
            <button onClick={handleSeedData} className="btn btn-outline" style={{ color: 'var(--primary)', borderColor: 'var(--primary)', padding: '8px 18px', fontSize: '0.85rem' }}>
              🌱 Seed Demo
            </button>
            <button onClick={handleClearData} className="btn btn-danger">
              🗑️ Reset All
            </button>
          </div>
        </header>

        {/* Summary Card Grid */}
        <section className="summary-cards">
          <div className="summary-card sc-total">
            <div className="summary-icon">🗂️</div>
            <div className="summary-num">{totalCount}</div>
            <div className="summary-label">Total Records</div>
          </div>
          
          <div className="summary-card sc-patients">
            <div className="summary-icon">🏥</div>
            <div className="summary-num">{patientsCount}</div>
            <div className="summary-label">Patients</div>
          </div>

          <div className="summary-card sc-volunteers">
            <div className="summary-icon">🤝</div>
            <div className="summary-num">{volunteersCount}</div>
            <div className="summary-label">Volunteers</div>
          </div>

          <div className="summary-card sc-contacts">
            <div className="summary-icon">✉️</div>
            <div className="summary-num">{contactsCount}</div>
            <div className="summary-label">Queries</div>
          </div>

          <div className="summary-card sc-today">
            <div className="summary-icon">📅</div>
            <div className="summary-num">{todayCount}</div>
            <div className="summary-label">Added Today</div>
          </div>
        </section>

        {/* AI Auto-Summary Banner */}
        <section className="ai-banner">
          <div className="ai-banner-icon">✨</div>
          <div style={{ flex: 1 }}>
            <div className="ai-banner-label">Automated AI-powered Summary Report</div>
            <div className="ai-banner-content">
              {isGeneratingSummary ? (
                <span>Compiling latest insights...</span>
              ) : summaryNarrative ? (
                <span>{summaryNarrative}</span>
              ) : (
                <span>Click the button to generate a dynamic intelligence report on recent submissions.</span>
              )}
            </div>
          </div>
          <button onClick={triggerAISummary} className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
            {summaryNarrative ? '🔄 Refresh' : '⚡ Compile'}
          </button>
        </section>

        {/* Table Toolbar */}
        <div className="table-toolbar">
          <div className="filter-tabs">
            <button 
              className={`filter-tab ${roleFilter === 'all' ? 'tab-active' : ''}`}
              onClick={() => setRoleFilter('all')}
            >
              All Types
            </button>
            <button 
              className={`filter-tab ${roleFilter === 'patient' ? 'tab-active' : ''}`}
              onClick={() => setRoleFilter('patient')}
            >
              Patients
            </button>
            <button 
              className={`filter-tab ${roleFilter === 'volunteer' ? 'tab-active' : ''}`}
              onClick={() => setRoleFilter('volunteer')}
            >
              Volunteers
            </button>
            <button 
              className={`filter-tab ${roleFilter === 'contact' ? 'tab-active' : ''}`}
              onClick={() => setRoleFilter('contact')}
            >
              Inquiries
            </button>
          </div>

          <div className="search-box">
            <input
              type="text"
              className="search-input"
              placeholder="Search details..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Submissions Table List */}
        <div className="table-wrap">
          {filteredEntries.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📂</div>
              <div className="empty-text">No records match your filters or search.</div>
            </div>
          ) : (
            <table className="submissions-table">
              <thead>
                <tr>
                  <th>Submitted On</th>
                  <th>Type</th>
                  <th>Sender Name</th>
                  <th>Contact Info</th>
                  <th>Details / Message</th>
                  <th style={{ textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredEntries.map((entry) => {
                  const isPatient = entry.role === 'patient';
                  const isVolunteer = entry.role === 'volunteer';
                  
                  return (
                    <tr key={entry.id}>
                      <td style={{ whiteSpace: 'nowrap' }}>{formatDate(entry.timestamp)}</td>
                      <td>
                        <span className={`role-badge badge-${entry.role}`}>
                          {isPatient ? '🏥 Patient' : isVolunteer ? '🤝 Volunteer' : '✉️ Inquiry'}
                        </span>
                      </td>
                      <td className="td-name">{entry.fullName || entry.name}</td>
                      <td>
                        <div>📱 {entry.phone || 'N/A'}</div>
                        <div className="td-sub">📧 {entry.email || 'N/A'}</div>
                      </td>
                      <td>
                        <p className="msg-preview" title={entry.message}>{entry.message}</p>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button 
                          onClick={() => handleDeleteEntry(entry.id, entry.role)}
                          className="btn-danger"
                          style={{ border: 'none', padding: '6px 12px', background: '#fee2e2', color: '#dc2626', cursor: 'pointer', borderRadius: '6px' }}
                          title="Delete entry"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  )
}
