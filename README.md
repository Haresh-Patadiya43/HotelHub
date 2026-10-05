# HotelHub

HotelHub is a Vite/React frontend and an Express/MongoDB API. The frontend and
backend are deployed as separate Render services.

## Local development

1. Install the frontend dependencies from the repository root:

   ```sh
   npm ci
   ```

2. Create `server/.env` with the backend variables listed in
   [`server/.env.example`](./server/.env.example).
3. Run both applications from the repository root:

   ```sh
   npm run dev
   ```

The frontend uses `VITE_API_URL` for every user and admin API request. It
defaults to `http://localhost:5000` for local development. The shared URL
helper is in [`src/api.js`](./src/api.js).

## Deploy to Render

### 1. Create the backend web service

In Render, create a **Web Service** from this GitHub repository:

- Root Directory: `server`
- Build Command: `npm ci`
- Start Command: `npm start`

Set these environment variables in the Render service settings:

| Variable | Value |
| --- | --- |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Long, randomly generated signing secret |
| `PUBLIC_URL` | The backend's public Render URL, e.g. `https://hotelhub-api.onrender.com` |
| `RESEND_API_KEY` | Resend API key used for password-reset emails |
| `EMAIL_USER` | Gmail address used by the contact form |
| `EMAIL_PASS` | Gmail app password used by the contact form |
| `CONTACT_EMAIL` | Destination email address for contact-form messages |

Render supplies `PORT` automatically. Once deployed, confirm that opening the
backend URL responds with `Hotel Booking API is Running...`.

### 2. Create the frontend static site

In Render, create a **Static Site** from the same repository:

- Root Directory: leave blank
- Build Command: `npm ci && npm run build`
- Publish Directory: `dist`

Set this environment variable **before** the frontend build:

| Variable | Value |
| --- | --- |
| `VITE_API_URL` | Backend's public Render URL, e.g. `https://hotelhub-api.onrender.com` |

Do not add `/api` to `VITE_API_URL`. Configure a rewrite rule in the Static Site
settings so client-side routes work when loaded directly:

- Source: `/*`
- Destination: `/index.html`
- Action: `Rewrite`

After deployment, test hotel browsing, login/registration, bookings, admin
pages, contact form, and password reset. Check the Render backend logs if a
request fails.

## Deployment notes

- `VITE_API_URL` is baked into the static frontend at build time. Rebuild and
  redeploy the frontend after changing it.
- `PUBLIC_URL` must be the backend's public URL so newly uploaded hotel images
  receive a usable URL.
- Hotel uploads currently use the backend's local `server/uploads` directory.
  Render's free service filesystem is ephemeral, so uploaded files may be lost
  on restart or redeploy. Use external object/image storage for persistent
  uploads.
- Render free web services can spin down when idle, so the first API request
  after inactivity may take longer.
