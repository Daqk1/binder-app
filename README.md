# Binder App

A modern web app for managing and tracking your Pokémon card collection. Built with React (frontend), Node.js/Express (backend), MongoDB (multi-user storage), and Auth0 (authentication).

## Features
- Search and browse Pokémon cards by set and name
- Add/remove cards to your personal collection
- View your collection and total value
- Multi-user support (each user has their own collection)
- Secure authentication with Auth0

---

## Local Development Setup

### Prerequisites
- Node.js (v16+ recommended)
- npm (v8+ recommended)
- MongoDB Atlas account (or local MongoDB instance)
- Auth0 account (for authentication)

---

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd binder-app
```

### 2. Install Dependencies
Install root dependencies (for concurrently):
```bash
npm install
```
Install client dependencies:
```bash
cd client
npm install
```
Install server dependencies:
```bash
cd ../server
npm install
```

---

### 3. Set Up Environment Variables

#### **Client (.env)**
Create a file at `client/.env` with the following:
```
REACT_APP_AUTH0_DOMAIN=your-auth0-domain
REACT_APP_AUTH0_CLIENT_ID=your-auth0-client-id
```
- Get these values from your Auth0 dashboard (Applications > your app > Settings).

#### **Server (.env)**
Create a file at `server/.env` with the following:
```
MONGODB_URI=your-mongodb-connection-string
PORT=8000
```
- `MONGODB_URI` can be from MongoDB Atlas or your local MongoDB instance.
- `PORT` should match the proxy in `client/package.json` (default: 8000).

---

### 4. Run the App Locally
From the project root:
```bash
npm start
```
- This will start both the client (React) and server (Express) using `concurrently`.
- The React app will be available at [http://localhost:3000](http://localhost:3000)
- The backend API will run at [http://localhost:8000](http://localhost:8000)

---

### 5. Usage
- Register/login with Auth0 to create your own collection.
- Search for cards, add them to your collection, and view your collection value.
- Each user's collection is private and stored in MongoDB.

---

### 6. Customization & Deployment
- Update Auth0 and MongoDB settings as needed for your environment.
- For production, build the React app with `npm run build` in the `client` directory and serve it with your preferred method.

---
