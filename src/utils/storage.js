// ── Keys ──────────────────────────────────────────
const SUBMISSIONS_KEY = 'healthngo_submissions';
const CONTACTS_KEY    = 'healthngo_contacts';

// ── Submissions (Patient + Volunteer) ─────────────
export function getSubmissions() {
  try { return JSON.parse(localStorage.getItem(SUBMISSIONS_KEY)) || []; }
  catch { return []; }
}

export function saveSubmission(data) {
  const items = getSubmissions();
  const entry = {
    id: 'sub_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
    timestamp: new Date().toISOString(),
    ...data,
  };
  items.unshift(entry);
  localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(items));
  return entry;
}

// ── Contact Messages ──────────────────────────────
export function getContacts() {
  try { return JSON.parse(localStorage.getItem(CONTACTS_KEY)) || []; }
  catch { return []; }
}

export function saveContact(data) {
  const items = getContacts();
  const entry = {
    id: 'con_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
    timestamp: new Date().toISOString(),
    role: 'contact',
    ...data,
  };
  items.unshift(entry);
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(items));
  return entry;
}

// ── Combined view for admin ───────────────────────
export function getAllEntries() {
  const subs = getSubmissions();
  const cons = getContacts();
  return [...subs, ...cons].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );
}

export function clearAllData() {
  localStorage.removeItem(SUBMISSIONS_KEY);
  localStorage.removeItem(CONTACTS_KEY);
}

// ── Helpers ───────────────────────────────────────
export function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    + ' ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

export function isToday(iso) {
  return new Date(iso).toDateString() === new Date().toDateString();
}

// ── Seed demo data on first visit ─────────────────
export function seedDemoData() {
  if (getSubmissions().length > 0) return;
  const demos = [
    { id: 'd1', fullName: 'Priya Sharma',  phone: '+91-98765-11111', email: 'priya@example.com',  role: 'patient',   message: 'Need assistance with diabetes medication and regular check-ups.', timestamp: new Date(Date.now() - 2 * 3600000).toISOString() },
    { id: 'd2', fullName: 'Ravi Kumar',    phone: '+91-91234-22222', email: 'ravi@example.com',   role: 'volunteer', message: 'Retired nurse, available on weekends for health camps.', timestamp: new Date(Date.now() - 5 * 3600000).toISOString() },
    { id: 'd3', fullName: 'Fatima Begum',  phone: '+91-87654-33333', email: 'fatima@example.com', role: 'patient',   message: 'Seeking help for my mother with a heart condition.', timestamp: new Date(Date.now() - 86400000).toISOString() },
    { id: 'd4', fullName: 'Arjun Reddy',   phone: '+91-99887-44444', email: 'arjun@example.com',  role: 'volunteer', message: 'Medical student, eager to help with awareness campaigns.', timestamp: new Date(Date.now() - 2 * 86400000).toISOString() },
    { id: 'd5', fullName: 'Lakshmi Devi',  phone: '+91-88776-55555', email: 'lakshmi@example.com',role: 'patient',   message: 'Pregnant, need maternal health support and nutrition guidance.', timestamp: new Date(Date.now() - 3 * 86400000).toISOString() },
  ];
  localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(demos));
}
