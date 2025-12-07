# 🚀 NestJS Backend API – SDE Intern Assessment

This project is a **NestJS-based backend application** built as part of the **SDE Intern (Backend)** technical assessment. It features **JWT authentication**, **PostgreSQL database integration**, and complete **CRUD operations using TypeORM**.

The project is clean, modular, maintainable, and scalable with proper error handling and comprehensive test coverage.

---

## 📌 **Features**

### 🔐 Authentication (JWT)
- User registration with validation
- User login with JWT token generation
- Password hashing using bcryptjs
- JWT-based protected routes with guards
- Secure session management

### 📁 Task Management (CRUD)
- Create tasks with validation
- Retrieve all tasks (user-specific)
- Update task details
- Delete tasks
- Task ownership validation

### 🧰 Additional Features
- DTO validation using `class-validator`
- Modular architecture (Auth, Users, Tasks modules)
- TypeORM repository pattern for data access
- Environment-based configuration with dotenv
- Global validation pipes for request sanitization
- Comprehensive error handling
- Unit tests for services (Jest)
- TypeScript with strict type checking

---

## 🛠️ **Tech Stack**

| Technology | Version | Usage |
|-----------|---------|-------|
| **NestJS** | ^10.4.20 | Backend framework |
| **TypeScript** | ^5.2.2 | Programming language |
| **PostgreSQL** | N/A | Database |
| **TypeORM** | ^0.3.28 | ORM |
| **JWT** | ^10.0.0 | Authentication |
| **bcryptjs** | ^5.1.0 | Password hashing |
| **Jest** | ^29.0.0 | Testing framework |
| **Passport** | ^0.6.0 | Authentication middleware |

---

## 📁 **Project Structure**

```
nest-sde-intern-backend/
├── src/
│   ├── auth/                   # Authentication module
│   │   ├── auth.controller.ts  # Login & registration endpoints
│   │   ├── auth.service.ts     # Auth business logic
│   │   ├── auth.module.ts      # Auth module configuration
│   │   ├── jwt.strategy.ts     # JWT validation strategy
│   │   └── dto/
│   │       └── login.dto.ts    # Login request DTO
│   │
│   ├── users/                  # Users module
│   │   ├── users.controller.ts # User endpoints
│   │   ├── users.service.ts    # User business logic
│   │   ├── users.module.ts     # Users module configuration
│   │   ├── user.entity.ts      # User database entity
│   │   └── dto/
│   │       └── create-user.dto.ts # User creation DTO
│   │
│   ├── tasks/                  # Tasks module
│   │   ├── tasks.controller.ts # Task endpoints
│   │   ├── tasks.service.ts    # Task business logic
│   │   ├── tasks.module.ts     # Tasks module configuration
│   │   ├── task.entity.ts      # Task database entity
│   │   └── dto/
│   │       ├── create-task.dto.ts  # Task creation DTO
│   │       └── update-task.dto.ts  # Task update DTO
│   │
│   ├── utils/
│   │   └── jwt-auth.guard.ts   # JWT authentication guard
│   │
│   ├── app.module.ts           # Root application module
│   └── main.ts                 # Application entry point
│
├── test/
│   ├── auth.service.spec.ts    # Auth service tests
│   └── tasks.service.spec.ts   # Tasks service tests
│
├── package.json                # Project dependencies
├── tsconfig.json               # TypeScript configuration
├── jest.config.js              # Jest test configuration
└── README.md                   # Project documentation
```

---

## 🚀 **Getting Started**

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v12 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nest-sde-intern-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   # Database Configuration
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USER=postgres
   DATABASE_PASSWORD=your_password
   DATABASE_NAME=nest_sde_intern

   # Server Configuration
   PORT=3000

   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRATION=3600
   ```

4. **Run database migrations**
   TypeORM will automatically sync the schema on startup (development mode):
   ```bash
   npm run start:dev
   ```

---

## 📚 **API Endpoints**

### Authentication Routes

#### Register a new user
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### Task Routes (Protected - Requires JWT)

#### Create a task
```http
POST /tasks
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the NestJS project",
  "dueDate": "2025-12-31"
}
```

#### Get all user tasks
```http
GET /tasks
Authorization: Bearer <access_token>
```

#### Update a task
```http
PATCH /tasks/:id
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description",
  "completed": true
}
```

#### Delete a task
```http
DELETE /tasks/:id
Authorization: Bearer <access_token>
```

---

## 🧪 **Testing**

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm run test:watch
```

### Run tests with coverage
```bash
npm test -- --coverage
```

Test files are located in the `test/` directory:
- `auth.service.spec.ts` - Authentication service tests
- `tasks.service.spec.ts` - Task service tests

---

## 💻 **Development Commands**

| Command | Description |
|---------|-------------|
| `npm start` | Start the application (production mode) |
| `npm run start:dev` | Start in watch mode (development) |
| `npm run build` | Build the project |
| `npm test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Run ESLint and fix issues |
| `npm run typeorm` | TypeORM CLI commands |

---

## 🔒 **Security Features**

- **Password Hashing**: Bcryptjs with salt rounds for secure password storage
- **JWT Authentication**: Token-based authentication with expiration
- **Request Validation**: Global ValidationPipe with whitelist and DTOs
- **Route Guards**: JWT authentication guards on protected routes
- **Input Sanitization**: Automatic removal of non-whitelisted fields
- **Error Handling**: Proper HTTP error responses with meaningful messages

---

## 📋 **Environment Variables**

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_HOST` | PostgreSQL host | `localhost` |
| `DATABASE_PORT` | PostgreSQL port | `5432` |
| `DATABASE_USER` | Database username | `postgres` |
| `DATABASE_PASSWORD` | Database password | `postgres` |
| `DATABASE_NAME` | Database name | `nest_sde_intern` |
| `PORT` | Server port | `3000` |
| `JWT_SECRET` | JWT signing secret | N/A (required) |
| `JWT_EXPIRATION` | JWT expiration time (seconds) | `3600` |

---

## 🐛 **Error Handling**

The application provides meaningful error responses:
- `400 Bad Request` - Invalid input or validation errors
- `401 Unauthorized` - Missing or invalid JWT token
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server errors

Example error response:
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

---

## 📝 **Database Schema**

### Users Table
```sql
CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "email" VARCHAR UNIQUE NOT NULL,
  "password" VARCHAR NOT NULL,
  "name" VARCHAR,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tasks Table
```sql
CREATE TABLE "task" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR NOT NULL,
  "description" VARCHAR,
  "completed" BOOLEAN DEFAULT FALSE,
  "userId" INTEGER NOT NULL REFERENCES "user"("id"),
  "dueDate" DATE,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🤝 **Contributing**

This is an assessment project. For contributions or suggestions, please open an issue or submit a pull request.

---

## 📄 **License**

This project is provided as-is for educational and assessment purposes.

---

## 📧 **Contact & Support**

For questions or support related to this project, please reach out to the project maintainers.

---

## ✅ **Checklist for Assessment**

- ✅ NestJS backend framework
- ✅ TypeScript for type safety
- ✅ PostgreSQL database integration
- ✅ TypeORM ORM implementation
- ✅ JWT authentication
- ✅ User registration and login
- ✅ Task CRUD operations
- ✅ DTO validation
- ✅ Modular architecture
- ✅ Error handling
- ✅ Unit tests with Jest
- ✅ Code comments and documentation
- ✅ Environment configuration
- ✅ Clean code structure
- ✅ Security best practices

---

**Last Updated**: December 2025

