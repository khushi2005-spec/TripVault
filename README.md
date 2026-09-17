# TripVault ✈️

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
└── README.md