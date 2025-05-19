# Kiroku - Show Tracking Application

**Kiroku** is a full-stack web application that helps you track shows in various states using Vue 3, Express.js, and MongoDB Atlas.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) 
- [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas)
- [Git](https://git-scm.com/)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/simplicity0308/Kiroku.git
cd Kiroku
```

### 2. Setup Environment Variables

Create a `.env` file in the project root:

```bash
# Create the .env file
NODE_ENV=development
MONGO_URI=your_mongodb_atlas_connection_string" 
```

 `your_mongodb_atlas_connection_string` is removed for privacy.

### 3. Backend Setup

Install the backend dependencies and start the server:

```bash
# Install backend dependencies
npm install

# Start the backend server
npm start
```

The server will run on `http://localhost:3000`.

### 4. Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
# Navigate to frontend directory
cd frontend

# Install frontend dependencies
npm install

# Start the development server
npm run dev
```

The Vue application will run on `http://localhost:5173`.

## Development Scripts

### Backend

```bash
# Run backend server (in root folder)
node server.js


```

### Frontend

```bash
# Run frontend in development mode
cd frontend
npm run dev

# Build frontend for production
cd frontend
npm run build
```

## MongoDB Atlas Setup

1. Create a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
2. Create a new cluster
3. Create a database user with read/write permissions
4. Whitelist your IP address in the Network Access settings
5. Get your connection string from the "Connect" button on your cluster
6. Replace placeholders in the connection string with your username and password




