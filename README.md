# BookIt

Travel booking app for experiences across India. Pick a date, book a slot, done.

## What it does

Browse experiences (kayaking, food tours, hot air balloons, etc), check availability, book time slots. Basic stuff but works.

Built this with React + Node + MongoDB. Nothing fancy.

## Stack

**Frontend:**
- React 19 + TypeScript
- Vite for dev server
- TailwindCSS
- React Router

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- Some basic validation

## Setup

You need Node 18+, MongoDB, and npm.

**Backend:**
```bash
cd backend
npm install
cp .env.example .env
npm run seed:hd        # loads sample data
npm run seed:promo     # adds promo codes
npm run dev
```

Backend runs on port 5000.

**Frontend:**
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend runs on port 5173.

Make sure MongoDB is running first (`mongod`).

## Project structure

```
backend/
  ├── src/
  │   ├── controllers/    # route handlers
  │   ├── models/         # mongoose schemas
  │   ├── routes/         # express routes
  │   └── utils/          # seed scripts
  └── package.json

frontend/
  ├── src/
  │   ├── components/     # navbar, cards, etc
  │   ├── pages/          # home, details, checkout
  │   ├── services/       # api calls
  │   └── types/          # typescript stuff
  └── package.json
```

## API

```
GET  /api/experiences           # list all
GET  /api/experiences/:id       # get one
POST /api/bookings              # create booking
GET  /api/bookings/:reference   # get booking
POST /api/promo/validate        # check promo code
```

## Features

- Search bar (filters by title, location, category)
- Date/time slot selection
- Quantity picker (checks availability)
- Promo codes (SAVE10, SAVE20, FLAT100, WELCOME)
- Booking confirmation

## How to use it

1. Browse experiences on homepage
2. Click one to see details
3. Pick a date and time slot
4. Choose how many people
5. Hit checkout
6. Enter name + email
7. Apply promo code if you want
8. Confirm booking
9. Get confirmation with reference number

## Promo codes

Test these:
- **SAVE10** - 10% off
- **SAVE20** - 20% off (min ₹1000)
- **FLAT100** - flat ₹100 off (min ₹500)
- **WELCOME** - flat ₹200 off

## Issues I know about

- No authentication (anyone can book)
- No payment integration (just simulated)
- No email confirmations
- Mobile UI could be better
- Images are placeholders

## If something breaks

**MongoDB won't connect:**
Check if it's running. Try `mongod --version` first.

**Port already in use:**
Change PORT in backend/.env or kill whatever's using it.

**API calls failing:**
Make sure backend is running and VITE_API_URL in frontend/.env points to it.

**Slot booking fails:**
Probably not enough availability. Pick a different slot or reduce quantity.

## Deployment

Haven't deployed this yet but here's the plan:

- Backend: Railway or Render (free tier works)
- Frontend: Vercel or Netlify
- Database: MongoDB Atlas (free M0 cluster)

Update MONGODB_URI in backend and VITE_API_URL in frontend after deploying.

## Todo (maybe)

- Add user accounts
- Real payment gateway
- Email notifications
- Review system
- Admin panel
- Better mobile experience
- Image uploads
- Cancellation flow

## License

ISC

---

That's it. Questions? Open an issue.
