# Task Manager API

This is a Task Manager API project, designed to manage tasks for authenticated users. It includes features for user registration, login, and CRUD operations on tasks. The project is built using Express.js and MySQL.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Dependencies and Technologies](#dependencies-and-technologies)
- [Contact](#contact)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/isaac0yen/task-manager-api.git
   cd task-manager-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the database:

   - Make sure you have a MySQL server running.
   - Create a database using the SQL script provided in `database.sql`.

4. Create a `.env` file at the root of the project and configure your environment variables. Example:

   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=task_manager
   JWT_SECRET=your_jwt_secret
   ```

5. Start the server:

   ```bash
   npm start
   ```

## Usage

- The API server will start at `http://localhost:3000`.
- You can access the API documentation at `http://localhost:3000/api-docs`.

## API Documentation

### Authentication

#### Register a new user

- **Endpoint**: `/auth/register`
- **Method**: `POST`
- **Request Body**:

  ```json
  {
    "username": "exampleUser",
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```

- **Responses**:
  - `201`: User registered successfully
  - `400`: Bad Request

#### Login a user

- **Endpoint**: `/auth/login`
- **Method**: `POST`
- **Request Body**:

  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```

- **Responses**:
  - `200`: Successful login (returns a JWT token)
  - `400`: Bad Request
  - `401`: Unauthorized

### Tasks

#### Create a new task

- **Endpoint**: `/tasks_api/tasks`
- **Method**: `POST`
- **Security**: Bearer token (JWT)
- **Request Body**:

  ```json
  {
    "title": "Task Title",
    "description": "Task Description"
  }
  ```

- **Responses**:
  - `201`: Task created successfully
  - `400`: Bad Request
  - `401`: Unauthorized

#### Get all tasks for the authenticated user

- **Endpoint**: `/tasks_api/tasks`
- **Method**: `GET`
- **Security**: Bearer token (JWT)
- **Responses**:
  - `200`: A list of tasks
  - `401`: Unauthorized

#### Get a specific task by ID

- **Endpoint**: `/tasks_api/tasks/{id}`
- **Method**: `GET`
- **Security**: Bearer token (JWT)
- **Parameters**:
  - `id` (path): Task ID
- **Responses**:
  - `200`: Task details
  - `401`: Unauthorized
  - `404`: Not Found

#### Update a task

- **Endpoint**: `/tasks_api/tasks/{id}`
- **Method**: `PUT`
- **Security**: Bearer token (JWT)
- **Parameters**:
  - `id` (path): Task ID
- **Request Body**:

  ```json
  {
    "title": "Updated Task Title",
    "description": "Updated Task Description"
  }
  ```

- **Responses**:
  - `200`: Task updated successfully
  - `400`: Bad Request
  - `401`: Unauthorized
  - `404`: Not Found

#### Delete a task

- **Endpoint**: `/tasks_api/tasks/{id}`
- **Method**: `DELETE`
- **Security**: Bearer token (JWT)
- **Parameters**:
  - `id` (path): Task ID
- **Responses**:
  - `200`: Task deleted successfully
  - `401`: Unauthorized
  - `404`: Not Found

### Users

#### Get all users

- **Endpoint**: `/users_api/users`
- **Method**: `GET`
- **Security**: Bearer token (JWT)
- **Responses**:
  - `200`: A list of users
  - `401`: Unauthorized

#### Get a specific user by ID

- **Endpoint**: `/users_api/users/{id}`
- **Method**: `GET`
- **Security**: Bearer token (JWT)
- **Parameters**:
  - `id` (path): User ID
- **Responses**:
  - `200`: User details
  - `401`: Unauthorized
  - `404`: Not Found

#### Update a user

- **Endpoint**: `/users_api/users/{id}`
- **Method**: `PUT`
- **Security**: Bearer token (JWT)
- **Parameters**:
  - `id` (path): User ID
- **Request Body**:

  ```json
  {
    "username": "UpdatedUser",
    "email": "updated@example.com"
  }
  ```

- **Responses**:
  - `200`: User updated successfully
  - `400`: Bad Request
  - `401`: Unauthorized
  - `404`: Not Found

#### Delete a user

- **Endpoint**: `/users_api/users/{id}`
- **Method**: `DELETE`
- **Security**: Bearer token (JWT)
- **Parameters**:
  - `id` (path): User ID
- **Responses**:
  - `200`: User deleted successfully
  - `401`: Unauthorized
  - `404`: Not Found

## Project Structure

## Project Structure

```
├── controllers
│ ├── authController.js
│ ├── taskController.js
│ └── userController.js
├── database.sql
├── docs.json
├── helpers
│ ├── mySQL.js
│ └── validate.js
├── index.js
├── logs
│ ├── error.log
│ └── info.log
├── middleware
│ ├── auth.js
│ └── errorHandler.js
├── package.json
├── package-lock.json
├── routes
│ ├── auth.routes.js
│ ├── task.routes.js
│ └── user.routes.js
└── utils
└── logger.js
```

## Dependencies and Technologies

The following dependencies and technologies are used in this project:

- **[bcryptjs](https://www.npmjs.com/package/bcryptjs)**: ^2.4.3 - Library to hash passwords.
- **[body-parser](https://www.npmjs.com/package/body-parser)**: ^1.20.2 - Middleware to parse incoming request bodies.
- **[cors](https://www.npmjs.com/package/cors)**: ^2.8.5 - Middleware to enable CORS (Cross-Origin Resource Sharing).
- **[dotenv](https://www.npmjs.com/package/dotenv)**: ^16.4.5 - Module to load environment variables from a `.env` file.
- **[express](https://www.npmjs.com/package/express)**: ^4.19.2 - Web framework for Node.js.
- **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)**: ^9.0.2 - Library to work with JSON Web Tokens.
- **[luxon](https://www.npmjs.com/package/luxon)**: ^3.4.4 - Library for handling dates and times.
- **[mysql2](https://www.npmjs.com/package/mysql2)**: ^3.9.7 - MySQL client for Node.js.
- **[socket.io](https://www.npmjs.com/package/socket.io)**: ^4.7.5 - Library for real-time, bidirectional communication between web clients and servers.
- **[swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc)**: ^6.2.8 - Library to generate swagger documentation from JSDoc comments.
- **[swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)**: ^5.0.0 - Middleware to serve auto-generated swagger-ui generated API docs.

## Contact

For any inquiries, please contact:

- **Name**: Isaac Oyeniyi
- **Email**: isaacoyeniyi06@gmail.com
- **GitHub**: [isaac0yen](https://github.com/isaac0yen)

Feel free to reach out if you have any questions or suggestions.

---
