# 🚀 NestJS Task Manager API

**SDE Intern (Backend) – Technical Assessment**

A fully functional REST API built using **NestJS, PostgreSQL, TypeORM, and JWT Authentication**.  
This project implements all backend requirements for the **SDE Intern (Backend)** internship assessment, including authentication, authorization, CRUD operations, and unit testing.

---

## 📌 Features

### 🔐 Authentication & Authorization
- User registration & login
- Password hashing using **bcrypt**
- **JWT-based Authentication**
- Protected routes using `AuthGuard`

### 🧑‍💼 User Module
- Create & fetch users
- Validation using **DTO + class-validator**
- Role support: `Admin` / `User`

### 📋 Task Module
- Create, Read, Update, Delete Tasks
- Each task is linked to the authenticated user
- Only **owners/Admin** can update or delete tasks
- Task statuses: `OPEN`, `IN_PROGRESS`, `DONE`

### 🧪 Unit Testing
Jest-based unit tests for:
- `AuthService`
- `UsersService`
- `TasksService`

---

## 🧰 Tech Stack

| Technology  | Purpose                    |
|------------|----------------------------|
| NestJS     | Backend Framework          |
| TypeScript | Strongly typed development |
| PostgreSQL | Relational Database        |
| TypeORM    | ORM for DB interaction     |
| JWT        | Authentication             |
| bcrypt     | Password hashing           |
| Jest       | Unit Testing               |

---

## 📁 Project Structure

```bash
src/
│── app.module.ts
│── main.ts
│
├── auth/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── jwt.strategy.ts
│   └── dto/
│       ├── login.dto.ts
│       └── register.dto.ts
│
├── users/
│   ├── users.controller.ts
│   ├── users.service.ts
│   ├── users.module.ts
│   ├── user.entity.ts
│   └── dto/
│       └── create-user.dto.ts
│
├── tasks/
│   ├── tasks.controller.ts
│   ├── tasks.service.ts
│   ├── tasks.module.ts
│   ├── task.entity.ts  
│   └── dto/
│       ├── create-task.dto.ts
│       └── update-task.dto.ts
│
└── common/
    └── guards/
        └── jwt-auth.guard.ts
