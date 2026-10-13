# Publish the completed portfolio

The code is ready for Railway (Django + PostgreSQL + storage bucket) and Vercel
(React). Existing credentials and environment files have not been changed.

## 1. Push your changes

Review changes, commit them, and push to the repository connected to your deployments.
Do not commit `.env` files or credentials.

## 2. Railway Backend

Keep the existing PostgreSQL and bucket references. Backend service settings:

| Setting | Value |
| --- | --- |
| Root directory | `/backend` |
| Build command | `python manage.py collectstatic --noinput` |
| Pre-deploy command | `python manage.py migrate --noinput` |
| Start command | `gunicorn config.wsgi:application --bind 0.0.0.0:$PORT` |

The new migration creates the contact enquiries table. It must run before visitors
use the form. Tests use a separate in-memory database; they do not create this
table in your live Railway database.

Keep `DJANGO_DEBUG=False`, your existing `DJANGO_SECRET_KEY`, `DATABASE_URL`, and
the `AWS_*` bucket variables. `CORS_ALLOWED_ORIGINS` must contain your actual
Vercel production origin, including `https://`, with no path or trailing slash.
Multiple origins are comma-separated. Set `DJANGO_NUM_PROXIES=1` for the existing
direct Railway deployment. Revisit this if another proxy is added.

Contact submissions work without an email provider: read them under
**Django Admin → Portfolio → Contact enquiries**. Mark messages as read, search
them, and delete messages you no longer need. No public enquiry-list endpoint exists.

## 3. Optional email notifications through Resend

1. Create an account at https://resend.com using the email that should receive notifications.
2. For production, add a domain you own and verify its DNS records in Resend.
   Use a sender address on that verified domain. A Gmail address cannot be the
   sender domain you verify. You do not need to move your portfolio off Vercel.
3. Create an API key with sending permission and put these variables on the
   **Railway Backend** service only:

| Variable | Value |
| --- | --- |
| `RESEND_API_KEY` | Your private Resend API key |
| `CONTACT_FROM_EMAIL` | `Portfolio <hello@YOUR-VERIFIED-DOMAIN>` |
| `CONTACT_TO_EMAIL` | `chukwuisrael146@gmail.com` |

For an initial test without a domain, Resend's `onboarding@resend.dev` sender is
restricted to the account owner's email. Sign up with your destination email and
use `CONTACT_FROM_EMAIL=Portfolio <onboarding@resend.dev>` for that test.
See https://resend.com/docs/knowledge-base/403-error-resend-dev-domain.

Redeploy the backend after adding variables. The visitor's email is used as the
reply-to address. Messages are saved before notifications are attempted; an email
failure does not change a successful form submission into a lost enquiry.
`Notified at` means the provider accepted the email, not proof of inbox delivery.
Retry unsent notifications with the Admin action (up to 20 at once). Notifications
are not automatically retried in the background.

## 4. Vercel

Keep the root directory set to `frontend`, build command `npm run build`, and
output directory `dist`. Production variables:

| Variable | Value |
| --- | --- |
| `VITE_API_BASE_URL` | `https://backend-production-c2015.up.railway.app/api` |
| `VITE_SITE_URL` | Your actual production frontend origin, such as `https://YOUR-SITE.vercel.app` |

Redeploy after saving variables. `VITE_SITE_URL` generates your canonical link,
sharing image URL, structured data, and `/sitemap.xml`. `/robots.txt` is generated
even if this optional value is absent. Never add database, bucket, or email keys
to Vercel's frontend variables.

## 5. Verify the deployment

- Open the live portfolio on a phone and desktop. Check all three initial project
  cards, View more (when more than three projects exist), and Project details.
- Send one real test enquiry from the live form. Confirm its success message and
  the saved record in Admin. If configured, check the email notification and Reply.
- Confirm invalid email addresses and messages shorter than 20 characters are rejected.
- Confirm screenshots load, GitHub activity appears, and social links are correct.
- Check `/robots.txt` and `/sitemap.xml` on the frontend when `VITE_SITE_URL` is set.

Basic contact protection uses a hidden bot field and DRF throttling (five attempts
per hour per IP). The default throttle cache is per worker and resets on restart.
It is not a distributed bot defence. If scaling to multiple workers/replicas,
configure a shared cache; stronger bot protection can be added if abuse occurs.

## Content you can add later

- Put your real CV in `frontend/public/` and set `profile.resumeUrl` in
  `frontend/src/data/profile.js` (for example `/chukwu-israel-cv.pdf`).
- Add genuine feedback to the `testimonials` array there. Until then the section
  and navigation item stay hidden.
- Manage real projects, screenshots, featured ordering, and links through Admin.

GitHub activity currently uses the existing public calendar integration. No token
is required; visitors see a fallback link if its upstream data service is unavailable.
