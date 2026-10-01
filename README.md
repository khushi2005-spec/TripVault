<!-- # TripVault ✈️

<!--TripVault is a full-stack travel memory management application that allows users to securely save and manage their travel memories.

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


<!--# TripVault ✈️

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
```-->

# TripVault ✈️

TripVault is a full-stack travel memory management application that allows users to securely save, manage, and share their travel memories.

Users can create an account, log in, create, view, edit, and delete trips, upload travel photos, and create a public travel profile.

---

# 📌 Project Overview

TripVault is developed using the MERN stack and is divided into two main parts:

* **Frontend:** React with Vite
* **Backend:** Node.js and Express.js
* **Database:** MongoDB
* **Authentication:** JWT
* **Password Security:** bcryptjs
* **Image Storage:** Cloudinary
* **File Upload:** Multer

The project was developed in multiple weeks:

* **Week 1:** User Authentication
* **Week 2:** Trip Management and CRUD Operations
* **Week 3:** Photo Uploads and Public Profiles

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

Authenticated users can manage their own travel trips through the application.

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
| Cover Image | Main image of the trip                      |
| Photos      | Collection of uploaded trip photos          |
| User        | Reference to the authenticated user         |

---

# 🔐 Security and Ownership

TripVault uses JWT authentication to protect Trip Management routes.

Every trip is associated with the authenticated user's ID.

For operations such as viewing a specific trip, updating a trip, deleting a trip, and uploading a trip photo, the backend verifies that the trip belongs to the currently authenticated user.

This prevents one user from modifying another user's trip.

Sensitive authentication information such as passwords and email addresses is not exposed through the public profile API.

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

Users can also add a trip photo.

### Read

Users can:

* View all their trips
* View an individual trip
* View uploaded trip photos

### Update

Users can edit an existing trip using a pre-filled form.

They can also upload another photo while editing a trip.

### Delete

Users can delete a trip after confirming the deletion.

---

# 📸 Week 3 – Photo Uploads & Public Profiles

Week 3 adds **Photo Uploads and Public Profiles** to TripVault.

The implementation uses:

* Cloudinary
* Multer
* React
* Axios
* MongoDB

---

# ☁️ Cloudinary Photo Upload

TripVault uses Cloudinary to store uploaded travel images.

The Cloudinary credentials are stored securely in environment variables.

Images are uploaded through the backend using Multer and the Cloudinary storage configuration.

Supported image formats include:

* JPG
* JPEG
* PNG
* WEBP

The application also applies a **5 MB file-size limit** to uploaded images.

---

# 📷 Photo Upload Features

Users can upload photos while creating or editing trips.

The application provides:

* Image file selection
* Image type validation
* 5 MB size validation
* Image preview before upload
* Cloudinary image storage
* Automatic cover image assignment
* Multiple photos per trip
* Trip photo gallery

### Photo Upload Flow

```text
User Selects Image
       ↓
Frontend Validates Image
       ↓
Image Preview
       ↓
FormData Created
       ↓
Backend Upload Route
       ↓
Multer
       ↓
Cloudinary
       ↓
Image URL Returned
       ↓
MongoDB Trip Updated
       ↓
Photo Displayed in TripVault
```

---

# 🖼️ Trip Cover Images

The first uploaded image is automatically used as the trip's `coverImage` when a cover image does not already exist.

The cover image is displayed on the dashboard trip card.

```text
Dashboard
    ↓
Trip Card
    ↓
Cover Image
    ↓
Trip Information
```

---

# 🗂️ Trip Photo Gallery

Each trip can contain multiple uploaded photos.

The photos are stored in the Trip model using a `photos` array.

The Trip Details page displays uploaded photos in a responsive photo grid.

```text
Trip Details
      ↓
Photo Memories
      ↓
