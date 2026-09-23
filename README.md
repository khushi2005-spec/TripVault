<!-- # TripVault ✈️

TripVault is a full-stack travel memory management application that allows users to securely save and manage their travel memories.

Users can create an account, log in, and create, view, edit, and delete their trips.

## Features

- User registration
- User login
- Secure password hashing using bcrypt
- JWT authentication
- Protected dashboard
- Create trips
- View trips
- Edit trips
- Delete trips
- Add trip destination
- Add start and end dates
- Add trip description
- Add cover image URL
- User-specific trip data
- Responsive user interface

## Technologies Used

### Frontend

- React
- Vite
- React Router
- Axios
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs
- JSON Web Token
- CORS
- dotenv

## Project Structure

```text
TripVault/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   └── package.json
│
├── .gitignore
└── README.md -->


# TripVault ✈️

TripVault is a full-stack travel memory management application that allows users to securely save and manage their travel memories.

The application provides user authentication and a protected dashboard where authenticated users can create, view, edit, and delete their personal trips.

---

# 📌 Project Overview

TripVault is developed using the MERN stack and is divided into two main parts:

* **Frontend:** React with Vite
* **Backend:** Node.js and Express.js
* **Database:** MongoDB
* **Authentication:** JWT
* **Password Security:** bcryptjs

The project was developed in multiple weeks, with authentication implemented in **Week 1** and Trip Management CRUD functionality implemented in **Week 2**.

---

# 🚀 Features

## Week 1 – User Authentication

The first week focused on creating a secure authentication system.

### Authentication Features

* User registration
* User login
* Secure password hashing using bcrypt
* JWT-based authentication
* Protected dashboard
* Authentication middleware
* User-specific authentication
* Automatic authorization using JWT
* Responsive user interface

### Authentication Flow

```text
User Registration
       ↓
Password Hashing
       ↓
User Stored in MongoDB
       ↓
User Login
       ↓
JWT Token Generated
       ↓
Token Stored on Client
       ↓
Protected Dashboard
```

---

# 🗺️ Week 2 – Trip Management

Week 2 focuses on **Trip Management and CRUD Operations**.

Authenticated users can manage their own travel trips through the application. The Week 2 requirements include creating, viewing, editing, and deleting trips, along with ownership verification.

## Trip Management Features

* Create a new trip
* View all personal trips
* View a single trip
* Edit existing trips
* Delete trips
* Add trip title
* Add destination
* Add start date
* Add end date
* Add trip description
* Add rating from 1 to 5
* Store the trip against the authenticated user
* Verify trip ownership before protected operations
* Protected Trip APIs
* Pre-filled edit form
* Delete confirmation
* Friendly empty state
* Automatic dashboard refresh

---

# 🧳 Trip Information

Each trip contains the following information:

| Field       | Description                                 |
| ----------- | ------------------------------------------- |
| Title       | Name of the trip                            |
| Destination | Travel destination                          |
| Start Date  | Date on which the trip starts               |
| End Date    | Date on which the trip ends                 |
| Description | Description or memories related to the trip |
| Rating      | Trip rating from 1 to 5                     |
| User        | Reference to the authenticated user         |

The Week 2 task defines these fields in the Trip Mongoose model and requires the trip to be associated with a `User` reference.

---

# 🔐 Security and Ownership

TripVault uses JWT authentication to protect Trip Management routes.

Every trip is associated with the authenticated user's ID.

For operations such as viewing a specific trip, updating a trip, or deleting a trip, the backend verifies that the trip belongs to the currently authenticated user.

This prevents one user from modifying or deleting another user's trip. The Week 2 requirements specifically call for ownership verification before update and delete operations.

---

# 🔄 CRUD Operations

CRUD stands for:

* **C — Create**
* **R — Read**
* **U — Update**
* **D — Delete**

TripVault implements all four operations.

### Create

Users can create a new trip by entering:

* Title
* Destination
* Start Date
* End Date
* Description
* Rating

### Read

Users can:

* View all their trips
* View an individual trip

### Update

Users can edit an existing trip using a pre-filled form.

### Delete

Users can delete a trip after confirming the deletion.

---

# 🌐 API Endpoints

The following protected API endpoints are implemented for Trip Management.

| Method   | Endpoint         | Description                                   |
| -------- | ---------------- | --------------------------------------------- |
| `POST`   | `/api/trips`     | Create a new trip                             |
| `GET`    | `/api/trips`     | Get all trips belonging to the logged-in user |
| `GET`    | `/api/trips/:id` | Get a single trip                             |
| `PUT`    | `/api/trips/:id` | Update an existing trip                       |
| `DELETE` | `/api/trips/:id` | Delete an existing trip                       |

All Trip Management routes use authentication middleware.

---

# 🖥️ Frontend User Flow

The frontend provides a complete trip management experience.

## 1. Login

The user logs into their account using their registered credentials.

↓

## 2. Dashboard

After successful authentication, the user is redirected to the protected dashboard.

↓

## 3. Create Trip

The user clicks **Create Trip** and enters the trip details.

↓

## 4. View Trip

The newly created trip appears on the dashboard as a trip card.

The card displays information such as:

* Title
* Destination
* Start Date
* End Date
* Rating

↓

## 5. Edit Trip

The user clicks **Edit**.

The existing trip information is loaded into a pre-filled form.

The user can modify the required information and save the changes.

↓

## 6. Delete Trip

The user clicks **Delete**.

A confirmation message is displayed before deletion.

↓

## 7. Dashboard Refresh

After deletion, the trip is removed from the dashboard automatically.

If there are no remaining trips, the application displays a friendly empty state.

This frontend flow corresponds to the Week 2 frontend requirements.

---

# 🧪 API Testing

The Trip Management APIs were tested using **Thunder Client**.

The following operations were successfully tested:

### 1. Create Trip

```text
POST /api/trips
```

Result:

```text
Trip created successfully
```

### 2. Get All Trips

```text
GET /api/trips
```

Result:

```text
User's trips returned successfully
```

### 3. Get Single Trip

```text
GET /api/trips/:id
```

Result:

```text
Single trip returned successfully
```

### 4. Update Trip

```text
PUT /api/trips/:id
```

Result:

```text
Trip updated successfully
```

### 5. Delete Trip

```text
DELETE /api/trips/:id
```

Result:

```text
Trip deleted successfully
```

### 6. Verify Deletion

After deleting the trip, the same trip ID was requested again.

Result:

```text
404 Not Found
Trip not found
```

This confirmed that the deletion was successfully performed.

---

# 🗄️ Database

TripVault uses **MongoDB** for storing application data.

MongoDB Atlas is used as the cloud database environment.

The backend connects to MongoDB using **Mongoose**.

### Database Models

The project contains user and trip-related data.

The Trip model contains:

```text
title
destination
startDate
endDate
description
rating
user
```

The `user` field references the authenticated user.

---

# 🛠️ Technologies Used

## Frontend

* React
* Vite
* React Router
* Axios
* CSS

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* bcryptjs
* JSON Web Token
* CORS
* dotenv

## Development and Testing

* Visual Studio Code
* MongoDB Atlas
* Thunder Client
* Git
* GitHub

---

# 📁 Project Structure

```text
TripVault/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── CreateTrip.jsx
│   │   │   └── EditTrip.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Trip.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   └── trip.js
│   │
│   ├── .env
│   ├── index.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

