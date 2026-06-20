/**
 * HealthCare NGO — FAQ Chatbot
 * Rule-based keyword matching chatbot
 * No API key required — fully client-side
 */

const CHATBOT_CONFIG = {
  botName: 'HealthBot',
  typingDelay: 800,   // ms to simulate "thinking"
  greetingDelay: 500, // ms before initial greeting appears
};

// ── Knowledge Base (8–10 QA pairs) ───────────────
const FAQ_KB = [
  {
    id: 'volunteer',
    keywords: ['volunteer', 'volunteering', 'join', 'sign up', 'register as volunteer', 'how do i volunteer', 'want to volunteer', 'helping', 'help'],
    answer: `🙌 <strong>How to Volunteer with Us</strong><br><br>
      We'd love to have you on board! Here's how:<br>
      1. Fill out the <strong>Volunteer Registration form</strong> on our homepage.<br>
      2. Select <em>"Volunteer"</em> as your role in the dropdown.<br>
      3. Our coordinator will contact you within <strong>48 hours</strong>.<br><br>
      Volunteers help with patient outreach, medicine distribution, and awareness camps! 💙`,
  },
  {
    id: 'medicine',
    keywords: ['medicine', 'medication', 'drugs', 'prescription', 'tablet', 'treatment', 'medical supply', 'get medicine', 'medicine assistance'],
    answer: `💊 <strong>Medicine Assistance Program</strong><br><br>
      We provide free or subsidized medicines to eligible patients. Here's how to apply:<br>
      1. Submit a request via the <strong>Patient Support form</strong>.<br>
      2. Mention your condition and medication needs in the message field.<br>
      3. Attach a doctor's prescription (bring it to our office).<br><br>
      We cover essential medicines for <em>chronic illnesses, maternal health, and pediatric care</em>.`,
  },
  {
    id: 'support',
    keywords: ['support', 'what support', 'services', 'what do you offer', 'what can you help', 'assistance', 'what help', 'offer', 'provide'],
    answer: `🏥 <strong>Our Support Services</strong><br><br>
      We provide a range of free healthcare services:<br>
      • 💊 Medicine & treatment assistance<br>
      • 🩺 Free health check-up camps<br>
      • 🧘 Mental health counseling<br>
      • 🍼 Maternal & child health care<br>
      • 🚑 Emergency referral support<br>
      • 📚 Health awareness workshops<br><br>
      All services are <strong>100% free</strong> for eligible beneficiaries.`,
  },
  {
    id: 'contact',
    keywords: ['contact', 'reach you', 'phone', 'email', 'address', 'location', 'office', 'where are you', 'how to contact'],
    answer: `📞 <strong>Contact & Location</strong><br><br>
      You can reach us through multiple channels:<br>
      • 📧 Email: <strong>support@healthngo.org</strong><br>
      • 📱 Helpline: <strong>1800-123-4567</strong> (Free, Mon–Sat 9am–6pm)<br>
      • 🏢 Office: 12 Wellness Lane, Sector 4, Hyderabad<br>
      • 🌐 Or fill the form on this page — we'll call you!<br><br>
      Our team responds within <strong>24–48 hours</strong>.`,
  },
  {
    id: 'eligibility',
    keywords: ['eligible', 'eligibility', 'who can', 'qualify', 'criteria', 'who qualifies', 'bpl', 'below poverty', 'income'],
    answer: `✅ <strong>Eligibility Criteria</strong><br><br>
      Our services are open to:<br>
      • Families below the poverty line (BPL card holders)<br>
      • Uninsured individuals with chronic conditions<br>
      • Pregnant women & children under 5<br>
      • Senior citizens (60+) without family support<br>
      • Migrant workers and daily-wage earners<br><br>
      <em>Not sure if you qualify?</em> Just submit the form — our team will assess and guide you personally.`,
  },
  {
    id: 'appointment',
    keywords: ['appointment', 'book', 'schedule', 'checkup', 'check-up', 'camp', 'health camp', 'doctor', 'clinic', 'consult'],
    answer: `📅 <strong>Book an Appointment / Health Camp</strong><br><br>
      You can access our doctors in two ways:<br>
      1. <strong>Health Camps</strong> — We organize free camps every 2nd Saturday in your locality. Fill the form to get notified.<br>
      2. <strong>Walk-in Clinics</strong> — Visit our partner clinics with your NGO referral letter (we'll send via WhatsApp).<br><br>
      Submit your details through the registration form and we'll send the nearest camp schedule! 📆`,
  },
  {
    id: 'mental_health',
    keywords: ['mental', 'depression', 'anxiety', 'stress', 'counseling', 'counselling', 'psychiatrist', 'psychologist', 'therapy', 'emotional', 'mental health'],
    answer: `🧘 <strong>Mental Health Support</strong><br><br>
      We take mental well-being seriously. Our services include:<br>
      • Free counseling sessions (1-on-1 and group)<br>
      • Telehealth consultations with licensed psychologists<br>
      • Support groups for depression, grief, and anxiety<br>
      • Crisis helpline available <strong>24/7</strong><br><br>
      💙 You're not alone. Fill the form and mark your message as "Mental Health Support" to be prioritized.`,
  },
  {
    id: 'donate',
    keywords: ['donate', 'donation', 'fund', 'contribute', 'money', 'financial help', 'sponsor', 'support us', 'give back'],
    answer: `❤️ <strong>Support Our Mission</strong><br><br>
      Your donations power our free healthcare services! You can contribute by:<br>
      • 🏦 Bank transfer (UPI/NEFT) — account details on our website<br>
      • 💻 Online at: <strong>www.healthngo.org/donate</strong><br>
      • 🏢 In-person at our office with a receipt<br>
      • 📦 Donating medicines or medical equipment<br><br>
      All donations are <strong>80G tax-exempt</strong>. Thank you for your generosity! 🙏`,
  },
  {
    id: 'privacy',
    keywords: ['privacy', 'data', 'information', 'safe', 'secure', 'confidential', 'personal data', 'share my data'],
    answer: `🔒 <strong>Your Privacy Matters</strong><br><br>
      We take data privacy very seriously:<br>
      • All personal information is stored <strong>securely and locally</strong><br>
      • Your data is <strong>never sold</strong> to third parties<br>
      • Only authorized NGO staff can access records<br>
      • You can request deletion of your data at any time<br><br>
      We comply with all applicable data protection regulations. Your trust is our priority.`,
  },
  {
    id: 'emergency',
    keywords: ['emergency', 'urgent', 'critical', 'serious', 'ambulance', '108', 'hospital', 'admit', 'icu', 'immediate'],
    answer: `🚨 <strong>Emergency Support</strong><br><br>
      For medical emergencies, please:<br>
      1. Call <strong>108</strong> (Free Emergency Ambulance)<br>
      2. Go to the nearest government hospital<br>
      3. Call our Emergency Helpline: <strong>+91-98765-43210</strong><br><br>
      Our team provides <strong>emergency referral letters</strong> and financial assistance for hospitalization. Don't wait — call us immediately!`,
  },
];

