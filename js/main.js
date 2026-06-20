/**
 * HealthCare NGO — Main Form Logic
 * Handles form validation, localStorage persistence,
 * and submission UX
 */

// ── localStorage Helpers ───────────────────────────
const STORAGE_KEY = 'healthngo_submissions';

function getSubmissions() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveSubmission(data) {
  const submissions = getSubmissions();
  const entry = {
    id: 'sub_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
    timestamp: new Date().toISOString(),
    ...data,
  };
  submissions.unshift(entry); // newest first
  localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
  return entry;
}

// ── Form Elements ──────────────────────────────────
const form          = document.getElementById('registrationForm');
const fullNameEl    = document.getElementById('fullName');
const phoneEl       = document.getElementById('phone');
const emailEl       = document.getElementById('email');
const roleEl        = document.getElementById('role');
const messageEl     = document.getElementById('message');
const submitBtn     = document.getElementById('submitBtn');

const successOverlay  = document.getElementById('successOverlay');
const successNameEl   = document.getElementById('successName');
const successRoleEl   = document.getElementById('successRole');
const closeSuccessBtn = document.getElementById('closeSuccessBtn');

// ── Role Card Selection ───────────────────────────
const roleCards = document.querySelectorAll('.role-card');
roleCards.forEach(card => {
  card.addEventListener('click', () => {
    roleCards.forEach(c => {
      c.classList.remove('selected', 'selected-volunteer');
    });
    const val = card.dataset.value;
    if (val === 'patient') card.classList.add('selected');
    else card.classList.add('selected-volunteer');
    roleEl.value = val;

    // Clear role error if any
    const roleGroup = roleEl.closest('.form-group') || document.getElementById('roleGroup');
    if (roleGroup) roleGroup.classList.remove('has-error');
  });
});

// ── Validation ─────────────────────────────────────
function setError(fieldId, msg) {
  const group = document.getElementById(fieldId + 'Group') || document.querySelector(`[data-group="${fieldId}"]`);
  if (!group) return;
  group.classList.add('has-error');
  const errEl = group.querySelector('.error-msg');
  if (errEl) errEl.textContent = msg;
}

function clearError(fieldId) {
  const group = document.getElementById(fieldId + 'Group') || document.querySelector(`[data-group="${fieldId}"]`);
  if (!group) return;
  group.classList.remove('has-error');
}

function validateForm() {
  let valid = true;
  // Clear all
  ['fullName', 'phone', 'email', 'role', 'message'].forEach(clearError);

  const name    = fullNameEl.value.trim();
  const phone   = phoneEl.value.trim();
  const emailV  = emailEl.value.trim();
  const role    = roleEl.value;
  const message = messageEl.value.trim();

  if (!name || name.length < 2) {
    setError('fullName', 'Please enter your full name (at least 2 characters).');
    valid = false;
  }
  if (!phone || !/^[+\d\s\-()]{7,15}$/.test(phone)) {
    setError('phone', 'Please enter a valid phone number.');
    valid = false;
  }
  if (!emailV || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailV)) {
    setError('email', 'Please enter a valid email address.');
    valid = false;
  }
  if (!role) {
    setError('role', 'Please select your role.');
    valid = false;
  }
  if (!message || message.length < 10) {
    setError('message', 'Please write at least 10 characters describing your situation.');
    valid = false;
  }

  return valid;
}

// Inline real-time validation
[fullNameEl, phoneEl, emailEl, messageEl].forEach(el => {
  el.addEventListener('input', () => {
    const id = el.id === 'fullName' ? 'fullName'
      : el.id === 'phone' ? 'phone'
      : el.id === 'email' ? 'email'
      : 'message';
    if (el.value.trim()) clearError(id);
  });
});

// ── Submit Handler ─────────────────────────────────
form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!validateForm()) {
    // Scroll to first error
    const firstErr = form.querySelector('.has-error');
    if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  // Disable button + show loading state
  submitBtn.disabled = true;
  submitBtn.innerHTML = '⏳ Submitting...';

  setTimeout(() => {
    const data = {
      fullName : fullNameEl.value.trim(),
      phone    : phoneEl.value.trim(),
      email    : emailEl.value.trim(),
      role     : roleEl.value,
      message  : messageEl.value.trim(),
    };

    saveSubmission(data);

    // Reset form
    form.reset();
    roleCards.forEach(c => c.classList.remove('selected', 'selected-volunteer'));

    submitBtn.disabled = false;
    submitBtn.innerHTML = '🚀 Submit Registration';

    // Show success modal
    successNameEl.textContent = data.fullName;
    successRoleEl.textContent = data.role === 'patient' ? 'Patient Seeking Support' : 'Volunteer';
    successOverlay.classList.add('show');
  }, 900); // simulate brief processing
});

closeSuccessBtn.addEventListener('click', () => {
  successOverlay.classList.remove('show');
});
successOverlay.addEventListener('click', (e) => {
  if (e.target === successOverlay) successOverlay.classList.remove('show');
});

// ── Scroll Animations ──────────────────────────────
const fadeEls = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });
fadeEls.forEach(el => observer.observe(el));

// ── Update Live Stat Counter on Hero ─────────────
function updateHeroStats() {
  const subs = getSubmissions();
  const totalEl = document.getElementById('statTotal');
  const volEl   = document.getElementById('statVolunteers');
  if (totalEl) totalEl.textContent = subs.length;
  if (volEl)   volEl.textContent = subs.filter(s => s.role === 'volunteer').length;
}
updateHeroStats();
