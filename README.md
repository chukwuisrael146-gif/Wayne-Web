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

This is an initial scaffold. Models, API endpoints, design, and the contact form
will be implemented next. Dependencies have not been installed.

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
