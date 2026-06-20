/**
 * HealthCare NGO — Admin Dashboard Logic
 * Reads from localStorage, renders table, handles filters & search
 */

const STORAGE_KEY = 'healthngo_submissions';

function getSubmissions() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

// ── Format Date ───────────────────────────────────
function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    + ' ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

function isToday(iso) {
  const d = new Date(iso);
  const now = new Date();
  return d.toDateString() === now.toDateString();
}

// ── Summary Cards ─────────────────────────────────
function updateSummary(submissions) {
  const total     = submissions.length;
  const patients  = submissions.filter(s => s.role === 'patient').length;
  const volunteers = submissions.filter(s => s.role === 'volunteer').length;
  const today     = submissions.filter(s => isToday(s.timestamp)).length;

  document.getElementById('totalCount').textContent     = total;
  document.getElementById('patientCount').textContent   = patients;
  document.getElementById('volunteerCount').textContent = volunteers;
  document.getElementById('todayCount').textContent     = today;

  // AI Auto-Summary
  const aiEl = document.getElementById('aiSummaryText');
  if (aiEl) {
    if (total === 0) {
      aiEl.textContent = 'No submissions yet. Share the registration link to start collecting requests!';
    } else {
      const recentLabel = today === 1 ? '1 new request today' : `${today} new requests today`;
      const patientStr  = patients === 1 ? '1 patient' : `${patients} patients`;
      const volStr      = volunteers === 1 ? '1 volunteer' : `${volunteers} volunteers`;
      const allStr      = total === 1 ? '1 total submission' : `${total} total submissions`;
      aiEl.innerHTML = `📊 <strong>${allStr}</strong> — ${patientStr} seeking support & ${volStr} registered. ${today > 0 ? `<em>${recentLabel}.</em>` : 'No submissions today yet.'}`;
    }
  }
}

// ── Render Table ──────────────────────────────────
function renderTable(submissions) {
  const tbody = document.getElementById('submissionsBody');
  const empty = document.getElementById('emptyState');

  if (!submissions.length) {
    tbody.innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';

  tbody.innerHTML = submissions.map((s, idx) => `
    <tr>
      <td><strong>#${String(idx + 1).padStart(3, '0')}</strong></td>
      <td>
        <div style="font-weight:600">${escapeHtml(s.fullName)}</div>
        <div style="font-size:0.78rem;color:var(--text-muted)">${escapeHtml(s.email)}</div>
      </td>
      <td>${escapeHtml(s.phone)}</td>
      <td>
        <span class="role-badge ${s.role === 'patient' ? 'patient' : 'volunteer'}">
          ${s.role === 'patient' ? '🏥 Patient' : '🙋 Volunteer'}
        </span>
      </td>
      <td class="msg-preview" title="${escapeHtml(s.message)}">${escapeHtml(s.message)}</td>
      <td style="font-size:0.8rem;color:var(--text-secondary);white-space:nowrap">${formatDate(s.timestamp)}</td>
    </tr>
  `).join('');
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Filter & Search ───────────────────────────────
let currentFilter = 'all';
let currentSearch = '';

function applyFilters() {
  let data = getSubmissions();

  if (currentFilter === 'patient')    data = data.filter(s => s.role === 'patient');
  if (currentFilter === 'volunteer')  data = data.filter(s => s.role === 'volunteer');
  if (currentFilter === 'today')      data = data.filter(s => isToday(s.timestamp));

  if (currentSearch) {
    const q = currentSearch.toLowerCase();
    data = data.filter(s =>
      s.fullName.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.phone.includes(q) ||
      s.message.toLowerCase().includes(q)
    );
  }

  renderTable(data);
}

// Filter tab clicks
document.querySelectorAll('.filter-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentFilter = tab.dataset.filter;
    applyFilters();
  });
});

// Search
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value.trim();
    applyFilters();
  });
}

// Clear all data
const clearBtn = document.getElementById('clearDataBtn');
if (clearBtn) {
  clearBtn.addEventListener('click', () => {
    if (confirm('⚠️ This will permanently delete all submission records. Are you sure?')) {
      localStorage.removeItem(STORAGE_KEY);
      location.reload();
    }
  });
}

// ── Seed Demo Data (if empty) ─────────────────────
function seedDemoData() {
  if (getSubmissions().length > 0) return;
  const demos = [
    { fullName: 'Priya Sharma', phone: '+91-98765-11111', email: 'priya.s@gmail.com', role: 'patient', message: 'I need assistance with diabetes medication and regular check-ups.', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
    { fullName: 'Ravi Kumar', phone: '+91-91234-22222', email: 'ravi.kumar@email.com', role: 'volunteer', message: 'I am a retired nurse and would love to volunteer on weekends for health camps.', timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() },
    { fullName: 'Fatima Begum', phone: '+91-87654-33333', email: 'fatima.b@yahoo.com', role: 'patient', message: 'Seeking support for my mother who has a heart condition and cannot afford treatment.', timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() },
    { fullName: 'Arjun Reddy', phone: '+91-99887-44444', email: 'arjun.r@outlook.com', role: 'volunteer', message: 'Medical student willing to help with awareness campaigns and free consultations.', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
    { fullName: 'Lakshmi Devi', phone: '+91-88776-55555', email: 'lakshmi.d@gmail.com', role: 'patient', message: 'Pregnant woman needing maternal health support and nutritional guidance.', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
  ].map((d, i) => ({ id: `demo_${i}`, ...d }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(demos));
}

// ── Init ──────────────────────────────────────────
seedDemoData();
updateSummary(getSubmissions());
applyFilters();
