# Todo App Backend

REST API for a todo application built with **Node.js**, **Express**, and **MongoDB** using an **MVC-style** layout and **Mongoose** for data modeling. Part of the NTI MEAN stack curriculum (session: Backend Node.js — MVC & Mongoose).

## Tech stack

- [Express](https://expressjs.com/) — HTTP server and routing
- [Mongoose](https://mongoosejs.com/) — MongoDB ODM
- [bcrypt](https://www.npmjs.com/package/bcrypt) — password hashing
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) — JWT on login
- [validator](https://www.npmjs.com/package/validator) — user field validation
- [dotenv](https://www.npmjs.com/package/dotenv) — environment variables

## Prerequisites

- Node.js (with ES modules support)
- MongoDB running locally (default connection uses `mongodb://localhost:27017/NTI-Day3`)

## Setup

1. Clone the repository and open the project folder.

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root with a secret for JWT signing:

   ```env
   JWT_SECRET=your_secret_key_here
   ```

4. Start MongoDB so the app can connect to the database named in `src/DB/connection/connection.js`.

5. Run the server:

   ```bash
   npm run dev
   ```

   The app listens on **port 3000** by default (`http://localhost:3000`).

## Project structure

- `index.js` — application entry point
- `src/controllers/` — request handlers (app bootstrap, users, todos)
- `src/routes/` — route definitions
- `src/DB/models/` — Mongoose schemas (User, Todo)
- `src/DB/connection/` — database connection
- `src/static/` — static files served by Express

## API overview

Base URL: `http://localhost:3000`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Health / welcome JSON |
| GET | `/users` | List all users |
| POST | `/users` | Sign up (body: `firstName`, `lastName`, `userName`, `password`, optional `dateOfBirth`) |
| POST | `/users/login` | Sign in (body: `userName`, `password`) — returns JWT |
| PATCH | `/users/:id` | Update user |
| DELETE | `/users/:id` | Delete user |
| GET | `/todos` | List all todos |
| POST | `/todos` | Create todo (body includes `userId`, `title`, `status`) |
| PATCH | `/todos/:id` | Update todo |
| DELETE | `/todos/:id` | Delete todo |

> **Note:** Todos reference users via `userId` in the schema; listing or filtering by user is planned (see below).

## Coming soon

Planned enhancements include:

- **Return the todos of a specific user** — endpoints or query parameters to fetch todos scoped to one user.
- **Return the posts with specific required filters** — filtered listing (e.g. query params for status, date range, or other criteria). *(If your API uses only todos, this will map to filtered todo listing.)*

---

You can push this repository to GitHub when you are ready; nothing here assumes an automated deploy step.
