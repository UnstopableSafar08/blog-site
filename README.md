# Sagar's Blogs

A high-performance, serverless blog platform built with Vanilla JavaScript and Turso SQLite. This project focuses on speed, simplicity, and modern aesthetics without the overhead of heavy frameworks.

**Live Site:** [blogs.sagarmalla.info.np](https://blogs.sagarmalla.info.np/)

---

## ✨ Features

- **Serverless Power**: Powered by Turso (SQLite on the edge) for ultra-low latency.
- **SPA Architecture**: Smooth, app-like navigation using a custom client-side router.
- **Dynamic Themes**: Elegant Light and Dark modes with automatic system detection.
- **CMS Dashboard**: Full-featured administrative interface for content management.
- **Rich Editing**: Integrated Quill.js WYSIWYG editor for professional post formatting.
- **SEO Optimized**: Semantic HTML5, unique meta titles, and clean URL structure.
- **Secure by Design**: Credentials managed via GitHub Secrets and local encryption.

---

## 🛠️ Tech Stack

- **Core**: Vanilla JavaScript (ES6+), CSS3, HTML5
- **Database**: [Turso](https://turso.tech/) (LibSQL/SQLite)
- **Styling**: Modern CSS with custom properties (CSS variables)
- **Icons**: Lucide Icons
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

### 2. Configuration
The application requires a Turso database. You can configure it in two ways:

- **Local Development**: Go to `#admin/settings` in your browser and enter your database URL and tokens. These are saved securely in your browser's `localStorage`.
- **Production**: Follow the **Security** section below to set up automated deployment.

---

## 🔒 Security & Deployment

This project uses **GitHub Actions** to securely inject database credentials during the build process, preventing sensitive tokens from being exposed in the public source code.

### Configure GitHub Secrets
1. Navigate to your repository on GitHub.
2. Go to **Settings** > **Secrets and variables** > **Actions**.
3. Create the following **Repository secrets**:

| Secret Name | Purpose |
| :--- | :--- |
| `TURSO_DB_URL` | Your Turso Database HTTP endpoint |
| `TURSO_READ_TOKEN` | Read-only JWT (for public viewing) |
| `TURSO_FULL_TOKEN` | Read-write JWT (for admin operations) |

### Enable GitHub Actions Deployment
1. Go to **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. The next time you `git push`, the site will automatically deploy with your secrets injected.

---

## 📂 Project Structure

```text
.
├── .github/workflows/  # Deployment automation
├── assets/
│   └── img/           # Static media assets
├── index.html          # Core Single Page Application
├── README.md           # Project documentation
└── security_guide.md   # Detailed security breakdown
```

---

## 👤 Author

**Sagar Malla**
- [Portfolio](https://sagarmalla.info.np/)
- [GitHub](https://github.com/UnstopableSafar08)

---

© 2026 Sagar's Blogs. Created with ❤️ for the open web.
