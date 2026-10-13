# Chukwu Israel — Portfolio

A React, Tailwind CSS, and Django portfolio with a video background, sticky profile,
responsive section navigation, scroll animations, an experience timeline, and
GitHub contributions. PostgreSQL stores project content and contact enquiries;
Railway's S3-compatible bucket stores project screenshots.

## Features

- Projects managed through Django Admin, with three cards shown initially and a
  View more button. Descriptions are clamped for equal card sizes, with full text
  available in a keyboard-accessible project details dialog.
- Contact form with field validation, progress and error states, duplicate retry
  protection, a bot honeypot, and basic IP throttling.
- Contact enquiries privately managed in Admin. Optional Resend email notifications
  can be retried from Admin if delivery to the provider fails.
- Accent colour preferences, reduced-motion support, video pausing in background
  tabs, social links, and a direct email fallback.
- Page sharing metadata; canonical links, structured data, and sitemap generated
  when `VITE_SITE_URL` is configured. Empty testimonials stay hidden.

## Local development (PowerShell)

From `C:\myprojects\Portfolio`, use the existing `venv`, or create it if needed:

```powershell
python -m venv venv
.\venv\Scripts\python.exe -m pip install -r backend/requirements.txt
```

Copy `backend/.env.example` to `backend/.env` only if you do not already have one.
Set `DATABASE_URL` to your PostgreSQL public connection URL and provide a local
secret. Django loads `backend/.env` automatically. The configured database may
be shared with production: migrations and Admin changes affect that database.

```powershell
.\venv\Scripts\python.exe backend/manage.py migrate
.\venv\Scripts\python.exe backend/manage.py runserver
```

In a second terminal:

```powershell
cd C:\myprojects\Portfolio\frontend
npm install
npm run dev
```

Vite proxies `/api` and `/media` to `http://127.0.0.1:8000`. Leave the frontend API
variable unset locally or use `/api`. Local image uploads use `backend/media/`
unless bucket environment variables are supplied. Existing cloud image paths
require the matching bucket configuration to load through a local backend.

## Tests

Backend tests use isolated SQLite and in-memory file storage. They never migrate
or write to your Railway database/bucket or send real emails:

```powershell
.\venv\Scripts\python.exe backend/manage.py test portfolio --settings=config.test_settings
.\venv\Scripts\python.exe backend/manage.py makemigrations --check --dry-run --settings=config.test_settings
cd frontend
npm test
npm run build
```

## API

| Endpoint | Method | Purpose |
| --- | --- | --- |
| `/api/projects/` | GET | Ordered public projects with fresh signed screenshot URLs |
| `/api/contact/` | POST | Validate and save a contact enquiry |

Contact payload: `name`, `email`, `subject`, `message` (20–5000 characters), an
optional UUID `submission_id` for retries, and an empty `website` bot field.
Success returns a message with HTTP 201 (or 200 for the same retried submission).
Validation returns 400, conflicting retry IDs return 409, and too many attempts
return 429. There is no public endpoint for reading enquiries.

## Editing and deployment

- Personal details, social links, optional CV link, and genuine testimonials:
  `frontend/src/data/profile.js`.
- Projects: Django Admin. `frontend/src/data/projects.js` is unused legacy data;
  live project cards come exclusively from the API.
- Deployment and third-party setup: [DEPLOYMENT.md](DEPLOYMENT.md).

The contact form works without email-service setup; check Django Admin for saved
messages. Email credentials belong only on the backend. Never put secrets in
variables prefixed with `VITE_`, since they are included in the public frontend.
