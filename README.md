# 🚨 SOS Health

> Hackathon #1 – Developers Institute, Full-Stack & AI Bootcamp

**SOS Health** is a mobile-first web app with a big emergency button for people who feel in medical danger.

⚠️ *This is a learning prototype built during a hackathon. It is not a certified emergency service. In a real emergency, call your local emergency number directly (Israel: **101**, Magen David Adom).*

---

## ✨ Planned features

### Core (MVP)
- [ ] **SOS button** – one big button, easy to press on a phone
- [ ] **GPS location** – get the user's position (`navigator.geolocation`)
- [ ] **Address lookup** – turn the coordinates into an address with a public API
- [ ] **Call emergency services** – one-tap call to 101 (`tel:` link)
- [ ] **Medical profile** – create / edit / delete: blood type, allergies, medications, emergency contacts (saved in LocalStorage)

### Extra (if time allows)
- [ ] **Nearest hospitals** – list the closest hospitals with the OpenStreetMap API
- [ ] **Alert message** – ready-to-share message with location + medical info for emergency contacts
- [ ] **Alert history** – list of past alerts (saved in LocalStorage)

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

_Instructions will be added during the hackathon._

---

## 👤 Author

Nathan De Pape – [@nathandepape-dotcom](https://github.com/nathandepape-dotcom)
