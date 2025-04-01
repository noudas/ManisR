# ManishR API - README

# Backend

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

### Security Features

- Helmet: Provides security headers to protect against web vulnerabilities.
- CORS: Allows cross-origin requests from specified domains.
- Rate Limiting: Prevents brute force attacks by limiting the number of requests.
- Spam Protection: Blocks known spammers using Honeypot API.
-  JWT Authentication: Ensures secure, stateless user authentication.

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

## Security Configuration

### Middleware
The server uses several middleware for enhanced security and functionality:
- Helmet: Adds security headers to protect against common web vulnerabilities.
- CORS: Configured to allow cross-origin requests from allowed domains.
- Rate Limiting: Limits the number of requests a user can make in a given time frame to prevent brute-force attacks.
- Honeypot: Detects and blocks spam requests using the Honeypot API.


-----
# Frontend

This is the frontend for the project, built using **React**, **TypeScript**, and **Vite**. The app is styled with **Tailwind CSS**, and it integrates with an **Express** backend API. 

## Table of Contents

- [Project Overview](#project-overview)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This is the frontend portion of a web application that includes user authentication, registration, and two-factor authentication. The app includes a variety of components, pages, and hooks for handling different parts of the user experience.

## Folder Structure

```bash
|-app
  |-(tabs)
    |-_layout.tsx
    |-login.tsx
    |-loginform.tsx
    |-register.tsx
    |-registerphone.tsx
    |-undersonctruction.tsx
  |-assets
    |-fonts
       |-static (fontfolder)
       |-Rubik.ttf
       |-Rubik-Italic-VariableFont_wght.ttf
  |-images
       |-logo.png
       |-logo.tsx (svg)
  |-components
       |-bigButton.tsx
       |-customInput.tsx
       |-digitaInput.tsx
       |-header.tsx
       |-logo.tsx
       |-smallButton.tsx
  |-constants
       |-Colors.ts
       |-Typography.ts
  |-hooks
       |-useApiCall.ts
       |-useLogin.ts
       |-useRegister.ts
  |-pages
       |-loadingScreen.tsx
       |-login.tsx
       |-loginForm.tsx
       |-onBoard.tsx
       |-phoneNumber.tsx
       |-register.tsx
       |-twoFactor.tsx
       |-underConstruction.tsx
  |-scripts
       |-api.ts
  |-types
       |-adminTypes.ts
       |-authenticationTypes.tsx
       |-generalAPITypes.tsx
       |-navigationTypes.ts
       |-requestTypes.tsx
       |-twoFATypes.tsx
       |-userTypes.tsx
  |-_layout.tsx
  |-index.tsx
|-app.json
|-package.json
|-tsconfig.json
|-README.md
```

### Main Folders:

- **`app/`**: Contains the core app components and pages, including layouts, user authentication, and registration pages.
- **`assets/`**: Contains static assets such as fonts and images used throughout the app.
- **`components/`**: Reusable UI components like buttons, inputs, headers, and logos.
- **`constants/`**: Defines app-wide constants like color schemes (`Colors.ts`) and typography settings (`Typography.ts`).
- **`hooks/`**: Custom hooks for handling API calls, user login, and registration logic.
- **`pages/`**: Different pages of the app, such as login, registration, and loading screens.
- **`scripts/`**: Contains helper scripts such as `api.ts` to manage API calls.
- **`types/`**: TypeScript types for different app entities like user, authentication, and request handling.

## Installation

To get started with the project, clone the repository and install dependencies:

```bash
git clone <repository-url>
cd frontend
npm install
```

## Running the Application

Once dependencies are installed, you can run the app in development mode using the following command:

```bash
    npx expo start
```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).