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
<!---
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
--->

<!-- 
# TripVault ✈️

TripVault is a full-stack travel memory management application that allows users to securely save, manage, and revisit their travel memories.

Users can create an account, log in, create, view, edit, and delete trips, upload travel photos, and create a public travel profile.

## 🌐 Live Demo

**Live Website:** [Open TripVault](https://trip-vault-seven.vercel.app/)

**Frontend Deployment:** Vercel

**Backend API:** [TripVault Backend](https://tripvault-backend-xd5x.onrender.com)

**GitHub Repository:** [TripVault on GitHub](https://github.com/khushi2005-spec/TripVault)

---

## 📌 Project Overview

TripVault is developed using the MERN stack and is divided into three main parts:

* **Frontend:** React with Vite
* **Backend:** Node.js and Express.js
* **Database:** MongoDB Atlas

Additional technologies include JWT authentication, bcryptjs for password hashing, Cloudinary for image storage, and Multer for file uploads.

### Project Development

* **Week 1:** User Authentication
* **Week 2:** Trip Management and CRUD Operations
* **Week 3:** Photo Uploads and Public Profiles
* **Week 4:** Frontend polish, responsive design, deployment, and final testing

---

## 🚀 Features

### 🔐 User Authentication

* User registration and login
* Secure password hashing using bcryptjs
* JWT-based authentication
* Protected dashboard
* Authentication middleware
* User-specific trip management
* Automatic authorization using JWT
* Login and registration feedback

### 🗺️ Trip Management

* Create a new trip
* View all personal trips
* View individual trip details
* Edit existing trips
* Delete trips with confirmation
* Add trip title and destination
* Add start and end dates
* Add trip descriptions
* Rate trips from 1 to 5
* Associate trips with authenticated users
* Verify trip ownership before protected operations
* Pre-filled edit forms
* Dashboard loading, error, and empty states

### 📸 Photo Uploads

* Upload travel photos
* Image previews
* Image type validation
* 5 MB image size limit
* Cloudinary image storage
* Trip cover images
* Multiple photos per trip
* Responsive trip photo gallery

Supported image formats include JPG, JPEG, PNG, and WEBP.

### 👤 Public Profiles

* Unique usernames
* Editable profile bio
* Public travel profile pages
* Public trip cards
* Trip destinations, dates, ratings, and cover images
* Profile navigation through the navbar
* Public profile API with restricted user information

### 📱 Responsive User Interface

* Responsive layouts for desktop and mobile
* Mobile hamburger navigation
* Consistent styling
* Loading indicators
* Error messages and retry options
* Toast notifications
* Friendly empty states
* Responsive trip cards and photo galleries

---

## 🔄 CRUD Operations

CRUD stands for Create, Read, Update, and Delete.

| Operation | Description                                     |
| --------- | ----------------------------------------------- |
| Create    | Add a new trip with travel information          |
| Read      | View personal trips and individual trip details |
| Update    | Edit existing trip information                  |
| Delete    | Remove a trip after confirmation                |

Each trip belongs to an authenticated user. The backend checks trip ownership before performing protected operations.

---

## 🧳 Trip Information

Each trip can contain the following information:

| Field       | Description                         |
| ----------- | ----------------------------------- |
| Title       | Name of the trip                    |
| Destination | Travel destination                  |
| Start Date  | Date the trip starts                |
| End Date    | Date the trip ends                  |
| Description | Travel details and memories         |
| Rating      | Trip rating from 1 to 5             |
| Cover Image | Main image displayed for the trip   |
| Photos      | Collection of uploaded trip photos  |
| User        | Reference to the authenticated user |

---

## ☁️ Cloudinary Photo Upload

TripVault uses Cloudinary to store uploaded travel images.

Images are uploaded through the backend using Multer and the Cloudinary storage configuration. Image URLs are associated with the relevant trip.

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
Trip Record Updated
       ↓
Photo Displayed in TripVault
```

The first uploaded image can be used as the trip's cover image when a cover image has not already been assigned.

Each trip can also contain multiple photos displayed in the trip details gallery.

---

## 🔒 Security and Ownership

TripVault uses JWT authentication to protect private resources.

* Passwords are hashed using bcryptjs.
* JWT tokens are used for authenticated API requests.
* Protected routes require valid authentication.
* Trip ownership is checked before protected trip operations.
* Cloudinary and database credentials are stored in environment variables.
* Public profile responses are designed to exclude passwords, email addresses, and authentication tokens.
* Uploaded images are restricted by file type and size.
* Environment files must remain private and must not be committed to GitHub.

---

## 👤 Public Profiles

Each user can configure a public travel profile containing:

* Name
* Unique username
* Bio
* Public trip information

A profile can be accessed through the following route pattern:

```text
/profile/:username
```

For example:

```text
/profile/khushi
```

The profile page can display the user's name, username, bio, public trip cards, destinations, dates, ratings, and cover images.

Authenticated users can edit their profile information through the Edit Profile page.

---

## 🌐 API Endpoints

The following endpoints describe the TripVault API structure.

### Authentication APIs

| Method | Endpoint             | Description                |
| ------ | -------------------- | -------------------------- |
| `POST` | `/api/auth/register` | Register a new user        |
| `POST` | `/api/auth/login`    | Log in a user              |
| `GET`  | `/api/auth/me`       | Get the authenticated user |

### Trip APIs

| Method   | Endpoint                | Description                               |
| -------- | ----------------------- | ----------------------------------------- |
| `POST`   | `/api/trips`            | Create a trip                             |
| `GET`    | `/api/trips`            | Get trips belonging to the logged-in user |
| `GET`    | `/api/trips/:id`        | Get an individual trip                    |
| `PUT`    | `/api/trips/:id`        | Update a trip                             |
| `DELETE` | `/api/trips/:id`        | Delete a trip                             |
| `POST`   | `/api/trips/:id/upload` | Upload a trip photo                       |

### Public Profile APIs

| Method | Endpoint                       | Description                             |
| ------ | ------------------------------ | --------------------------------------- |
| `GET`  | `/api/users/:username/profile` | Get a public profile                    |
| `PUT`  | `/api/users/profile`           | Update the authenticated user's profile |

Protected endpoints require the appropriate authentication token. Actual endpoint behavior depends on the deployed backend configuration.

---

## 🧪 API Testing

Thunder Client was used during development to test TripVault API operations.

Testing covered trip creation, retrieving trips, viewing an individual trip, updating trips, deleting trips, and photo upload.

The application was also tested during development for authentication and protected-route behavior.

The final deployment should be verified through the live website for registration, login, trip management, image upload, profile functionality, and mobile responsiveness.

---

## 🗄️ Database

TripVault uses MongoDB Atlas as its cloud database and Mongoose to define and interact with application data.

### User Model

The user model includes fields such as:

```text
name
username
email
password
bio
```

### Trip Model

The trip model includes fields such as:

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

The `user` field references the authenticated user associated with a trip.

---

## 🛠️ Technologies Used

### Frontend

* React
* Vite
* React Router
* Axios
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* bcryptjs
* JSON Web Token (JWT)
* CORS
* dotenv
* Multer
* Cloudinary
* multer-storage-cloudinary

### Development and Deployment

* Visual Studio Code
* MongoDB Atlas
* Thunder Client
* Git
* GitHub
* Render
* Vercel

---

## 📁 Project Structure

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
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── index.js
│   └── package.json
│
├── .gitignore
└── README.md
```

This is a simplified overview. Your actual directory and file names may differ.

---

## 🔑 Authentication Flow

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
Axios Adds Authorization Header
       ↓
Backend Authentication Middleware
       ↓
Protected Resource Access
```

The frontend Axios configuration attaches the JWT token to authenticated API requests.

---

## 🚀 Deployment

TripVault uses separate deployments for the frontend and backend.

| Component     | Platform      |
| ------------- | ------------- |
| Frontend      | Vercel        |
| Backend       | Render        |
| Database      | MongoDB Atlas |
| Image Storage | Cloudinary    |

### Frontend Configuration

The frontend uses the `VITE_API_URL` environment variable to configure the backend API base URL.

Example:

```env
VITE_API_URL=https://tripvault-backend-xd5x.onrender.com
```

The frontend API service should append the relevant API routes, such as `/api/auth` and `/api/trips`, to the configured base URL as required by its implementation.

Set the same variable in the Vercel project's environment settings and redeploy after changing production environment variables.

### Backend Configuration

Configure the required environment variables in the Render service settings.

Do not place production secrets in frontend code or public documentation.

### Database and Images

MongoDB Atlas stores application records, while Cloudinary stores uploaded travel images.

Deployment depends on valid production environment variables and the correct database and Cloudinary configuration.

---

## 📦 Installation and Setup

### Prerequisites

Install the following before running the project locally:

* Node.js and npm
* Git
* A MongoDB Atlas database or another configured MongoDB instance
* Cloudinary credentials for image upload functionality

### 1. Clone the Repository

```bash
git clone https://github.com/khushi2005-spec/TripVault.git
```

Move into the project directory:

```bash
cd TripVault
```

### 2. Frontend Setup

Open a terminal and run:

```bash
cd client
npm install
npm run dev
```

Vite starts the frontend development server and displays its local URL in the terminal.

### 3. Backend Setup

Open a second terminal from the project root:

```bash
cd server
npm install
npm run dev
```

The backend uses the port configured in the environment, with port `5000` used for local development.

### 4. Environment Variables

Create a `.env` file inside the `server` directory.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Use your own credentials. Never commit actual secrets to GitHub.

A `.env.example` file can document the required variable names without containing real credentials.

---

## 🔒 Security Practices

TripVault incorporates the following security measures:

* Password hashing using bcryptjs
* JWT-based authentication
* Protected frontend routes and backend endpoints
* Trip ownership verification
* Environment variables for sensitive credentials
* Public profile responses that exclude sensitive account information
* Image type validation
* A 5 MB image upload limit
* A `.gitignore` configuration to exclude environment files and generated dependencies

---

## 📱 User Flow

1. **Register:** Create a TripVault account.
2. **Login:** Authenticate using registered credentials.
3. **Dashboard:** Access the protected dashboard.
4. **Create Trip:** Enter destination and travel information.
5. **Upload Photo:** Select and preview a travel image.
6. **Save Memories:** Upload images and associate them with trips.
7. **View Trip:** Open the trip details page.
8. **Photo Gallery:** View uploaded trip photos.
9. **Edit Trip:** Update trip information and photos.
10. **Public Profile:** Configure a username and bio and share a travel profile.

---

## 📊 Project Progress

| Area                | Implementation                           |
| ------------------- | ---------------------------------------- |
| User Authentication | Registration, login, JWT                 |
| Trip Management     | Create, view, edit, delete               |
| Database            | MongoDB Atlas and Mongoose               |
| Image Uploads       | Multer and Cloudinary                    |
| Public Profiles     | Profile viewing and editing              |
| Frontend UX         | Loading, error, and empty states         |
| Notifications       | Toast feedback                           |
| Responsive UI       | Mobile navigation and responsive layouts |
| Deployment          | Vercel frontend and Render backend       |

---

## 🔮 Future Improvements

Potential future improvements include:

* Image deletion from Cloudinary when a trip is deleted
* Pagination for large trip collections
* Search and filtering
* Social sharing for public profiles
* Additional travel statistics
* Improved photo management
* Further mobile usability improvements
* Automated testing and monitoring

---

## 👩‍💻 Author

**Khushi Godara**

B.Tech Computer Science Engineering

[GitHub Profile](https://github.com/khushi2005-spec)

---

## ⭐ Support

If you find TripVault useful, consider giving the repository a star on GitHub.

**TripVault — Save your journeys. Keep your memories.** -->

# TripVault ✈️

**Save your journeys. Keep your memories.**

TripVault is a full-stack travel memory management application that allows users to securely store, organize, and revisit their travel experiences. Users can create accounts, manage trips, upload travel photos, and share travel memories through public profiles.

## 🌐 Live Demo

- **Live Website:** https://trip-vault-seven.vercel.app/
- **Backend API:** https://tripvault-backend-xd5x.onrender.com
- **GitHub Repository:** https://github.com/khushi2005-spec/TripVault

## 📌 Project Overview

TripVault follows the MERN stack architecture, with a React frontend, an Express and Node.js backend, and MongoDB for data storage.

The application includes cookie-based authentication, protected routes, trip management, Cloudinary image storage, and public travel profiles.

### Technology Stack

- **Frontend:** React, Vite, React Router, Axios, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas, Mongoose
- **Authentication:** JSON Web Token (JWT), HttpOnly cookies
- **Security:** bcryptjs, CSRF protection, CORS, Helmet
- **Image Storage:** Cloudinary, Multer
- **Deployment:** Vercel and Render

## 🚀 Features

### 🔐 Authentication and Security

- User registration and login
- Password hashing using bcryptjs
- JWT-based authentication using HttpOnly cookies
- Protected frontend routes and backend API endpoints
- CSRF protection for state-changing authenticated requests
- Login and registration validation
- Logout and session persistence
- User-specific trip access and ownership verification
- Environment-based configuration for sensitive credentials

### 🗺️ Trip Management

- Create, view, edit, and delete trips
- Store trip titles and destinations
- Record start and end dates
- Add trip descriptions
- Rate trips from 1 to 5
- View individual trip details
- Associate trips with their authenticated owners
- Dashboard loading, error, and empty states

### 📸 Photo Uploads

- Upload travel photos to Cloudinary
- Display trip cover images
- Support multiple photos per trip
- Preview images where supported by the interface
- Validate supported image formats
- Enforce a 5 MB upload limit
- Support JPG, JPEG, PNG, and WEBP formats

### 👤 Public Profiles

- Unique usernames
- Profile bio management
- Public travel profile pages
- Public trip cards and travel information
- Profile navigation
- Profile editing for authenticated users

Public profile access and displayed information depend on the implemented profile routes and visibility rules.

### 📱 User Interface

- Responsive layouts for desktop and mobile
- Navigation and mobile menu
- Trip cards and photo galleries
- Loading indicators and error messages
- Toast notifications
- Empty-state messaging
- Consistent styling across application pages

## 🔄 CRUD Operations

CRUD stands for Create, Read, Update, and Delete.

| Operation | Description |
|---|---|
| Create | Add a trip with travel information |
| Read | View personal trips and trip details |
| Update | Modify existing trip information |
| Delete | Remove a trip |

The backend associates trips with authenticated users and checks ownership before protected trip operations.

## 🧳 Trip Information

A trip can contain the following fields:

| Field | Description |
|---|---|
| Title | Name of the trip |
| Destination | Travel destination |
| Start Date | Beginning of the trip |
| End Date | End of the trip |
| Description | Travel details and memories |
| Rating | Rating from 1 to 5 |
| Cover Image | Main trip image |
| Photos | Collection of trip photo URLs |
| User | Reference to the trip owner |

## 🏗️ Application Architecture

TripVault separates the user interface, backend services, database, and image storage.

```text
                User
                 |
                 v
        React Frontend (Vite)
                 |
                 v
          Axios API Service
                 |
          HTTPS API Requests
                 |
                 v
       Node.js / Express Backend
                 |
       +---------+----------+
       |                    |
       v                    v
Authentication         Trip and User
Middleware             Routes
       |                    |
       +---------+----------+
                 |
          MongoDB / Mongoose
                 |
                 v
             Trip Data

Photo Uploads --> Multer --> Cloudinary
```

The frontend communicates with the backend through API requests. The backend validates requests, authenticates users, enforces trip ownership, and interacts with MongoDB. Uploaded images are stored through Cloudinary.

## 🔒 Authentication and CSRF Protection

TripVault uses JWT-based authentication with an HttpOnly cookie.

### Authentication Flow

```text
User Registration
        |
        v
Password Hashed with bcryptjs
        |
        v
User Stored in MongoDB
        |
        v
User Logs In
        |
        v
JWT Generated by Backend
        |
        v
JWT Set in HttpOnly Cookie
        |
        v
Browser Sends Cookie with API Requests
        |
        v
Authentication Middleware Verifies JWT
        |
        v
Protected Resource Access
```

The authentication token is not intentionally returned in the login response body or stored in localStorage. The browser manages the HttpOnly authentication cookie.

### CSRF Protection

The backend issues a CSRF token for use with state-changing authenticated requests. The frontend sends the token in the `X-CSRF-Token` header, and the backend validates it against the CSRF cookie.

Production cookies are configured with appropriate security attributes, including `Secure`, `HttpOnly` for the authentication cookie, and the required `SameSite` setting.

## ☁️ Cloudinary Image Storage

TripVault uses Cloudinary to store travel photos.

### Upload Flow

```text
User Selects Image
        |
        v
Frontend Creates FormData
        |
        v
Authenticated Upload Request
        |
        v
Backend Validates Request
        |
        v
Multer Processes Image
        |
        v
Cloudinary Stores Image
        |
        v
Image URL Saved to Trip
        |
        v
Image Displayed in Application
```

The upload endpoint accepts an image for a specific trip. The backend checks trip ownership before updating the associated record.

## 🌐 API Endpoints

The following table summarizes the principal API routes. All endpoints are relative to the backend base URL.

### Authentication APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/auth/csrf` | Obtain a CSRF token |
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Authenticate a user |
| POST | `/api/auth/logout` | Log out and clear authentication cookies |
| GET | `/api/auth/me` | Retrieve the authenticated user |

### Trip APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/trips` | Create a trip |
| GET | `/api/trips` | Retrieve the authenticated user's trips |
| GET | `/api/trips/:id` | Retrieve an individual trip |
| PUT | `/api/trips/:id` | Update a trip |
| DELETE | `/api/trips/:id` | Delete a trip |
| POST | `/api/trips/:id/upload` | Upload a trip image |

### Profile APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users/:username/profile` | Retrieve a public profile |
| PUT | `/api/users/profile` | Update the authenticated user's profile |

Protected endpoints require valid authentication. State-changing authenticated requests must also satisfy the backend's CSRF validation rules.

## 🗄️ Database

TripVault uses MongoDB Atlas for cloud database storage and Mongoose for schema definition and database operations.

### User Model

The user model contains account and profile information, including fields such as:

- Name
- Username
- Email
- Hashed password
- Bio

### Trip Model

The trip model contains travel information, including:

- Title
- Destination
- Start date
- End date
- Description
- Rating
- Cover image
- Photo collection
- User reference

The user reference associates each trip with its owner.

## 🧪 Testing

TripVault includes automated backend tests and was tested during development and production verification.

Testing areas include:

- User registration and login
- Invalid credentials and validation errors
- Authentication cookies
- Protected routes and session persistence
- CSRF validation
- Trip creation, retrieval, updating, and deletion
- Trip ownership enforcement
- Photo upload validation
- Frontend production build

Thunder Client was also used for API testing during development.

The reported verification results included successful backend test execution and a successful frontend production build. Results should be updated if later code changes introduce new failures.

## 🛠️ Technologies and Tools

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
- cookie-parser
- CORS
- Helmet
- dotenv
- express-rate-limit
- Multer
- Cloudinary
- multer-storage-cloudinary

### Development and Deployment

- Visual Studio Code
- Git and GitHub
- Thunder Client
- MongoDB Atlas
- Cloudinary
- Vercel
- Render

## 📁 Project Structure

```text
TripVault/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── CreateTrip.jsx
│   │   │   ├── EditTrip.jsx
│   │   │   ├── TripDetail.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── EditProfile.jsx
│   │   ├── services/
│   │   │   └── api.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── config/
│   │   └── cloudinary.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── csrfMiddleware.js
│   │   └── upload.js
│   ├── models/
│   │   ├── Trip.js
│   │   └── user.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── trip.js
│   │   └── user.js
│   ├── tests/
│   │   ├── app.test.js
│   │   ├── auth.test.js
│   │   ├── trip.test.js
│   │   └── upload.test.js
│   ├── .env.example
│   ├── index.js
│   └── package.json
├── .gitignore
└── README.md
```

This tree summarizes the main project files; configuration and supporting files may also be present.

## 🚀 Deployment

TripVault uses separate services for the frontend and backend.

| Component | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |
| Image Storage | Cloudinary |
| Source Control | GitHub |

### Frontend Configuration

Configure the following environment variable in Vercel:

```env
VITE_API_URL=https://tripvault-backend-xd5x.onrender.com
```

The frontend API service appends `/api` to this base URL.

For local development, the frontend uses the configured development API URL, normally `http://localhost:5000`.

### Backend Configuration

Configure the required variables in the Render service environment:

```env
NODE_ENV=production
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

The hosting platform may supply the port automatically. The backend should use the configured port rather than depend on a fixed production port.

Use actual credentials only in the appropriate local or hosting environment settings. Never put real secrets in the README or commit them to GitHub.

## 📦 Installation and Setup

### Prerequisites

Install:

- Node.js and npm
- Git
- A configured MongoDB database
- Cloudinary credentials for image uploads

### 1. Clone the Repository

```bash
git clone https://github.com/khushi2005-spec/TripVault.git
cd TripVault
```

### 2. Configure the Backend

Open a terminal at the project root:

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory and add your own development credentials:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_development_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Start the backend using the script defined in `server/package.json`. If the project provides the `dev` script, run:

```bash
npm run dev
```

### 3. Configure the Frontend

Open a second terminal:

```bash
cd client
npm install
```

If you need to configure a local API URL, create `client/.env.local`:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Vite displays the local frontend URL in the terminal, normally `http://localhost:5173`.

Ensure that the backend CORS configuration permits the local frontend origin.

## 🔒 Security Practices

TripVault incorporates security measures including:

- Password hashing with bcryptjs
- JWT verification through backend middleware
- HttpOnly authentication cookies
- CSRF validation for state-changing authenticated requests
- Protected frontend routes and backend endpoints
- Trip ownership checks
- Login and registration rate limiting
- Input and image upload validation
- Environment-based secrets management
- Restricted public profile information
- Secure production cookie configuration

Security depends on correct environment configuration and keeping dependencies and application code updated.

## 📱 Typical User Flow

1. Register a new account.
2. Log in to TripVault.
3. Access the protected dashboard.
4. Create a trip with destination and travel dates.
5. Upload a travel photo.
6. View the saved trip and its photos.
7. Edit or delete a trip.
8. Update profile information.
9. Share a public profile where supported.
10. Log out securely.

## 📊 Project Status

| Area | Status |
|---|---|
| Authentication | Implemented and tested |
| Trip CRUD | Implemented and tested |
| Database Integration | Implemented |
| Cloudinary Uploads | Implemented and tested |
| Public Profiles | Implemented; verify visibility rules |
| Responsive Interface | Implemented |
| CSRF Protection | Implemented and tested |
| Automated Backend Tests | Available |
| Frontend Production Build | Verified |
| Production Deployment | Deployed and functionally verified |

## 🔮 Future Improvements

Potential improvements include:

- Pagination for large trip collections
- Trip search and filtering
- Travel statistics and summaries
- Enhanced photo organization
- Improved accessibility and mobile usability
- More comprehensive end-to-end testing
- Automated deployment monitoring
- Additional profile customization options

## 👩‍💻 Author

**Khushi**  
B.Tech Computer Science Engineering

- **GitHub:** https://github.com/khushi2005-spec

## ⭐ Support

If you find TripVault useful, consider starring the repository on GitHub.

**TripVault — Save your journeys. Keep your memories.**
