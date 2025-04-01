# Backend API - README

## Overview

This is the backend service for the project, handling authentication, user management, two-factor authentication (2FA), and database interactions.

## Project Structure

```
Backend Folder
|- controllers
   |- adminController.js
   |- authController.js
   |- twoFactorController.js
   |- userController.js
|- DB
   |- connect.js
|- models
   |- Usermodel
      |- index.js
      |- user2FA.js
      |- userAuth.js
      |- userProfile.js
      |- userQueries.js
|- routes
   |- adminRoutes.js
   |- authRoutes.js
   |- index.js
   |- twoFactorRoutes.js
   |- userRoutes.js
|- utils
   |- auth.js
   |- emailService.js
   |- verification.js
|-.env
|- server.js
```

## Installation & Setup

1. **Clone the repository:**

   ```sh
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Create a **``** file** and configure the following variables:

   ```sh
   DB_HOST=your_database_host
   DB_PORT=your_database_port
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   JWT_SECRET=your_secret_key
   ```

4. **Start the backend server:**

   ```sh
   npm start
   ```

## Features

### Authentication

- User registration with email verification
- User login with password hashing
- Two-Factor Authentication (2FA) support
- JWT-based authentication

### User Management

- CRUD operations for user accounts
- Role-based authorization
- Profile updates

### Admin Functions

- Retrieve all users
- Delete users

### Database

- MySQL with a connection pool

## API Endpoints

### Authentication Routes

| Method | Endpoint         | Description                 |
| ------ | ---------------- | --------------------------- |
| POST   | `/auth/register` | Register a new user         |
| POST   | `/auth/login`    | Login and receive JWT token |
| GET    | `/auth/verify`   | Verify email using token    |
| POST   | `/auth/logout`   | Logout and clear session    |

### User Routes

| Method | Endpoint         | Description             |
| ------ | ---------------- | ----------------------- |
| GET    | `/users/profile` | Get user profile        |
| PUT    | `/users/:id`     | Update user information |
| DELETE | `/users/:id`     | Delete user account     |

### Admin Routes

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| GET    | `/admin/users`     | Get all users |
| DELETE | `/admin/users/:id` | Delete a user |

### Two-Factor Authentication Routes

| Method | Endpoint       | Description            |
| ------ | -------------- | ---------------------- |
| POST   | `/2fa/enable`  | Enable 2FA for a user  |
| POST   | `/2fa/disable` | Disable 2FA for a user |
| POST   | `/2fa/verify`  | Verify 2FA code        |

## Database Connection

The backend uses a MySQL database with a connection pool:

```javascript
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
});

export default pool;
```

