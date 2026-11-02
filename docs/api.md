# API Documentation

This document describes the API endpoints provided by the URL Shortener application.

## 1. Create a Shortened URL

**Endpoint:** `POST /shorten`

**Description:** Accepts a URL, validates it, generates a unique short code, and stores the URL mapping in the SQLite database.

### Request Body

Content-Type: `application/json`

```json
{
    "url": "https://www.youtube.com"
}
```

### Successful Response

**Status Code:** `200 OK`

```json
{
    "shortUrl": "http://localhost:3000/abc123"
}
```

### Possible Error Responses

| Status Code | Description |
|---|---|
| 400 | URL is missing, invalid, or uses an unsupported protocol. |
| 500 | Database error or failure to generate a unique short code. |

---

## 2. Redirect to Original URL

**Endpoint:** `GET /:code`

**Description:** Looks up the supplied short code in the database, increments its click counter, and redirects the user to the original URL.

### Example Request

```http
GET /abc123
```

### Successful Response

**Status Code:** `302 Found`

The server redirects the user to the original URL.

### Possible Error Responses

| Status Code | Description |
|---|---|
| 400 | Invalid short-code format. |
| 404 | Short code does not exist. |
| 500 | Database error while retrieving the URL. |

---

## 3. Retrieve Link Statistics

**Endpoint:** `GET /stats/:code`

**Description:** Retrieves information about a shortened URL using its short code.

### Example Request

```http
GET /stats/abc123
```

### Successful Response

**Status Code:** `200 OK`

```json
{
    "code": "abc123",
    "original_url": "https://www.youtube.com",
    "clicks": 5,
    "created_at": "2026-11-02 10:30:00"
}
```

### Possible Error Responses

| Status Code | Description |
|---|---|
| 400 | Invalid short-code format. |
| 404 | Short code does not exist. |
| 500 | Database error while retrieving statistics. |

---

## Notes

- Short codes contain six lowercase alphanumeric characters.
- Short codes are generated using Node.js's cryptographically secure random number generator.
- The database enforces uniqueness through the primary key constraint.
- Click statistics count total visits, not unique visitors.
- All database queries involving user input use parameterized SQL queries.