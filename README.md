# Sagar's Blogs

A high-performance, serverless blog platform built with Vanilla JavaScript and Turso SQLite. This project focuses on speed, simplicity, and modern aesthetics without the overhead of heavy frameworks.

**Live Site:** [blogs.sagarmalla.info.np](https://blogs.sagarmalla.info.np/)

---

## ✨ Features

- **Serverless Power**: Powered by Turso (SQLite on the edge) for ultra-low latency.
- **SPA Architecture**: Smooth, app-like navigation using a custom client-side router.
- **Dynamic Themes**: Elegant Light and Dark modes with automatic system detection.
- **CMS Dashboard**: Full-featured administrative interface for content management.
- **Rich Editing**: Integrated Quill.js WYSIWYG editor with syntax highlighting support.
- **Email Notifications**: Automated admin alerts for password resets via EmailJS.
- **Security Hardened**: 
    - Credentials managed via GitHub Secrets and local overrides.
    - Password visibility toggles on login/setup pages.
    - Rate-limited password reset requests (60s interval).
- **SEO Optimized**: Semantic HTML5, unique meta titles, and clean URL structure.

---

## 🛠️ Tech Stack

- **Core**: Vanilla JavaScript (ES6+), CSS3, HTML5
- **Database**: [Turso](https://turso.tech/) (LibSQL/SQLite)
- **Email Service**: [EmailJS](https://www.emailjs.com/)
- **Icons**: Custom SVG set (based on Lucide)
- **Editor**: Quill.js

---

## 🚀 Getting Started

### 1. Local Development
Clone the repository and serve it using any local web server:

```bash
# Python
python3 -m http.server 8080

# Node.js
npx -y serve .
```

To configure your database and email locally without editing `index.html`, create a `config.local.js` file in the root (this file is ignored by git):

```javascript
// config.local.js
window.LOCAL_DB_CONFIG = {
    url: 'https://your-db-url.turso.io',
    readToken: 'your-read-token',
    fullToken: 'your-admin-token'
};

window.LOCAL_EMAIL_CONFIG = {
    publicKey: 'your-public-key',
    serviceId: 'your-service-id',
    templateId: 'your-template-id'
};
```

### 2. General Configuration
The application can also be configured directly via the UI:
- **Settings Page**: Go to `#admin/settings` (requires login) to update your database connection tokens. These are saved in your browser's `localStorage`.

---

## 🔒 Security & Deployment

This project uses **GitHub Actions** to securely inject credentials during the build process, ensuring no sensitive tokens are exposed in your public code.

### Configure GitHub Secrets
1. Navigate to your repository on GitHub.
2. Go to **Settings** > **Secrets and variables** > **Actions**.
3. Create the following **Repository secrets**:

| Secret Name | Purpose |
| :--- | :--- |
| `TURSO_DB_URL` | Your Turso Database HTTP endpoint |
| `TURSO_READ_TOKEN` | Read-only JWT (for public viewing) |
| `TURSO_FULL_TOKEN` | Read-write JWT (for admin operations) |
| `EMAILJS_PUBLIC_KEY` | Your EmailJS Public Key |
| `EMAILJS_SERVICE_ID` | Your EmailJS Service ID |
| `EMAILJS_TEMPLATE_ID` | Your EmailJS Template ID |

### Enable GitHub Actions Deployment
1. Go to **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. The next time you `git push`, the site will automatically deploy with your secrets injected.

---

## 👤 Author

**Sagar Malla**
- [Portfolio](https://sagarmalla.info.np/)
- [GitHub](https://github.com/UnstopableSafar08)

---

© 2026 Sagar's Blogs. Created with ❤️ for the open web.