const FALLBACK_RESPONSE = `🤔 I'm not sure I understand that question fully. Here are some things I can help with:<br><br>
  • How to volunteer with us<br>
  • Medicine & treatment assistance<br>
  • Our services & eligibility<br>
  • Contact information<br>
  • Mental health support<br>
  • Donations<br><br>
  You can also <strong>fill out our form</strong> and a human coordinator will reach you shortly! 😊`;

const GREETING_MSG = `👋 Hi there! I'm <strong>HealthBot</strong>, your virtual assistant for HealthCare NGO.<br><br>
I can answer questions about our services, volunteering, medicine assistance, and more.<br><br>
How can I help you today? 😊`;

const SUGGESTIONS = [
  'How do I volunteer?',
  'What support do you offer?',
  'Medicine assistance',
  'Book appointment',
  'Mental health help',
  'How to donate?',
];

// ── State ─────────────────────────────────────────
let chatOpen = false;

// ── DOM Refs ──────────────────────────────────────
const fab       = document.getElementById('chatFab');
const chatWin   = document.getElementById('chatWindow');
const closeBtn  = document.getElementById('chatCloseBtn');
const msgList   = document.getElementById('chatMessages');
const inputEl   = document.getElementById('chatInput');
const sendBtn   = document.getElementById('chatSendBtn');
const suggBox   = document.getElementById('chatSuggestions');
const badge     = document.getElementById('chatBadge');

