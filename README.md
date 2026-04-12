# Sagar's Blogs

A modern, serverless blog platform built with vanilla JavaScript and Turso SQLite.

**Live Site:** [https://blogs.sagarmalla.info.np/](https://blogs.sagarmalla.info.np/)

## Features

- **Serverless Architecture** - Powered by Turso edge database
- **Single Page Application (SPA)** - Smooth navigation without page reloads
- **Responsive Design** - Mobile-first approach with dark/light theme support
- **Admin Dashboard** - Full-featured content management system
- **Rich Text Editor** - WYSIWYG editing with Quill.js
- **SEO Friendly** - Clean URLs and semantic HTML structure

## Tech Stack

- **Frontend:** Vanilla JavaScript, CSS3, HTML5
- **Database:** Turso (SQLite on the edge)
- **Editor:** Quill.js WYSIWYG
- **Hosting:** Static site deployment ready

## Project Structure

```
.
├── index.html          # Main SPA application
├── assets/
│   └── img/           # Images and logos
├── .gitignore         # Git ignore rules
└── README.md          # Project documentation
```

## Getting Started

1. Clone the repository
2. Open `index.html` in a browser or serve with a local server
3. Configure your Turso database credentials in the settings

### Run locally.
```bash
python3 -m http.server 8080

# nodejs
npx -y serve .
```

## Admin Access

The admin dashboard is accessible at `#admin/dashboard` route. Default setup requires database configuration for authentication.

## Security

This project uses GitHub Actions to securely inject database credentials during deployment. **Never hardcode tokens in `index.html`.**

### Configure Secrets on GitHub

1. Go to your repository on GitHub.
2. Navigate to **Settings** > **Secrets and variables** > **Actions**.
3. Add the following **Repository secrets**:

| Secret Name | Description |
|------------|-------------|
| `TURSO_DB_URL` | Your Turso Database HTTP URL |
| `TURSO_READ_TOKEN` | A read-only (`ro`) JWT token for public access |
| `TURSO_FULL_TOKEN` | A read-write (`rw`) JWT token for admin access |

### GitHub Pages Setup

1. Go to **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, select **GitHub Actions**.

## Author
... (existing content)

