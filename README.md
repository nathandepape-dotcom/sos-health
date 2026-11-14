# 🚨 SOS Health

> Hackathon #1 – Developers Institute, Full-Stack & AI Bootcamp

**SOS Health** is a mobile-first web app with a big emergency button for people who feel in medical danger.

🌐 **Live demo:** https://nathandepape-dotcom.github.io/sos-health/ (open it on your phone – location needs HTTPS)

🎥 **Video demo (2 min):** https://drive.google.com/file/d/13M_obl8-1wU9i8R56dcvZIYJEjdE_XfN/view?usp=drive_link

⚠️ *This is a learning prototype built during a hackathon. It is not a certified emergency service. In a real emergency, call your local emergency number directly (Israel: **101**, Magen David Adom).*

---

## ✨ Features

### Done
- [x] **SOS button** – one big button, easy to press on a phone
- [x] **GPS location** – `navigator.geolocation` with a 10 s timeout, so the user never waits forever
- [x] **Address lookup** – coordinates → readable address with the OpenStreetMap **Nominatim API** (`fetch` + `async/await`, `try/catch` fallback)
- [x] **Medical profile** – save / load / delete: name, blood type, allergies, medications, emergency contact (**LocalStorage** + **JSON**)
- [x] **SMS alert** – pre-filled SMS to the emergency contact with name, address, Google Maps link and medical info (no need to speak or type)
- [x] **Call buttons** – one tap to call 101 (Magen David Adom) or the emergency contact
- [x] **Emergency medical sheet** – full-screen sheet shown when calling, readable by rescuers at a glance

### Next ideas
- [ ] Long press (2 s) on SOS to avoid accidental alerts
- [ ] Nearest hospitals (OpenStreetMap Overpass API)
- [ ] Alert history

---

## 🧭 How it works

1. **Before** an emergency: fill in the medical profile once.
2. **During** an emergency: press **SOS** → the app finds the location and the address.
3. One tap to **send the SMS alert** or **call** 101 / the emergency contact.
4. The **medical sheet** is displayed full screen for rescuers.

---

## 🛠️ Tech stack

- **TypeScript** (types & interfaces)
- **DOM manipulation**
- **Fetch API** with `async / await`
- **JSON**
- **LocalStorage** as database
- Public APIs: OpenStreetMap (Nominatim / Overpass)

---

## 🌿 Git workflow

- `main` → stable version, only for the final working project
- `dev` → integration branch
- `feature/<name>` → one branch per feature, merged into `dev`

---

## 🚀 Getting started

```bash
npm install     # install the tools (TypeScript, Vite)
npm run dev     # start the local server, then open the link shown (http://localhost:5173)
npm run build   # build the production version in dist/
```

---

## 🧩 Limits & future vision

- A web page cannot call or send an SMS **by itself** (browser security): the user always confirms with one tap.
- Laptops estimate their location from Wi-Fi, so it can be off by ~1 km; phones use real GPS.
- Future: a real backend + an official partnership with emergency services, to send the location and the medical sheet **directly** to the dispatch center.

---

## 👤 Author

Nathan De Pape – [@nathandepape-dotcom](https://github.com/nathandepape-dotcom)
