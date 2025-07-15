
# Mflix Movies App

An interactive movie browser built with React, Node.js, and MongoDB, featuring the [MongoDB Sample Mflix Dataset](https://www.mongodb.com/docs/atlas/sample-data/sample-mflix/).

![](docs/ss01.png)

## Purpose

This project can be used during a technical interview to assess the JavaScript/TypeScript programming capabilities of a candidate. Successful completion of the assessment would result in a web application that can interact with a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster that has been pre-loaded with the [`sample_mflix` dataset](https://www.mongodb.com/docs/atlas/sample-data/sample-mflix/).

### Tasks

* Clone the repository
* Install dependencies, start all processes and try navigating to https://localhost:3000
* Using the API only, access the 10th page of results with a page size of 25
* The page sizes of 10, 25, 50 and 100 seem like too many - remove 100 from the UI
* Each movie contains an IMDB rating. Adapt the solution to enable filtering for movies with a rating greater than a given value, but less than 10

-------

## Features

- Browse, search, and filter movies from the `sample_mflix` dataset
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
- MongoDB Atlas account (or local MongoDB with the `sample_mflix` dataset)

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd mongodb-ts-assessment
```

### 2. Setup the Backend
1. Copy `.env.example` to `.env` in the `server/` folder and set your `MONGODB_URI`. For more information as to where to find this value see ["Find Your MongoDB Atlas Connection String"](https://www.mongodb.com/docs/manual/reference/connection-string/#find-your-mongodb-atlas-connection-string).
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

## License

MIT
