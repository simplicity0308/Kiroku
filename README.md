# Kiroku

**Kiroku** is a full-stack web application that helps you track shows (anime, manga, or others) in various states like "watching", "completed", and more. It is built with:

- **Vue 3** (frontend)
- **Express.js** (backend)
- **MongoDB Atlas** (database)

## Features

- Add new shows with title, episode, status, and notes
- Update show information
- Delete shows
- View show details
- Responsive grid layout for show display
- Status tracking ("watching", "completed", "on hold", "dropped", "plan to watch")

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas) (for database)
- [Git](https://git-scm.com/) (for cloning the repository)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/simplicity0308/Kiroku.git
cd Kiroku
```

### 2. Backend Setup

Install the backend dependencies:

```bash
npm install
```

Start the backend server:

```bash
npm start
```

The server will run on `http://localhost:3000`.

### 3. Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install the frontend dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The Vue application will run on `http://localhost:5173`.

## Project Structure

- `frontend/`: Contains the Vue.js frontend application
  - `src/components/`: Vue components including the main HomePage
  - `src/views/`: Modal components and ShowList
  - `src/services/`: API service files
  - `src/composables/`: Reusable composition functions
- `models/`: MongoDB schema definitions
- `controllers/`: Express route handlers
- `routes/`: Express API routes
- `config/`: Configuration files, including database connection

## Dependencies

### Backend Dependencies
- express: ^5.1.0
- mongoose: ^8.14.2
- cors: ^2.8.5
- dotenv: ^16.5.0
- mongodb: ^6.16.0

### Frontend Dependencies
- vue: ^3.5.13
- vue-router: ^4.5.1
- vite: ^6.3.5 (dev dependency)
- @vitejs/plugin-vue: ^5.2.3 (dev dependency)

## Usage

After installation, you can:
1. Access the application at `http://localhost:5173`
2. Add new shows using the "New Entry" button
3. Update show information by clicking the update button on a show card
4. View show details by clicking the view button
5. Delete shows by clicking the delete button

