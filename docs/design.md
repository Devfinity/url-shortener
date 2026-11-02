# URL Shortener — Design Document

## 1. What can a user do?

The user should be able to:

- Enter a long URL and generate a shortened URL.
- Copy the shortened URL to the clipboard.
- Visit the shortened URL to reach the original website.
- Search for link statistics using a short code or shortened URL.
- View the original URL, total clicks, and creation timestamp.

## 2. What information should be stored?

The `urls` table contains:

- `code`: The unique short code used to access the original URL.
- `original_url`: The original URL entered by the user.
- `clicks`: The total number of times the shortened URL has been visited.
- `created_at`: The date and time the shortened URL was created.

The `code` column acts as the primary key, ensuring that every short code is unique.

## 3. What happens when a code doesn't exist?

The server should return a `404 Not Found` response.

- For shortened URLs, the user should see a message explaining that the short link doesn't exist.
- For statistics requests, the server should return an appropriate error message.

## 4. What happens when a user submits an invalid URL?

The application should validate the submitted URL.

- Reject empty or whitespace-only input.
- Accept only HTTP and HTTPS protocols.
- Reject malformed URLs.
- Prevent users from shortening URLs that point to the application's configured origin.

If validation fails, the application should return an appropriate error message without creating a shortened link.

## 5. What happens when a short code already exists?

The application must ensure that every short code is unique.

- Short codes are generated using cryptographically secure random values.
- The database enforces uniqueness through the primary key constraint.
- If a generated code already exists, the application generates another code and retries the insertion.
- The application allows a maximum of 10 generation attempts before returning an error.

## 6. How are clicks tracked?

Whenever someone visits a valid shortened URL, the application increments its click counter by one.

The counter tracks total visits, not unique visitors.

If updating the click counter fails, the application still attempts to redirect the user to the original destination.

## 7. How are link statistics retrieved?

The application provides a statistics endpoint:

`GET /stats/:code`

It retrieves the following information:

- Short code.
- Original URL.
- Total clicks.
- Creation timestamp.

If the code doesn't exist, the server returns a `404 Not Found` response.

## 8. How is data stored?

The application uses SQLite with the `better-sqlite3` driver.

- URL mappings are stored in the `urls` table.
- Parameterized SQL queries are used when interacting with the database.
- Data persists across ordinary local server restarts.
- The database is initialized automatically when the server starts.