# GUNI CARS Platform - Deployment Guide

This guide covers everything required to deploy the **Ganpat University CARS Platform** to production across different hosting environments.

---

## Architecture Summary

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, Canvas Confetti.
- **Backend**: Node.js, Express 5 REST API, In-memory JSON persistent data store.
- **PDF Engine**: Headless Chromium service for official 2-page CARS audit certification reports.
- **Single-Service Capability**: The Express backend automatically serves the Vite production build (`dist/`) as static assets with client-side SPA routing fallback. You can run both frontend and backend on a **single port and single domain**.

---

## Deployment Options

| Option | Best For | Complexity | PDF Generation Support |
| :--- | :--- | :--- | :--- |
| **Option 1: Render.com (Recommended)** | Fastest free/low-cost setup, 1-click Git deploy | Low | Supported via apt package or Docker |
| **Option 2: Docker Container** | AWS ECS, GCP Cloud Run, DigitalOcean, VPS | Medium | Built-in (Chromium pre-installed) |
| **Option 3: Split Deployment** | Vercel (Frontend) + Render (Backend) | Medium | Backend manages PDF generation |
| **Option 4: Institutional VPS / On-Premise** | Ganpat University Data Centre (Ubuntu/Nginx) | Medium | Full native system support |

---

## Option 1: Render.com (Recommended - Single Service)

Render automatically builds your React frontend and serves it through Express on a single HTTPS domain.

### Step-by-Step Instructions:

1. **Push your code to GitHub / GitLab**.
2. Log in to [dashboard.render.com](https://dashboard.render.com) and click **New + > Web Service**.
3. Select your repository.
4. Fill in the deployment settings:
   - **Name**: `guni-cars-platform`
   - **Root Directory**: `guni-cars-platform` *(if the repo has the project inside a subfolder, otherwise leave blank)*
   - **Runtime**: `Node`
   - **Build Command**:
     ```bash
     npm install && npm run build
     ```
   - **Start Command**:
     ```bash
     npm start
     ```
5. **Environment Variables**:
   | Variable | Value | Description |
   | :--- | :--- | :--- |
   | `NODE_ENV` | `production` | Enables production caching and static serving |
   | `PORT` | `10000` | Port automatically assigned by Render |
6. Click **Deploy Web Service**.
7. Once deployed, visit your live URL: `https://guni-cars-platform.onrender.com`.

*(Note: We have also provided a `render.yaml` blueprint file in the repository root for automatic setup).*

---

## Option 2: Docker Container (GCP Cloud Run / AWS / Any VPS)

The repository includes a production `Dockerfile` that packages:
- Node.js 20 runtime
- Google Chromium & font packages for server-side PDF generation
- Vite frontend build
- Express backend server

### 1. Build and Run Locally:
```bash
# Build the Docker image
docker build -t guni-cars-platform .

# Run the container
docker run -d -p 5000:5000 --name guni-cars guni-cars-platform
```
Open your browser at `http://localhost:5000`.

### 2. Deploy to Google Cloud Run:
```bash
# Tag and push to Google Container Registry or Artifact Registry
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/guni-cars-platform

# Deploy service
gcloud run deploy guni-cars-platform \
  --image gcr.io/YOUR_PROJECT_ID/guni-cars-platform \
  --platform managed \
  --region asia-south1 \
  --allow-unauthenticated \
  --port 5000 \
  --memory 1Gi
```

### 3. Deploy to AWS App Runner / ECS:
1. Push the Docker image to **AWS ECR**.
2. Create an **App Runner Service** pointing to your ECR image.
3. Set Port to `5000`.

---

## Option 3: Split Deployment (Vercel Frontend + Render Backend)

If you prefer hosting the React client on **Vercel** or **Netlify** and the Express API on a separate backend host:

### Step 1: Deploy Backend (Render / Railway / Fly.io)
1. Deploy `server/server.js` as a Node web service.
2. Note your live backend URL (e.g. `https://guni-cars-api.onrender.com`).

### Step 2: Deploy Frontend on Vercel
1. Import repository into [vercel.com](https://vercel.com).
2. Framework Preset: **Vite**.
3. Root Directory: `guni-cars-platform` (if applicable).
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. Add Environment Variable:
   - `VITE_API_BASE_URL` = `https://guni-cars-api.onrender.com/api`
7. Click **Deploy**.

*(The included `vercel.json` ensures client-side routing works for direct URLs).*

---

## Option 4: University On-Premise VPS (Ubuntu / Debian + PM2 + Nginx)

For self-hosting on Ganpat University's own server infrastructure:

### 1. Install Node.js & Chromium:
```bash
# Update packages
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs chromium-browser fonts-liberation

# Verify
node -v
chromium-browser --version
```

### 2. Clone and Build:
```bash
git clone https://github.com/YOUR_ORG/guni-cars.git
cd guni-cars/guni-cars-platform
npm install
npm run build
```

### 3. Configure PM2 Process Manager:
```bash
sudo npm install -g pm2
pm2 start server/server.js --name "guni-cars"
pm2 save
pm2 startup
```

### 4. Configure Nginx Reverse Proxy with SSL:
Create `/etc/nginx/sites-available/guni-cars`:
```nginx
server {
    listen 80;
    server_name cars.ganpatuniversity.ac.in;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
Enable site and acquire SSL:
```bash
sudo ln -s /etc/nginx/sites-available/guni-cars /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Free Let's Encrypt SSL
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d cars.ganpatuniversity.ac.in
```

---

## Production Verification Checklist

Before announcing the deployment to stakeholders:

- [ ] **Health Check**: Verify `GET /api/health` returns status `200 OK`.
- [ ] **SPA Routing**: Navigate directly to `/` or reload sub-views to verify SPA fallback.
- [ ] **Project Creation**: Create a test project and confirm it appears in the register.
- [ ] **Tranche Update**: Add an installment and ensure bank realization recalculates.
- [ ] **PDF Generator**: Click **Generate CARS Official Report** from the Executive view and confirm the 2-page certified PDF downloads.
- [ ] **Industry Inquiry**: Submit an inquiry from the Public Showcase and verify it appears in the CARS Admin queue.
