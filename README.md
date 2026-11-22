# Lead Manager

A full stack lead management application built for the Meru Technosoft Full Stack Developer screening assignment. It lets registered users capture and manage leads, track their status, and view a simple dashboard. Each user can access only the leads associated with their account.

**Live demo:** https://lead-manager-lovat.vercel.app  
**Backend:** https://lead-manager-api-6309.onrender.com  
**Repository:** https://github.com/sparsh34agarwal-commits/Lead_manager

## Features

- User registration and login.
- Password hashing with `bcrypt`.
- JWT authentication stored in an HTTP-only cookie.
- Session restoration after a page refresh and logout.
- User-specific lead ownership enforced by the backend.
- Create, list, edit, and delete leads.
- Lead details: name, email, phone, company, source, and status.
- Search leads by name.
- Filter leads by status and source.
- Dashboard counts for total leads and each status.
- Created/updated timestamps displayed as last activity.
- Frontend form constraints and Mongoose schema validation.


## Assumptions and scope

- Each registered account represents an individual sales user. There are no separate admin or lead-login roles.
- Project Doesn't contains pagination for now, to keep in my the deadline of submission.
- initially I was thinking of search leads by there email and company too, but had problem with implementing all three(name,email,company) at once so skipped that idea.
- Also Sort by function and automated api tests were things in my mind but skipped due to less time.
- I used AI to design frontend templates and for some help if i get stuck somewhere.
- Each lead belongs to the user who created it. The backend enforces this ownership rule for lead operations.
- Source and status are restricted to the enum values listed above.
- A lead's status defaults to `New` if it is omitted.
- Search by name and status/source filtering are performed in the frontend after that user's leads are fetched.

## What I would improve with more time

- will Add pagination
- will try to Add sorting for larger lead lists.
- will Add automated tests for registration, login, validation, CRUD operations, and ownership isolation.
- Standardize API error responses and improve loading, empty, and network-error states.
- Add more complete phone-number validation and request rate limiting for authentication endpoints.

## Tech stack

| Layer | Technologies |
|---|---|
| Frontend | React, Vite, React Router, Axios, Tailwind CSS, Iconify |
| Backend | Node.js, Express |
| Database | MongoDB Atlas, Mongoose |
| Authentication | JSON Web Tokens, bcrypt, HTTP-only cookies |
| Hosting | Vercel (frontend), Render (backend), MongoDB Atlas (database) |

## Run locally

### Prerequisites

- Node.js and npm
- A MongoDB Atlas database (or another MongoDB instance accessible to the backend)
- Git

### 1. Clone the repository

```bash
git clone https://github.com/sparsh34agarwal-commits/Lead_manager.git
cd Lead_manager
```

### 2. Configure and run the backend

```bash
cd Backend
npm install
```

Create `Backend/.env` by copying the example file.

**Windows PowerShell:**

```powershell
Copy-Item .env.example .env
```

**macOS / Linux:**

```bash
cp .env.example .env
```

Edit `Backend/.env` and set your MongoDB connection string, JWT secret, and frontend origin. Then start the backend:

```bash
npm run dev
```

The local API normally runs at `http://localhost:3000`.

### 3. Configure and run the frontend

Open a second terminal from the repository root:

```bash
cd Frontend
npm install
```

Create `Frontend/.env` from the example file using the same copy command shown above. For local development, it should contain:

```env
VITE_API_URL=http://localhost:3000/api
```

Start Vite:

```bash
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).


## API reference

The API base URL is `http://localhost:3000/api` locally. In production, the Vercel `/api` rewrite proxies requests to the Render backend.

### Authentication endpoints

| Method | Endpoint | Auth required | Purpose |
|---|---|---|---|
| `POST` | `/auth/register` | No | Register a user and issue the auth cookie |
| `POST` | `/auth/login` | No | Verify credentials and issue the auth cookie |
| `GET` | `/auth/me` | Yes | Return the current authenticated user's details |
| `POST` | `/auth/logout` | No | Clear the auth cookie |

Registration request body:

```json
{
  "name": "Alex Morgan",
  "email": "alex@example.com",
  "pass": "your-password"
}
```

Login request body:

```json
{
  "email": "alex@example.com",
  "pass": "your-password"
}
```

Passwords are hashed with bcrypt before being stored. The JWT is sent in an HTTP-only cookie. The frontend Axios client uses `withCredentials: true` so the browser can send and receive the cookie.

### Lead endpoints

All lead endpoints require a valid authentication cookie.

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/leads` | Create a lead for the authenticated user |
| `GET` | `/leads` | List leads belonging to the authenticated user |
| `PUT` | `/leads/:id` | Update a lead belonging to the authenticated user |
| `DELETE` | `/leads/:id` | Delete a lead belonging to the authenticated user |

Example create/update body:

```json
{
  "name": "Jordan Miller",
  "email": "jordan@example.com",
  "phone": "+1 555 123 4567",
  "company": "Acme Corp",
  "source": "Website",
  "status": "New"
}
```

Allowed source values:

- `Website`
- `LinkedIn`
- `Referral`
- `ColdCall`
- `Other`

Allowed status values:

- `New`
- `Contacted`
- `Qualified`
- `Lost`

The backend derives the lead owner from the verified JWT, not from a client-supplied owner field. Lead reads, updates, and deletes are scoped to the authenticated user's ID. The Lead schema uses Mongoose timestamps (`createdAt` and `updatedAt`).

### Health check

`GET /api/health` returns a small JSON response to confirm that the API process responds:

```json
{
  "status": "OK",
  "message": "Lead Manager API is running"
}
```

This endpoint checks that Express responds; it is not a full database-readiness or dependency health check.

## Deployment

The frontend and backend are deployed as separate services from the same GitHub repository.

### Backend — Render

- Service type: Web Service
- Root directory: `Backend`
- Build command: `npm install`
- Start command: `npm start`
- Configure `MONGODB_URI`, `JWT_SECRET_KEY`, `NODE_ENV=production`, and `FRONTEND_URL` in the Render environment settings.
- Allow the Render service's outbound IP ranges in the MongoDB Atlas network access list.

### Frontend — Vercel

- Framework preset: Vite
- Root directory: `Frontend`
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `VITE_API_URL=/api`
- `Frontend/vercel.json` forwards API requests to Render and routes other paths to `index.html` for client-side React Router navigation.
