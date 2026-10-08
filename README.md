# Portfolio

Django backend and React frontend for a personal portfolio inspired by Drake.

## Structure

- `backend/config/`: Django project settings and entry points.
- `backend/portfolio/`: portfolio models, admin, and API.
- `frontend/src/components/`: reusable interface components.
- `frontend/src/sections/`: portfolio page sections.
- `frontend/src/services/`: API helpers.
- `frontend/src/styles/`: shared styles.
- `frontend/src/assets/`: bundled images and assets.
- `frontend/public/`: publicly served files, such as a CV.

The frontend includes the video background, profile card, section navigation,
appearance settings, hero, about, experience, services, skills, projects,
GitHub contributions placeholder, testimonials, and contact message preparation.

Personal details live in `frontend/src/data/profile.js`. Project details and
screenshots are configured in `frontend/src/data/projects.js`; image assets go
in `frontend/public/images/`. Three projects appear initially, with an expansion
button for the rest. Add verified testimonials to the exported testimonials array.

The contact form validates and prepares an email draft; it does not submit to a
backend or claim delivery. GitHub contribution data is deliberately unconnected
for the next guided setup. Django models and API endpoints are still a scaffold.

## Local setup (PowerShell)

From the project root:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r backend/requirements.txt
python backend/manage.py migrate
python backend/manage.py runserver
```

In a separate terminal:

```powershell
cd frontend
npm install
npm run dev
```

Vite proxies `/api` requests to Django on port 8000 during development.
The backend uses SQLite locally. Set `DJANGO_SECRET_KEY` and `DJANGO_DEBUG`
through environment variables before deployment. Django does not automatically
read `.env` files in this scaffold.