// ── Match Query to FAQ ────────────────────────────
function matchFAQ(query) {
  const q = query.toLowerCase().trim();
  let bestMatch = null;
  let maxScore = 0;

  for (const item of FAQ_KB) {
    let score = 0;
    for (const kw of item.keywords) {
      if (q.includes(kw.toLowerCase())) {
        // Weight longer keyword matches higher
        score += kw.length;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestMatch = item;
    }
  }
  return maxScore > 0 ? bestMatch : null;
}

// ── Append Message Bubble ─────────────────────────
function appendMessage(html, isUser = false) {
  const row = document.createElement('div');
  row.className = `msg-row ${isUser ? 'user' : 'bot'}`;

  const avatar = document.createElement('div');
  avatar.className = `msg-avatar ${isUser ? 'user-avatar' : 'bot-avatar'}`;
  avatar.textContent = isUser ? '👤' : '🤖';

  const bubble = document.createElement('div');
  bubble.className = `msg-bubble ${isUser ? 'user' : 'bot'}`;
  bubble.innerHTML = html;

  row.appendChild(avatar);
  row.appendChild(bubble);
  msgList.appendChild(row);
  msgList.scrollTop = msgList.scrollHeight;
}

// ── Typing Indicator ──────────────────────────────
function showTyping() {
  const row = document.createElement('div');
  row.className = 'msg-row bot';
  row.id = 'typingRow';

  const avatar = document.createElement('div');
  avatar.className = 'msg-avatar bot-avatar';
  avatar.textContent = '🤖';

  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble bot';
  bubble.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';

  row.appendChild(avatar);
  row.appendChild(bubble);
  msgList.appendChild(row);
  msgList.scrollTop = msgList.scrollHeight;
}

function removeTyping() {
  const el = document.getElementById('typingRow');
  if (el) el.remove();
}

// ── Send & Respond ────────────────────────────────
function sendMessage(text) {
  const query = text.trim();
  if (!query) return;

  appendMessage(query, true);
  inputEl.value = '';
  hideSuggestions();

  showTyping();

  setTimeout(() => {
    removeTyping();
    const faq = matchFAQ(query);
    appendMessage(faq ? faq.answer : FALLBACK_RESPONSE);
    showSuggestions();
  }, CHATBOT_CONFIG.typingDelay);
}

// ── Suggestions ───────────────────────────────────
function showSuggestions() {
  suggBox.innerHTML = '';
  SUGGESTIONS.forEach(s => {
    const btn = document.createElement('button');
    btn.className = 'suggestion-btn';
    btn.textContent = s;
    btn.onclick = () => sendMessage(s);
    suggBox.appendChild(btn);
  });
  suggBox.style.display = 'flex';
}

function hideSuggestions() {
  suggBox.style.display = 'none';
}

// ── Toggle Chat ───────────────────────────────────
function openChat() {
  chatOpen = true;
  chatWin.classList.add('open');
  fab.innerHTML = '✕';
  fab.setAttribute('aria-label', 'Close chat');
  if (badge) badge.style.display = 'none';
  setTimeout(() => inputEl.focus(), 400);
}

function closeChat() {
  chatOpen = false;
  chatWin.classList.remove('open');
  fab.innerHTML = '💬';
  fab.setAttribute('aria-label', 'Open healthcare chat assistant');
}

// ── Event Listeners ───────────────────────────────
fab.addEventListener('click', () => chatOpen ? closeChat() : openChat());
closeBtn.addEventListener('click', closeChat);

sendBtn.addEventListener('click', () => sendMessage(inputEl.value));
inputEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage(inputEl.value);
  }
});

// ── Init: Greeting ────────────────────────────────
setTimeout(() => {
  appendMessage(GREETING_MSG);
  showSuggestions();
}, CHATBOT_CONFIG.greetingDelay);
