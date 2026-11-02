# URL Shortener

A simple URL shortener built to learn backend development, databases, and deployment step by step.

## Goals

- Convert long URLs into short, shareable links.
- Redirect users from short links to their original destinations.
- Store URL mappings persistently using SQLite.
- Learn backend development through practical implementation and testing.
- Understand database management and deployment.

## Tech Stack

- **Backend:** Node.js, Express
- **Frontend:** HTML, CSS, JavaScript
- **Database:** SQLite
- **Database Driver:** better-sqlite3

## Current Features

- Generate cryptographically secure, random short codes.
- Redirect short links to their original destinations.
- Store URL mappings in an SQLite database.
- Preserve mappings across local server restarts.
- Track the total number of clicks for each shortened URL.
- Record the creation timestamp of shortened links.
- View link statistics using a short code or shortened URL.
- Copy generated short links to the clipboard.
- Validate submitted URLs and allow only HTTP and HTTPS protocols.
- Prevent links pointing to the application's configured origin from being shortened.
- Validate short-code formats on the backend.
- Handle duplicate short-code collisions with a retry mechanism.
- Handle invalid URLs, unknown short codes, and server errors.
- Display error messages on the frontend.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/shorten` | Generate a shortened URL. |
| GET | `/:code` | Redirect to the original URL. |
| GET | `/stats/:code` | Retrieve statistics for a shortened URL. |

## Learning Objectives

- Understand HTTP requests and responses.
- Learn Express routing and middleware.
- Work with SQL queries and relational databases.
- Implement persistent storage.
- Understand cryptographically secure random generation.
- Implement input validation and error handling.
- Learn frontend-backend communication using the Fetch API.
- Learn deployment and domain configuration.

## Project Structure

```text
url-shortener/
├── public/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   ├── stats.html
│   ├── stats.css
│   └── stats.js
├── src/
│   ├── server.js
│   └── database.js
├── docs/
│   └── design.md
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Installation and Setup

### Prerequisites

- [Node.js](https://nodejs.org/) and npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Devfinity/url-shortener.git
```

### 2. Navigate to the project directory

```bash
cd url-shortener
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the server

```bash
node src/server.js
```

### 5. Open the application

Visit the following address in your browser:

```text
http://localhost:3000
```

The SQLite database is initialized automatically when the server starts. The local database file (`urls.db`) is not included in the repository.

## Project Status

Currently under development. The core URL-shortening functionality, statistics system, and frontend integration are implemented.

Documentation and deployment are the remaining major milestones.

Built as a hands-on project to learn backend development through implementation, testing, and debugging.