# Bank System

## Description

This is a simple bank system that allows users to create, update, and delete clients, accounts, and transactions. It also includes a user authentication system using JWT tokens. DDD (Domain-Driven Design) is used to model the domain entities and their relationships. The application uses NestJS for the backend and Sequelize for the database.

## Features

- User authentication using JWT tokens
- CRUD operations for clients, accounts, and transactions
- User registration and login
- JWT token generation and verification

## How to Run

1. Clone the repository:

```bash
git clone https://github.com/wess-os/bank-system.git
```

2. Change .env-example to .env and fill in the necessary environment variables:

```bash
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=root
DB_DATABASE=bank-system
JWT_SECRET=your-secret-key
```

3. Run Docker Compose:

```bash
docker-compose up --build
```