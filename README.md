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
   EMAIL_USER-your_email
   EMAIL_PASS=your_google_api
   BASE_URL=your_host_URL
   HONEYPOT_API_KEY=your_honeypt_key
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

## Routes

### Admin Routes
Handles user management operations restricted to administrators.
```javascript
import express from 'express';
import { checkAdmin } from '../utils/verification.js';
import { authenticateToken } from '../utils/auth.js';
import AdminController from '../controllers/adminController.js';

const router = express.Router();

router.get('/users', authenticateToken, checkAdmin, AdminController.getAllUsers);
router.delete('/users/:id', authenticateToken, checkAdmin, AdminController.deleteUser);

export default router;
```

### Authentication Routes
Handles user registration, login, logout, and email verification.
```javascript
import express from 'express';
import { body, validationResult } from 'express-validator';
import AuthController from '../controllers/authController.js';
import { authenticateToken } from '../utils/auth.js';

const router = express.Router();

const validateRegistration = [
    body('first_name').trim().notEmpty().withMessage('First name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

router.post('/register', validateRegistration, AuthController.register);
router.get('/verify-email', AuthController.verifyEmail);
router.post('/login', AuthController.login);
router.post('/logout', authenticateToken, AuthController.logout);

export default router;
```

### API Route Index
Aggregates all route modules for authentication, user management, and admin actions.
```javascript
import express from 'express';
import userRoutes from './userRoutes.js';
import authRoutes from './authRoutes.js';
import twoFactorRoutes from './twoFactorRoutes.js';
import adminRoutes from './adminRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/two-factor', twoFactorRoutes);
router.use('/admin', adminRoutes);

export default router;
```

### Utilities
#### Authentication Utility
Handles JWT generation and authentication.
```javascript
import jwt from 'jsonwebtoken';

export function generateToken(user) {
    return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

export function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied.' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
}
```

#### Email Service
Handles email verification using Nodemailer.
```javascript
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export async function sendVerificationEmail(email, verificationToken) {
    const verificationLink = `${process.env.BASE_URL}/api/v1/auth/verify-email?token=${verificationToken}`;
    const mailOptions = {
        from: `Support <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Verify Your Email',
        html: `<p>Click below to verify your email:</p><a href="${verificationLink}">${verificationLink}</a>`
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error(`❌ [Email Error] ${error.message}`);
    }
}
```

