# Quick Start

Get this running in 5 minutes.

## Prerequisites

Need these installed:
- Node.js 18+
- MongoDB 6+
- npm

Check versions:
```bash
node -v
npm -v
mongod --version
```

## 1. Install stuff

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

## 2. Environment files

```bash
# Backend
cd ../backend
cp .env.example .env

# Frontend
cd ../frontend
cp .env.example .env
```

Default values work fine for local dev. Don't need to change anything.

## 3. Start MongoDB

**Mac/Linux:**
```bash
mongod
```

**Windows:**
Should be running as a service already. If not, start it from the MongoDB bin folder.

## 4. Seed database

```bash
cd backend
npm run seed:hd        # adds 8 experiences
npm run seed:promo     # adds promo codes
```

Should see:
```
MongoDB Connected
Existing experiences cleared
✅ Successfully seeded 8 experiences!
✅ Successfully seeded 4 promo codes!
```

## 5. Run backend

Terminal 1:
```bash
cd backend
npm run dev
```

Look for:
```
Server running on port 5000
MongoDB Connected
```

## 6. Run frontend

Terminal 2:
```bash
cd frontend
npm run dev
```

Should see:
```
  Local:   http://localhost:5173/
```

## 7. Open browser

Go to http://localhost:5173

## Test it

1. Homepage shows 8 experiences
2. Click "Kayaking" or any card
3. Pick a date (Nov 5 or Nov 6)
4. Pick a time slot
5. Change quantity if you want
6. Click "Confirm"
7. Enter:
   - Name: whatever
   - Email: test@test.com
8. Promo code: WELCOME
9. Click "Apply" then "Pay and Confirm"
10. You'll see booking confirmation

## Promo codes to try

- SAVE10
- SAVE20 (needs ₹1000+ booking)
- FLAT100 (needs ₹500+ booking)
- WELCOME

## Troubleshooting

**Port 5000 busy:**
```bash
# Edit backend/.env
PORT=5001
```

**Port 5173 busy:**
Vite will auto-pick next available port.

**MongoDB error:**
```bash
# Check if running
pgrep mongod  # Mac/Linux
tasklist | findstr mongod  # Windows

# Or restart it
mongod
```

**Can't book slot:**
Slot might be full. Try a different time or reduce quantity.

**API not working:**
- Check backend is running (should see "Server running" message)
- Check http://localhost:5000/api/experiences in browser
- Frontend .env should have: VITE_API_URL=http://localhost:5000/api

## Common commands

Backend:
```bash
npm run dev      # start server
npm run seed:hd  # reset experiences
npm run seed:promo  # reset promo codes
```

Frontend:
```bash
npm run dev      # start dev server
npm run build    # production build
```

## What to test

- Search bar (try "kayaking" or "udupi")
- Quantity picker (increases/decreases, disables unavailable slots)
- Promo codes (success/error messages)
- Form validation (try empty email)
- Mobile view (resize browser)

## Next steps

Check README.md for more details on the codebase.

---

Something broken? Open an issue or check the console logs.