┌────────┬────────┬────────┐
│ Photo  │ Photo  │ Photo  │
├────────┼────────┼────────┤
│ Photo  │ Photo  │ Photo  │
└────────┴────────┴────────┘
```

---

# 👤 Public Profiles

Week 3 introduces public-facing travel profiles.

Each user can have:

* Name
* Unique username
* Bio
* Public trip information

A public profile can be accessed using:

```text
/profile/:username
```

For example:

```text
/profile/khushi
```

The public profile displays:

* User name
* Username
* Bio
* Public trip cards
* Trip destination
* Trip dates
* Trip rating
* Trip cover image

---

# 🔒 Public Profile Security

The public profile API returns only safe profile and trip information.

The following sensitive information is not exposed:

* Password
* Email address
* Authentication token
* Other sensitive account information

The public profile can be viewed without authentication.

---

# ✏️ Edit Profile

Authenticated users can edit their public profile.

The Edit Profile page allows users to:

* Set a username
* Change their bio
* Save profile information

The username must be unique.

The username is converted to lowercase before being stored.

---

# 🔗 Profile Navigation

TripVault provides profile navigation through the application navbar.

Users can access:

* **My Profile**
* **Edit Profile**
* **Logout**

If a user has not configured a username yet, the My Profile option directs the user toward profile setup.

---

# 🌐 API Endpoints

## Authentication APIs

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| `POST` | `/api/auth/register` | Register a new user    |
| `POST` | `/api/auth/login`    | Login user             |
| `GET`  | `/api/auth/me`       | Get authenticated user |

---

## Trip APIs

| Method   | Endpoint                | Description                               |
| -------- | ----------------------- | ----------------------------------------- |
| `POST`   | `/api/trips`            | Create a new trip                         |
| `GET`    | `/api/trips`            | Get all trips belonging to logged-in user |
| `GET`    | `/api/trips/:id`        | Get a single trip                         |
| `PUT`    | `/api/trips/:id`        | Update an existing trip                   |
| `DELETE` | `/api/trips/:id`        | Delete an existing trip                   |
| `POST`   | `/api/trips/:id/upload` | Upload a trip photo                       |

---

## Public Profile APIs

| Method | Endpoint                       | Authentication | Description                         |
| ------ | ------------------------------ | -------------- | ----------------------------------- |
| `GET`  | `/api/users/:username/profile` | No             | Get public profile                  |
| `PUT`  | `/api/users/profile`           | Yes            | Update authenticated user's profile |

---

# 🖥️ Frontend User Flow

## 1. Register

The user creates a TripVault account.

↓

## 2. Login

The user logs in using their registered credentials.

↓

## 3. Dashboard

After successful authentication, the user is redirected to the protected dashboard.

↓

## 4. Create Trip

The user creates a trip by entering travel information.

↓

## 5. Upload Photo

The user selects a travel image.

↓

## 6. Image Preview

The selected image is displayed before uploading.

↓

## 7. Cloudinary Upload

The image is uploaded through the backend and stored on Cloudinary.

↓

## 8. Dashboard

The uploaded image appears as the trip cover image.

↓

## 9. View Trip

The user opens the Trip Details page.

↓

## 10. Photo Gallery

All uploaded photos are displayed in the trip's photo gallery.

↓

## 11. Edit Trip

The user can update trip information and upload another photo.

↓

## 12. Public Profile

The user can create a username and bio and share their public travel profile.

---

# 🧪 API Testing

The Trip Management APIs were tested using **Thunder Client**.

The following operations were tested:

### Create Trip

```text
POST /api/trips
```

Result:

```text
Trip created successfully
```

### Get All Trips

```text
GET /api/trips
```

Result:

```text
User's trips returned successfully
```

### Get Single Trip

```text
GET /api/trips/:id
```

Result:

```text
Single trip returned successfully
```

### Update Trip

```text
PUT /api/trips/:id
```

Result:

```text
Trip updated successfully
```

### Delete Trip

```text
DELETE /api/trips/:id
```

Result:

```text
Trip deleted successfully
```

### Upload Photo

```text
POST /api/trips/:id/upload
```

Result:

```text
Photo uploaded successfully
```

### Public Profile

```text
GET /api/users/:username/profile
```

Result:

```text
Public profile returned successfully
```

---

# 🗄️ Database

TripVault uses **MongoDB** for storing application data.

MongoDB Atlas is used as the cloud database environment.

The backend connects to MongoDB using **Mongoose**.

## User Model

The User model contains:

```text
name
username
email
password
bio
```

## Trip Model

The Trip model contains:

```text
title
destination
startDate
endDate
description
rating
coverImage
photos
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
* Multer
* Cloudinary
* multer-storage-cloudinary

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
│   │   │   ├── EditTrip.jsx
│   │   │   ├── TripDetail.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── EditProfile.jsx
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
│   │   ├── auth.js
│   │   └── upload.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Trip.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   ├── trip.js
│   │   └── user.js
│   │
│   ├── .env
│   ├── .env.example
│   ├── index.js
│   └── package.json
│
├── .gitignore
└── README.md
```

> **Note:** The actual `.env` file should remain private and must not be committed to GitHub.

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
CRUD / Upload Operation
       ↓
MongoDB / Cloudinary
       ↓
Response to Frontend
```

