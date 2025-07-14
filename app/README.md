
# Mflix Movies App

An interactive movie browser built with React, Node.js, and MongoDB, featuring the [MongoDB Sample Mflix Dataset](https://www.mongodb.com/docs/atlas/sample-data/sample-mflix/).

## Features

- Browse, search, and filter movies from the Mflix dataset
- Pagination with page size selection and jump-to-page
- Responsive movie grid with poster images
- Click a movie to view detailed info in a modal (plot, genres, cast, directors, ratings, awards, etc.)
- Backend API with search and pagination, powered by Express and MongoDB

## Project Structure

- `app/` — React frontend (TypeScript, Create React App)
- `server/` — Node.js backend (Express, MongoDB)

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB Atlas account (or local MongoDB with the sample_mflix database)

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd mongodb-ts-assessment
```

### 2. Setup the Backend
1. Copy `.env.example` to `.env` in the `server/` folder and set your `MONGODB_URI`.
2. Install dependencies:
   ```bash
   cd server
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
   The API will run on [http://localhost:4000](http://localhost:4000) by default.

### 3. Setup the Frontend
1. In a new terminal, go to the `app/` folder:
   ```bash
   cd ../app
   npm install
   ```
2. Start the React app:
   ```bash
   npm start
   ```
   The app will run on [http://localhost:3000](http://localhost:3000).

### 4. Proxy Setup
The React app is configured to proxy `/api` requests to the backend server. Make sure both servers are running.

## API Endpoints

- `GET /api/movies?page=1&limit=10&search=title` — List movies with pagination and optional title search

## Customization

- Update the UI or add new features in `app/src/App.tsx`
- Extend backend logic in `server/src/server.ts`

## License

MIT
