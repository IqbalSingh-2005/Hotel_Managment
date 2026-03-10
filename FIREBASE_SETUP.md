# Setup Guide

This project requires **no external services** to run. Authentication and data are stored entirely in the browser's **localStorage**.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Open in browser
# http://localhost:5173
```

That's it — no API keys, no accounts, no `.env` file needed.

## How Authentication Works

User accounts are stored in `localStorage` under the key `hotel_users`. When you sign up, a new entry is added. When you log in, the credentials are matched against stored users and a session is saved to `hotel_session`.

To create your first account, go to `/signup` in the app.

## How Room Data Works

The six sample rooms (Deluxe Suite, Executive Room, Family Suite, Premium Suite, Standard Room, Honeymoon Suite) are automatically seeded into `localStorage` under `hotel_rooms` the first time the booking page is visited.

## localStorage Keys

| Key | Description |
|-----|-------------|
| `hotel_users` | All registered users |
| `hotel_session` | Currently logged-in user session |
| `hotel_rooms` | Room catalogue (auto-seeded on first use) |
| `hotel_bookings` | All booking records |
| `hotel_reviews` | Room reviews |

## Resetting Data

To reset all app data, open the browser console and run:

```javascript
['hotel_users','hotel_session','hotel_rooms','hotel_bookings','hotel_reviews']
  .forEach(k => localStorage.removeItem(k));
location.reload();
```

## Production Build

```bash
npm run build
npm run preview
```