---

# 📊 Week 3 Completion

| Requirement              | Status     |
| ------------------------ | ---------- |
| Cloudinary Setup         | ✅ Complete |
| Upload Middleware        | ✅ Complete |
| Trip `coverImage`        | ✅ Complete |
| Trip `photos` Array      | ✅ Complete |
| Photo Upload API         | ✅ Complete |
| Create Trip Photo Upload | ✅ Complete |
| Edit Trip Photo Upload   | ✅ Complete |
| Image Preview            | ✅ Complete |
| Dashboard Cover Images   | ✅ Complete |
| Trip Photo Grid          | ✅ Complete |
| Username                 | ✅ Complete |
| User Bio                 | ✅ Complete |
| Public Profile API       | ✅ Complete |
| Public Profile Page      | ✅ Complete |
| Edit Profile             | ✅ Complete |
| My Profile Navigation    | ✅ Complete |
| Profile Security         | ✅ Complete |
| Responsive UI            | ✅ Complete |

---

# 📈 Project Development Progress

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

## Week 3

Implemented:

* Cloudinary integration
* Multer upload middleware
* Trip cover images
* Multiple trip photos
* Create Trip photo upload
* Edit Trip photo upload
* Image preview
* Trip photo gallery
* Username
* User bio
* Public profile API
* Public profile page
* Edit Profile
* My Profile navigation
* Public profile security

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

# 💻 Frontend Setup

Open a terminal:

```bash
cd client
npm install
npm run dev
```

The frontend runs on the Vite development server.

---

# ⚙️ Backend Setup

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

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

A `.env.example` file is included to show the required environment variables without exposing real credentials.

**Never upload the actual `.env` file or database/Cloudinary credentials to GitHub.**

---

# 🔐 Security Practices

TripVault follows several security practices:

* Passwords are hashed using bcryptjs.
* JWT is used for authentication.
* Protected routes require authentication.
* Trip ownership is checked before protected trip operations.
* Cloudinary credentials are stored in environment variables.
* `.env` is excluded from Git.
* Public profile APIs expose only safe user information.
* Passwords and email addresses are not returned by the public profile API.
* Uploaded files are restricted to supported image formats.
* Uploaded images have a 5 MB size limit.

---

# 🎯 Current Project Status

**TripVault Week 1 + Week 2 + Week 3 implementation is complete and tested.**

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
Cloudinary
        +
Trip Photo Uploads
        +
Photo Gallery
        +
Public Profiles
        +
Profile Editing
        +
Responsive React Frontend
```

---

# 🚀 Future Improvements

Possible future improvements include:

* Application deployment
* Production environment configuration
* Image deletion from Cloudinary
* Pagination for large trip collections
* Search and filtering
* Social sharing for public profiles
* Additional travel statistics
* Improved photo management
* Mobile-focused improvements

---

# 👩‍💻 Project

**TripVault**

A full-stack travel memory management application built using React, Node.js, Express, MongoDB, JWT, Multer, and Cloudinary.
