# Haridass | Luxury Spiritual Essentials

E-commerce website for spiritual & wellness products built with React + Vite and Node.js backend.

## Project Structure

```
radheradhe/
├── frontend/          # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── ...
│   ├── public/
│   └── package.json
├── backend/           # Node.js + Express + MongoDB
│   ├── controllers/
│   ├── models/
│   └── ...
├── .github/
│   └── workflows/
│       └── deploy.yml   # GitHub Pages deployment
└── README.md
```

## Deploy to GitHub Pages (Live Website)

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/radheradhe.git
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to your repo → **Settings** → **Pages**
2. Under **Build and deployment**, choose **GitHub Actions**
3. The workflow runs automatically on push to `main`

### 3. Your site will be live at

```
https://YOUR_USERNAME.github.io/radheradhe/
```

### 4. If your repo has a different name

Edit `frontend/vite.config.js` and `.github/workflows/deploy.yml` — change `/radheradhe/` to `/{your-repo-name}/`

## Backend (API)

The frontend uses static products when the backend is unavailable. For full features (auth, orders, cart persistence):

1. Deploy the backend to [Render](https://render.com), [Railway](https://railway.app), or similar
2. Add `VITE_API_URL` in the deploy workflow (`.github/workflows/deploy.yml`):

```yaml
env:
  VITE_BASE: /radheradhe/
  VITE_API_URL: https://your-backend.onrender.com
```

## Local Development

```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend (separate terminal)
cd backend
npm install
npm run server
```
