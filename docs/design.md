# URL Shortener — Design Document

## 1. What can a user do?

The user should be able to:
- Enter a long URL and generate a shortened URL.
- Copy the shortened URL.
- Visit the shortened URL to reach the original website.

## 2. What information should be stored?

The links table will contain:
- id: A unique identifier for each link.
- code: The unique short code.
- original_url: The original URL entered by the user.
- clicks: The number of times the shortened URL is visited.
- created_at: The date and time the link was created.

## 3. What happens when a code doesn't exist?

The server should return a 404 Not Found response.

The user should see a message explaining that the shortened URL
does not exist or is invalid.

## 4. What happens when a user submits an invalid URL?

The application should validate the submitted URL.

If the URL is invalid, the application should display an error
message and should not create a shortened link.

The application should also reject URLs that point back to
the shortener itself.

## 5. What happens when a short code already exists?

The application must ensure that every short code is unique.

The database will enforce uniqueness on the code column.

If the generated code already exists, the application will
generate another code and check again before saving the link.