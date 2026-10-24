# URL Shortener

A simple URL shortener built to learn backend development, databases, and deployment step by step.

## Goals

- Convert long URLs into short, shareable links.
- Redirect users from short links to their original destinations.
- Store URL mappings persistently using SQLite.
- Support custom vanity URLs.
- Avoid storing the same original URL multiple times.

## Tech Stack

- **Backend:** Node.js, Express
- **Frontend:** HTML, CSS, JavaScript
- **Database:** SQLite
- **Database Driver:** better-sqlite3

## Current Features

- Generate short codes for submitted URLs.
- Redirect short links to their original destinations.
- Store URL mappings in an SQLite database.
- Preserve mappings across server restarts.
- Validate submitted URLs and display error messages.
- Copy generated short links to the clipboard.
- Handle unknown short codes with a 404 response.

## Learning Objectives

- Understand HTTP requests and responses.
- Learn Express routing and middleware.
- Work with SQL queries and relational databases.
- Implement persistent storage.
- Handle input validation and errors.
- Learn deployment and domain configuration.

## Project Status

Currently under development. Built as a hands-on project to learn backend development through implementation, testing, and debugging.