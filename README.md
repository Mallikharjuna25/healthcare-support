# HealthCare NGO — Mini Healthcare Support Web App

**Live demo:** https://healthcaresupport24hr.netlify.app/

A lightweight, fully client-side web app that lets patients request support
and volunteers register with an NGO — built as a concept-level prototype for
an internship assignment.

## Tech stack
- **React 18 + Vite** — component-based UI, fast dev/build tooling
- **React Router (BrowserRouter)** — multi-page routing (`App.jsx`/`main.jsx`)
- **Plain CSS** — no UI framework, custom design system
- **Browser `localStorage` / `sessionStorage`** — acts as the "database" for
  submissions, contacts, and admin session state; no backend or DB required
- **Web Speech API** (`SpeechRecognition`) — native browser speech-to-text,
  no third-party key needed

No server, database, or API key is required to run or deploy this project.

## AI / automation idea
Two complementary automation features, both rule-based and fully client-side:

1. **FAQ chatbot** (`ChatBot.jsx` + `chatbotKB.js`) — a floating chat widget
   on every page that matches user questions against keywords for ~10 common
   NGO questions (volunteering, medicine assistance, eligibility, location,
   emergencies, etc.) and replies instantly, with quick-reply suggestion
   chips. Chat history persists across page navigation via `sessionStorage`.
2. **Auto-Summarize AI report** (admin dashboard) — scans every stored
   submission to generate a live narrative summary: total counts and the
   patient-to-volunteer ratio, urgent cases flagged by scanning messages for
   words like *urgent*, *emergency*, *severe*, and a topic breakdown
   (Medicines, Maternal Health, Mental Health, General).

Both are intentionally rule-based rather than calling a paid LLM — free,
instant, and works with zero backend, which matters for an NGO with limited
budget. `matchFAQ()`/the summary logic could later be swapped for a real
LLM call without changing the rest of the app.

A third accessibility feature worth noting: a reusable **voice-input button**
(`VoiceInput.jsx`) on the Patient, Volunteer, and Contact forms lets users
dictate their message instead of typing, with a graceful disabled state and
tooltip on browsers that don't support speech recognition.

## NGO use-case
Small healthcare NGOs typically manage patient requests and volunteer
sign-ups through scattered WhatsApp messages or paper forms, making it hard
to track who needs help and who's available. This app gives them:
1. **Dedicated forms** for patients and volunteers, so intake is structured
   from day one
2. **Voice input** so users with low literacy, limited typing ability, or
   visual impairments can submit a request just by speaking
3. **An always-on FAQ chatbot** that answers the questions coordinators get
   asked most often, freeing staff time for cases that need a human
4. **An admin dashboard with auto-summary and urgency flagging**, so a
   coordinator can triage at a glance instead of reading every entry

## Demo admin credentials
The admin login is a client-side demo gate only (no backend auth) — the
credentials are **not shown anywhere in the live UI**.

```
URL:      /admin/login
Username: admin
Password: admin123
```

> ⚠️ This is sample-only for evaluation purposes. It is not secure for a
> real production deployment — a live version would need real
> authentication and a backend.

## Project structure
```
src/
  App.jsx, main.jsx        — routing setup (BrowserRouter)
  utils/
    storage.js              — localStorage helpers, demo data seeding
    chatbotKB.js             — chatbot keyword-matching knowledge base
  components/
    ProtectedRoute.jsx       — guards the admin dashboard route
    VoiceInput.jsx           — reusable mic-to-text button
    ChatBot.jsx              — floating FAQ chatbot widget
  pages/
    Home.jsx                 — hero, mission, stats, process flow
    About.jsx                — vision, mission, who we help
    PatientSupport.jsx       — patient registration form
    Volunteer.jsx            — volunteer registration form
    Contact.jsx               — contact info + inquiry form
    AdminLogin.jsx             — admin sign-in
    AdminDashboard.jsx         — submissions table, search, auto-summary
```

## Running locally
```bash
npm install
npm run dev
```

## Building & deploying
```bash
npm run build      # outputs static files to dist/
```
Deployed on **Netlify**: connect the GitHub repo, set build command
`npm run build` and publish directory `dist`.

## Limitations
Data lives in each visitor's browser only (`localStorage`), so submissions
aren't shared across devices — fine for a prototype, but a real deployment
would need a backend (Firebase, Supabase, or a small Node/Express API) so
all admins see the same data, plus real authentication for the admin area.
