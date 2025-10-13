## Car Repair Workshop – Full‑Stack App (API + React)

Modern CRUD application for managing car repairs with authentication. Backend is an ASP.NET Core 8 Web API with JWT auth and SQL Server via EF Core, frontend is a React app 

### Tech Stack
- Backend: .NET 8, ASP.NET Core Web API, Entity Framework Core (SqlServer), JWT, Swagger
- Frontend: React 19 (CRA), React Router, Testing Library
- DB: SQL Server (local or remote)

### Repository Structure
```
Projekt/
  api/                      # ASP.NET Core 8 Web API
  ReactProjektWarsztat/     # React application (CRA)
```

---

## Backend (api/)

### Prerequisites
- .NET SDK 8.x
- SQL Server instance (LocalDB/Developer/Azure SQL)

### Configuration
1) Copy `api/appsettings.Example.json` to `api/appsettings.json` and set values:
   - `ConnectionStrings:DefaultConnection` → your SQL Server connection string
   - `JWT:ValidAudience`, `JWT:ValidIssuer`, `JWT:Secret` (a strong secret)

2) CORS is open to common local dev ports (e.g., `http://localhost:3000`, `http://localhost:5173`, `https://localhost:7161`). Update in `api/Program.cs` if needed.

### Install & Run
```bash
cd api
dotnet restore

# Create database schema (first time)
dotnet tool restore 2> NUL || echo off
dotnet ef migrations add InitialCreate
dotnet ef database update

# Run API (launchSettings exposes http://localhost:5180 and https://localhost:7161)
dotnet run
```

Swagger UI: `http://localhost:5180/swagger`

### Authentication
- Register and Login via `api/Auth` to receive a JWT token
- Send requests to protected endpoints with header: `Authorization: Bearer <token>`

### Endpoints
- Auth
  - POST `api/Auth/register` – register user `{ name, surname, email, password, role }`
  - POST `api/Auth/login` – returns `{ token, role }`
- Car Repairs (JWT required)
  - GET `api/CarRepair` – list all
  - GET `api/CarRepair/{id}` – get by id
  - POST `api/CarRepair` – create
  - PUT `api/CarRepair/{id}` – update
  - DELETE `api/CarRepair/{id}` – delete
  - GET `api/CarRepair/my` – repairs for the authenticated user (by JWT `sub`)

Request model (example):
```json
{
  "make": "Toyota",
  "model": "Corolla",
  "note": "Oil + filter",
  "ownerId": 1,
  "plateNumber": "KR1234AB",
  "startDate": "2025-03-10",
  "endDate": "2025-03-11"
}
```

---

## Frontend (ReactProjektWarsztat/)

### Prerequisites
- Node.js 18+ and npm

### Install & Run
```bash
cd ReactProjektWarsztat
npm install
npm start
```

The app runs on `http://localhost:3000` by default.

### API Base URL
The frontend calls the API at `http://localhost:5180` (see `src/warsztat/src/api/apiCars.js`). Ensure the backend is running on that port, or adjust the URLs there if you change ports.

---

## Local Development Workflow
1) Start the API: `cd api && dotnet run` (ensure DB is migrated)
2) Start the React app: `cd ReactProjektWarsztat && npm start`
3) Use Swagger to explore endpoints and test auth flows
4) Log in via the UI to obtain and store the JWT, then perform CRUD

---