# 🔑 Authentication Flow

TripVault uses JWT authentication for protected resources.

```text
Register
   ↓
Login
   ↓
JWT Token
   ↓
Token Stored on Client
   ↓
Axios Adds Authorization Header
   ↓
Backend Authentication Middleware
   ↓
User Verified
   ↓
Protected Resource Access
```

The frontend Axios configuration automatically attaches the JWT token to authenticated API requests.

---

# 🔒 Protected Trip Flow

```text
Frontend Request
       ↓
JWT Token
       ↓
Authorization Header
       ↓
authMiddleware
       ↓
User ID Extracted
       ↓
Trip Ownership Checked
       ↓
CRUD Operation
       ↓
MongoDB
       ↓
Response to Frontend
```

---

# 📊 Week 2 Completion

The Week 2 Trip Management requirements have been implemented and tested.

| Requirement                | Status      |
| -------------------------- | ----------- |
| Trip Model                 | ✅ Complete  |
| Create Trip API            | ✅ Complete  |
| Get All Trips API          | ✅ Complete  |
| Get Single Trip API        | ✅ Complete  |
| Update Trip API            | ✅ Complete  |
| Delete Trip API            | ✅ Complete  |
| Ownership Verification     | ✅ Complete  |
| Dashboard Trip Cards       | ✅ Complete  |
| Create Trip Form           | ✅ Complete  |
| Edit Trip Form             | ✅ Complete  |
| Delete Confirmation        | ✅ Complete  |
| Empty State                | ✅ Complete  |
| Frontend CRUD Flow         | ✅ Tested    |
| Thunder Client API Testing | ✅ Tested    |
| MongoDB Atlas              | ✅ Connected |

---

# 📌 Week 2 Testing Flow

The complete functionality was tested using the following flow:

```text
Login
  ↓
Dashboard
  ↓
Create Trip
  ↓
Trip Appears on Dashboard
  ↓
Edit Trip
  ↓
Updated Trip Appears
  ↓
Delete Trip
  ↓
Confirmation
  ↓
Trip Removed
  ↓
Empty State
```

---

# 📦 Installation and Setup

## Clone the Repository

```bash
git clone <your-github-repository-url>
```

Move into the project:

```bash
cd TripVault
```

---

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

The frontend runs on the Vite development server.

---

## Backend Setup

Open another terminal:

```bash
cd server
npm install
npm run dev
```

The backend runs on port `5000` according to the project configuration.

---

# 🌍 Environment Variables

Create a `.env` file inside the `server` folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Do not upload the actual `.env` file or database credentials to GitHub.

---

# 📝 Project Development Progress

## Week 1

Implemented:

* User registration
* User login
* Password hashing
* JWT authentication
* Protected dashboard
* Frontend authentication flow

## Week 2

Implemented:

* Trip model
* Trip CRUD APIs
* Trip ownership verification
* Dashboard trip listing
* Create Trip form
* Edit Trip form
* Delete confirmation
* Empty state
* Frontend CRUD integration
* Thunder Client API testing

---

# 🎯 Current Project Status

**TripVault Week 1 + Week 2 implementation is complete and tested.**

The project currently supports:

```text
User Authentication
        +
JWT Security
        +
Protected Dashboard
        +
Trip Management
        +
CRUD Operations
        +
MongoDB Atlas
        +
React Frontend
```
