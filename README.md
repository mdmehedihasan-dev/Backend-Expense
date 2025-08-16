# Expense Tracker Backend

This is the backend API for the Expense Tracker application, built with Node.js, Express, and MongoDB. It provides user authentication and expense management features.

## Features

- User registration and login (JWT-based authentication)
- CRUD operations for expenses
- Input validation and error handling
- CORS support for frontend integration

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account or local MongoDB instance

## Getting Started

### 1. Clone the Repository

```sh
git clone <your-repo-url>
cd Expense-Backend
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory (already present in this project):

```
MONGODB_URI="your-mongodb-connection-string"
PORT=8000
FRONTEND_URL=https://expense-frontend-henna.vercel.app
```

- Replace `your-mongodb-connection-string` with your actual MongoDB URI.
- Adjust `PORT` and `FRONTEND_URL` as needed.

### 4. Start the Server

npm start

The server will start on the port specified in `.env` (default: 8000).

### 5. API Endpoints

#### Authentication

- `POST /api/auth/register` — Register a new user  
  **Body:** `{ "name": "John", "email": "john@example.com", "password": "secret123" }`

- `POST /api/auth/login` — Login  
  **Body:** `{ "email": "john@example.com", "password": "secret123" }`

#### Expenses (Protected: Requires Bearer Token)

- `GET /api/expenses` — Get all expenses (supports `category`, `startDate`, `endDate` query params)
- `POST /api/expenses` — Add a new expense  
  **Body:** `{ "title": "...", "amount": 100, "category": "...", "date": "YYYY-MM-DD" }`
- `PATCH /api/expenses/:id` — Update an expense
- `DELETE /api/expenses/:id` — Delete an expense

**Note:** Include the JWT token in the `Authorization` header as `Bearer <token>` for all `/api/expenses` routes.

### 6. Development

For development with auto-reload, you can use [nodemon](https://nodemon.io/):

```sh
npx nodemon server.js
```

### 7. Folder Structure

```
.
├── .env
├── package.json
├── server.js
├── config/
│   └── database.js
├── controllers/
│   ├── authController.js
│   └── expensesController.js
├── middleware/
│   ├── authMiddleware.js
│   └── validation.js
├── models/
│   ├── expenseModel.js
│   └── userModel.js
└── routes/
    ├── authRoutes.js
    └── expenseRoute.js
```

### 8. Environment Variables

- `MONGODB_URI`: MongoDB connection string
- `PORT`: Port number for the server (default: 8000)
- `FRONTEND_URL`: Allowed frontend origin for CORS

### 9. Troubleshooting

- **MongoDB connection errors:** Check your `MONGODB_URI` in `.env`.
- **CORS issues:** Ensure `FRONTEND_URL` matches your frontend app's URL.
- **JWT errors:** Make sure the `JWT_SECRET` is set (defaults to `"your_jwt_secret"` if not provided).

