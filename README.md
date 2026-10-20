# Znow - India's Coffee App ⚡☕

Hyperlocal 10-minute coffee delivery landing page. Built with HTML5, Tailwind CSS, Vite, and deployed to Firebase Hosting.

## 🚀 Local Development

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev
```

## 📦 Build & Local Deploy to Firebase

To build and deploy directly to Firebase Hosting in one command:

```bash
npm run deploy
```

This will automatically:
1. Run `vite build` to generate the production `dist/` bundle.
2. Deploy to Firebase Hosting project `znow-9b00d` at `https://znow-9b00d.web.app`.

---

## 🔄 GitHub Auto-Deploy (CI/CD)

Whenever code is pushed to the `main` branch, GitHub Actions will automatically build and deploy to Firebase Hosting.

### Setting up Firebase Secret on GitHub (One-Time):
1. In your GitHub repository (`raushandubey/Znow-website-`), go to **Settings** > **Secrets and variables** > **Actions**.
2. Click **New repository secret**.
3. Create a secret named: `FIREBASE_SERVICE_ACCOUNT_ZNOW_9B00D` (with your Firebase service account JSON) OR `FIREBASE_TOKEN` (generated via `npx firebase login:ci`).

---

## 🌐 Custom Domain Setup (GoDaddy: `znow.in`)

In Firebase Console (`znow-9b00d` > Hosting > Add custom domain `znow.in`), and in GoDaddy DNS Management:

| Type | Name / Host | Value / Target |
| :--- | :--- | :--- |
| **A** | `@` | `199.36.158.100` *(Or IP provided by Firebase)* |
| **CNAME** | `www` | `znow-9b00d.web.app` |
