# Patient Portal (Vercel) — Complete Project

This project is a Next.js (App Router) patient portal designed for deployment on Vercel.
Features:
- Public emergency pages: `/p/:patientId` (no auth)
- Doctor dashboard `/doctor` (login required)
- SOS API: `POST /api/sos`
- Realtime notifications via Pusher
- Prisma + Postgres (Neon recommended)

## Quickstart (local)

1. Copy `.env.example` to `.env` and set values.
2. Install deps:
   ```bash
   npm ci
   ```
3. Generate Prisma client:
   ```bash
   npx prisma generate
   ```
4. Create/migrate DB (if you have migrations) or run deploy:
   ```bash
   npx prisma db push
   ```
5. Seed doctor user:
   ```bash
   npm run seed
   ```
6. Run dev:
   ```bash
   npm run dev
   ```
7. Visit http://localhost:3000

## Deployment to Vercel

1. Create a GitHub repo and push this project.
2. Create Neon or PostgreSQL and set `DATABASE_URL` in Vercel environment variables.
3. Create a Pusher app and set the PUSHER_* vars in Vercel.
4. In Vercel Dashboard, import the repo and set environment variables.
5. Deploy. Vercel will give you a free URL like `https://patients-yourproject.vercel.app`.

## SOS examples

POST https://<your-domain>/api/sos
Body:
```json
{ "patientId": "P-12345", "message": "Emergency wakeword detected", "heartRate": 120 }
```
Other valid examples:
```json
{ "patientId":"P-12345", "message":"Patient unresponsive during sleep", "heartRate":58 }
{ "patientId":"P-12345", "message":"Medication reminder missed", "heartRate":92 }
```

## Twingate / Raspberry Pi NAS integration

Vercel cannot run Twingate client. Run a small sync agent on your Raspberry Pi (with Twingate access) to sync data between NAS and Neon DB.

## Notes

- Replace secrets in `.env`.
- For production, secure authentication and consider NextAuth or OAuth.
