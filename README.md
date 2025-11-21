# Pet Hub

Monorepo for a pet services app — mobile (Expo/React Native), web (React + Vite), and server (Express + PostgreSQL).

## Project Overview

- Mobile: Expo Router app using React Native, NativeWind and Zustand for state. (folder: `mobile`)
- Web: React + Vite app for web UI (folder: `web`).
- Server: Node/Express REST API using PostgreSQL (folder: `server`).

The server exposes endpoints under `/api/*` (auth, external, bookings). The `server` tests the DB connection on startup.

## Repo Structure

- `mobile/` — Expo React Native app. Run with the Expo CLI.
- `server/` — Express backend. Uses `pg` for Postgres and loads env vars with `dotenv`.
- `web/` — Web frontend built with Vite and React.

## Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- PostgreSQL database for the server
- Expo CLI (for running the mobile app): `npm install -g expo-cli` (optional if you use `npx expo`)

## Environment (server)

Create a `.env` file in `server/` (not committed) with these variables as needed:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pet_hub
DB_USER=postgres
DB_PASSWORD=your_password
PORT=3000
JWT_SECRET=your_jwt_secret
```

The database defaults in `server/database.js` will pick sensible defaults if env vars are missing, but you should set them for production.

## Setup & Run

- Server

  ```bash
  cd server
  npm install
  # development with auto-reload
  npm run dev
  # or production
  npm start
  ```

  The server listens on `PORT` (default 3000) and exposes routes mounted at `/api/auth`, `/api/external`, and `/api/bookings`.

- Mobile (Expo)

  ```bash
  cd mobile
  npm install
  npm start
  # or run on device/emulator
  npm run android
  npm run ios
  ```

- Web

  ```bash
  cd web
  npm install
  npm run dev
  ```

## Notes & Tips

- The server will run `testConnection()` on startup and log database connection status to the console.
- If you get connection errors, verify Postgres is running and `.env` values are correct.
- The mobile app uses `expo-router` (entry `expo-router/entry`) and expects the server API to be reachable from the device/emulator; set API base URL accordingly in `config/api.js`.

## Contributing

- Run the relevant app locally (server + mobile/web) and open a PR for changes.
- Keep env secrets out of git; use `.env` and add to `.gitignore`.

## License

This repository does not contain a license file. Add one if you plan to open-source the project.

---

If you'd like, I can also:
- Add example `.env.example` to `server/`.
- Add a short CONTRIBUTING.md with dev workflow.
- Update `config/api.js` with an environment-aware base URL for mobile/web.
