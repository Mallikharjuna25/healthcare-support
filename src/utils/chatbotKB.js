// ── FAQ Knowledge Base ─────────────────────────────
// Rule-based chatbot — keyword matching, no API key needed
export const FAQ_KB = [
  {
    id: 'volunteer',
    keywords: ['volunteer', 'volunteering', 'join', 'sign up', 'register as volunteer', 'want to volunteer', 'help'],
    answer: `🙌 <strong>How to Volunteer with Us</strong><br><br>
We'd love to have you! Here's how:<br>
1. Visit the <strong>Volunteer</strong> page and fill out the registration form.<br>
2. Our coordinator will contact you within <strong>48 hours</strong>.<br><br>
Volunteers help with patient outreach, medicine distribution, and health camps! 💙`,
  },
  {
    id: 'medicine',
    keywords: ['medicine', 'medication', 'drugs', 'prescription', 'tablet', 'treatment', 'medical supply', 'medicine assistance'],
    answer: `💊 <strong>Medicine Assistance Program</strong><br><br>
We provide free or subsidized medicines to eligible patients:<br>
1. Submit a request via the <strong>Patient Support</strong> page.<br>
2. Mention your medication needs in the message field.<br>
3. Bring a doctor's prescription to our office.<br><br>
We cover essential medicines for <em>chronic illnesses, maternal health, and pediatric care</em>.`,
  },
  {
    id: 'support',
    keywords: ['support', 'what support', 'services', 'what do you offer', 'what can you help', 'assistance', 'offer', 'provide'],
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
Reach us through:<br>
• 📧 Email: <strong>support@healthngo.org</strong><br>
• 📱 Helpline: <strong>1800-123-4567</strong> (Mon–Sat 9am–6pm)<br>
• 🏢 Office: 12 Wellness Lane, Sector 4, Hyderabad<br><br>
Or use the <strong>Contact</strong> page and we'll reach you within 24 hours!`,
  },
  {
    id: 'eligibility',
    keywords: ['eligible', 'eligibility', 'who can', 'qualify', 'criteria', 'bpl', 'below poverty', 'income'],
    answer: `✅ <strong>Eligibility Criteria</strong><br><br>
Our services are open to:<br>
• Families below the poverty line (BPL card holders)<br>
• Uninsured individuals with chronic conditions<br>
• Pregnant women & children under 5<br>
• Senior citizens (60+) without family support<br>
• Migrant workers and daily-wage earners<br><br>
<em>Not sure?</em> Submit a form and our team will guide you personally.`,
  },
  {
    id: 'appointment',
    keywords: ['appointment', 'book', 'schedule', 'checkup', 'check-up', 'camp', 'health camp', 'doctor', 'clinic'],
    answer: `📅 <strong>Book an Appointment / Health Camp</strong><br><br>
Access our doctors in two ways:<br>
1. <strong>Health Camps</strong> — Free camps every 2nd Saturday. Fill the Patient Support form to get notified.<br>
2. <strong>Walk-in Clinics</strong> — Visit partner clinics with our NGO referral letter.<br><br>
Submit your details and we'll send the nearest camp schedule! 📆`,
  },
  {
    id: 'mental_health',
    keywords: ['mental', 'depression', 'anxiety', 'stress', 'counseling', 'counselling', 'psychiatrist', 'therapy', 'emotional', 'mental health'],
    answer: `🧘 <strong>Mental Health Support</strong><br><br>
We take mental well-being seriously:<br>
• Free 1-on-1 counseling sessions<br>
• Telehealth with licensed psychologists<br>
• Support groups for depression & anxiety<br>
• Crisis helpline available <strong>24/7</strong><br><br>
💙 You're not alone. Mark your message as "Mental Health Support" when submitting the form.`,
  },
  {
    id: 'donate',
    keywords: ['donate', 'donation', 'fund', 'contribute', 'money', 'financial help', 'sponsor', 'support us', 'give back'],
    answer: `❤️ <strong>Support Our Mission</strong><br><br>
Your donations power our free services:<br>
• 🏦 UPI/NEFT bank transfer (details on Contact page)<br>
• 💻 Online at: <strong>www.healthngo.org/donate</strong><br>
• 📦 Donate medicines or medical equipment<br><br>
All donations are <strong>80G tax-exempt</strong>. Thank you! 🙏`,
  },
  {
    id: 'privacy',
    keywords: ['privacy', 'data', 'information', 'safe', 'secure', 'confidential', 'personal data'],
    answer: `🔒 <strong>Your Privacy Matters</strong><br><br>
We take data privacy seriously:<br>
• All info stored <strong>securely and locally</strong><br>
• Your data is <strong>never sold</strong> to third parties<br>
• Only authorized staff can access records<br>
• Request deletion of your data anytime<br><br>
We comply with all data protection regulations. Your trust is our priority.`,
  },
  {
    id: 'emergency',
    keywords: ['emergency', 'urgent', 'critical', 'serious', 'ambulance', '108', 'hospital', 'immediate'],
    answer: `🚨 <strong>Emergency Support</strong><br><br>
For medical emergencies:<br>
1. Call <strong>108</strong> (Free Emergency Ambulance)<br>
2. Go to the nearest government hospital<br>
3. Call our Emergency Helpline: <strong>+91-98765-43210</strong><br><br>
We provide <strong>emergency referral letters</strong> and hospitalization assistance. Call us immediately!`,
  },
];

export const FALLBACK_RESPONSE = `🤔 I'm not sure I understand that fully. Here are some things I can help with:<br><br>
• How to volunteer with us<br>
• Medicine & treatment assistance<br>
• Our services & eligibility<br>
• Contact information<br>
• Mental health support<br>
• Book an appointment<br><br>
You can also use any of the quick-reply buttons above! 😊`;

export const GREETING_MSG = `👋 Hi there! I'm <strong>HealthBot</strong>, your virtual assistant.<br><br>
I can answer questions about our services, volunteering, medicine, and more.<br>
How can I help you today? 😊`;

export const SUGGESTIONS = [
  'How do I volunteer?',
  'What services do you offer?',
  'Medicine assistance',
  'Book appointment',
  'Mental health help',
  'How to donate?',
  'Emergency support',
];

// ── Keyword matcher (scores by keyword length) ─────
export function matchFAQ(query) {
  const q = query.toLowerCase().trim();
  let bestMatch = null;
  let maxScore = 0;
  for (const item of FAQ_KB) {
    let score = 0;
    for (const kw of item.keywords) {
      if (q.includes(kw.toLowerCase())) score += kw.length;
    }
    if (score > maxScore) { maxScore = score; bestMatch = item; }
  }
  return maxScore > 0 ? bestMatch : null;
}
