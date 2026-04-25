/**
 * INKWELL BLOG — CORE MODULES
 * Shared icons, database client, authentication, and UI utilities.
 */

// ==========================================
// MODULE 1: Icons — SVG Icon Library
// ==========================================
const Icons = {
    copy: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',
    check: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    eyeOff: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
    fileText: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1-2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    logout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
    arrowLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
    arrowRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    alertCircle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    database: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>',
    chevLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>',
    chevRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>',
    inbox: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>',
    key: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.78 7.78 5.5 5.5 0 0 1 7.78-7.78Zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>',
    tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
    markdown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4h20v16H2z"/><path d="M6 16V8l4 4 4-4v8"/><path d="M20 12l-2.5-3L15 12"/></svg>',
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
};

// ==========================================
// MODULE 2: DB — Turso HTTP API Client
// ==========================================
const DB = (() => {
    const CONFIG_KEY = 'inkwell_db_config';
    let config = { url: '__TURSO_DB_URL__', readToken: '__TURSO_READ_TOKEN__', fullToken: '__TURSO_FULL_TOKEN__' };

    function loadConfig() {
        if (window.LOCAL_DB_CONFIG) { config = { ...window.LOCAL_DB_CONFIG }; return; }
        try {
            const s = localStorage.getItem(CONFIG_KEY);
            if (s) {
                const loaded = JSON.parse(s);
                const hasNonAscii = (str) => str && /[^\x00-\xff]/.test(str);
                if (hasNonAscii(loaded.readToken) || hasNonAscii(loaded.fullToken)) { localStorage.removeItem(CONFIG_KEY); return; }
                config = loaded;
            }
        } catch (e) { localStorage.removeItem(CONFIG_KEY); }
    }

    function saveConfig(url, readToken, fullToken) {
        config = { url: url.replace(/\/+$/, ''), readToken, fullToken };
        localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
    }

    function isConfigured() { return !!(config.url && config.readToken); }
    function hasWriteAccess() { return !!config.fullToken; }
    function getConfig() { return { ...config }; }

    async function execute(sql, args = [], write = false) {
        if (!isConfigured()) throw new Error('Database not configured. Go to Settings.');
        const token = write ? config.fullToken : config.readToken;
        if (write && !token) throw new Error('Write token not set. Add it in Settings.');

        const typedArgs = args.map(a => {
            if (a === null || a === undefined) return { type: 'null', value: null };
            if (typeof a === 'number') return Number.isInteger(a) ? { type: 'integer', value: String(a) } : { type: 'float', value: String(a) };
            return { type: 'text', value: String(a) };
        });

        const body = { requests: [{ type: 'execute', stmt: { sql, args: typedArgs } }, { type: 'close' }] };
        const res = await fetch(`${config.url}/v2/pipeline`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (!res.ok) { const t = await res.text(); throw new Error(`DB Error ${res.status}: ${t}`); }
        const data = await res.json();
        if (data.results?.[0]?.type === 'error') throw new Error(data.results[0].error?.message || 'SQL execution error');
        const result = data.results?.[0]?.response?.result;
        return parseResult(result);
    }

    function parseResult(result) {
        if (!result) return { cols: [], rows: [], affected: 0, lastId: null };
        const colNames = (result.cols || []).map(c => c.name);
        const rows = (result.rows || []).map(row => {
            const obj = {};
            row.forEach((cell, i) => {
                if (cell.type === 'null') obj[colNames[i]] = null;
                else if (cell.type === 'integer') obj[colNames[i]] = parseInt(cell.value, 10);
                else if (cell.type === 'float') obj[colNames[i]] = parseFloat(cell.value);
                else obj[colNames[i]] = cell.value;
            });
            return obj;
        });
        return { cols: colNames, rows, affected: result.affected_row_count || 0, lastId: result.last_insert_rowid ? parseInt(result.last_insert_rowid, 10) : null };
    }

    async function initTables() {
        const schema = [
            "CREATE TABLE IF NOT EXISTS admin (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password_hash TEXT, role TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)",
            "CREATE TABLE IF NOT EXISTS admin_tokens (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, token TEXT, type TEXT, expires_at DATETIME)",
            "CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, slug TEXT UNIQUE, excerpt TEXT, content TEXT, category TEXT, tags TEXT, status TEXT DEFAULT 'draft', views INTEGER DEFAULT 0, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)",
            "CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY AUTOINCREMENT, post_id INTEGER, author_name TEXT, content TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)"
        ];
        for (const s of schema) { await execute(s, [], true); }
        // Migration
        try { await execute("ALTER TABLE posts ADD COLUMN views INTEGER DEFAULT 0", [], true); } catch(e) {}
    }

    loadConfig();
    return { execute, saveConfig, isConfigured, hasWriteAccess, getConfig, loadConfig, initTables };
})();

// ==========================================
// MODULE 3: Auth — Web Crypto Authentication
// ==========================================
const Auth = (() => {
    const SESSION_KEY = 'inkwell_session';
    const DURATION = 24 * 60 * 60 * 1000;
    let currentUser = null;

    async function hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    async function login(username, password) {
        const hash = await hashPassword(password);
        const r = await DB.execute('SELECT id, username, role FROM admin WHERE username = ? AND password_hash = ?', [username, hash]);
        if (!r.rows.length) throw new Error('Invalid username or password');
        createSession(r.rows[0]);
        return r.rows[0];
    }

    function createSession(user) {
        const session = { user: { id: user.id, username: user.username, role: user.role }, expiresAt: Date.now() + DURATION };
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        currentUser = session.user;
    }

    function loadSession() {
        try {
            const s = JSON.parse(localStorage.getItem(SESSION_KEY));
            if (!s || Date.now() > s.expiresAt) { logout(); return null; }
            currentUser = s.user;
            return s.user;
        } catch { logout(); return null; }
    }

    function logout() { localStorage.removeItem(SESSION_KEY); currentUser = null; }
    function isAuthenticated() { loadSession(); return !!currentUser; }
    function getUser() { loadSession(); return currentUser; }
    function hasRole(roles) { return currentUser && roles.includes(currentUser.role); }

    async function adminExists() {
        const r = await DB.execute("SELECT id FROM admin LIMIT 1");
        return r.rows.length > 0;
    }

    async function createAdmin(username, password, role = 'Admin') {
        const hash = await hashPassword(password);
        return await DB.execute("INSERT INTO admin (username, password_hash, role) VALUES (?, ?, ?)", [username, hash, role], true);
    }

    async function getUsers() {
        return await DB.execute('SELECT id, username, role, created_at FROM admin ORDER BY created_at DESC');
    }

    async function updateRole(id, role) {
        return await DB.execute('UPDATE admin SET role = ? WHERE id = ?', [role, id], true);
    }

    async function deleteUser(id) {
        const r = await DB.execute("SELECT COUNT(*) as count FROM admin WHERE role = 'Admin'");
        const user = await DB.execute('SELECT role FROM admin WHERE id = ?', [id]);
        if (!user.rows.length) throw new Error('User not found');
        if (user.rows[0].role === 'Admin' && r.rows[0].count <= 1) {
            throw new Error('Cannot delete the last admin account');
        }
        return await DB.execute('DELETE FROM admin WHERE id = ?', [id], true);
    }

    async function changePassword(id, currentPass, newPass) {
        const currentHash = await hashPassword(currentPass);
        const user = await DB.execute('SELECT id FROM admin WHERE id = ? AND password_hash = ?', [id, currentHash]);
        if (!user.rows.length) throw new Error('Current password is incorrect');
        const newHash = await hashPassword(newPass);
        return await DB.execute('UPDATE admin SET password_hash = ? WHERE id = ?', [newHash, id], true);
    }

    async function generateResetToken(username) {
        const r = await DB.execute('SELECT id FROM admin WHERE username = ?', [username]);
        if (!r.rows.length) throw new Error('Username not found');
        const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const expiry = new Date(Date.now() + 3600000).toISOString(); // 1 hour
        await DB.execute('INSERT INTO admin_tokens (user_id, token, type, expires_at) VALUES (?, ?, "password_reset", ?)', [r.rows[0].id, token, expiry], true);
        return token;
    }

    async function resetPassword(token, newPassword) {
        const r = await DB.execute('SELECT user_id FROM admin_tokens WHERE token = ? AND type = "password_reset" AND expires_at > ?', [token, new Date().toISOString()]);
        if (!r.rows.length) throw new Error('Invalid or expired reset token');
        const userId = r.rows[0].user_id;
        const newHash = await hashPassword(newPassword);
        await DB.execute('UPDATE admin SET password_hash = ? WHERE id = ?', [newHash, userId], true);
        await DB.execute('DELETE FROM admin_tokens WHERE user_id = ?', [userId], true);
    }

    loadSession();
    return { 
        hashPassword, login, logout, isAuthenticated, getUser, hasRole, loadSession, 
        adminExists, createAdmin, getUsers, updateRole, deleteUser, changePassword,
        generateResetToken, resetPassword
    };
})();

// ==========================================
// MODULE 3.5: EmailService — Email Notifications
// ==========================================
const EmailService = (() => {
    const CONFIG = { publicKey: '__EMAILJS_PUBLIC_KEY__', serviceId: '__EMAILJS_SERVICE_ID__', templateId: '__EMAILJS_TEMPLATE_ID__' };
    const ADMIN_EMAILS = ['admin@sagarmalla.info.np', 'sagarmallaofficials@gmail.com'];
    let initialized = false;

    function init() {
        if (window.LOCAL_EMAIL_CONFIG) Object.assign(CONFIG, window.LOCAL_EMAIL_CONFIG);
        if (typeof emailjs !== 'undefined' && CONFIG.publicKey && !CONFIG.publicKey.startsWith('__')) {
            emailjs.init({ publicKey: CONFIG.publicKey });
            initialized = true;
        }
    }

    async function sendEmail(subject, htmlMessage, recipients = ADMIN_EMAILS) {
        if (!initialized) return false;
        try {
            for (const email of recipients) {
                await emailjs.send(CONFIG.serviceId, CONFIG.templateId, { to_email: email, subject, message: htmlMessage, from_name: "Sagar's Blogs" });
            }
            return true;
        } catch { return false; }
    }

    async function sendAdminCredentials(username, password) {
        const msg = `<h3>Auto-Setup Successful</h3><p>A new superadmin account has been created.</p><p><b>Username:</b> ${username}</p><p><b>Password:</b> ${password}</p><p>Please log in and change your password immediately.</p>`;
        return await sendEmail("New Superadmin Created", msg);
    }

    async function sendCommentNotification(postTitle, author, content, postUrl) {
        const msg = `<h3>New Comment on "${postTitle}"</h3><p><b>From:</b> ${author}</p><p><b>Comment:</b></p><blockquote>${content}</blockquote><p><a href="${postUrl}" style="background:#007bff;color:#fff;padding:8px 16px;text-decoration:none;border-radius:4px;display:inline-block;margin-top:12px;">View Comment on Post</a></p>`;
        return await sendEmail("New Comment: " + postTitle, msg, ['comments@sagarmalla.info.np', 'sagarmallaofficials@gmail.com']);
    }

    return { init, sendEmail, sendAdminCredentials, sendCommentNotification, getAdminEmails: () => [...ADMIN_EMAILS] };
})();

// ==========================================
// MODULE 4: Router — Hash-Based SPA Router
// ==========================================
const Router = (() => {
    const routes = [];
    let notFoundFn = null;

    function on(pattern, handler, opts = {}) { routes.push({ pattern, handler, opts }); }
    function notFound(fn) { notFoundFn = fn; }
    function navigate(path) { window.location.hash = '#' + path; }

    function matchRoute(pattern, hash) {
        const pp = pattern.split('/'), hp = hash.split('/');
        if (pp.length !== hp.length) return null;
        const params = {};
        for (let i = 0; i < pp.length; i++) {
            if (pp[i].startsWith(':')) params[pp[i].slice(1)] = hp[i];
            else if (pp[i] !== hp[i]) return null;
        }
        return params;
    }

    function resolve() {
        const hash = window.location.hash.slice(1) || 'home';
        // Check for specific redirects to separate pages
        if (hash === 'about') { window.location.href = 'about.html'; return; }
        if (hash === 'contact') { window.location.href = 'contact.html'; return; }
        if (hash === 'login') { window.location.href = 'login.html'; return; }

        const app = document.getElementById('app');
        if (app) app.innerHTML = '';
        window.scrollTo({ top: 0, behavior: 'instant' });
        for (const r of routes) {
            const params = matchRoute(r.pattern, hash);
            if (params !== null) {
                if (r.opts.auth && !Auth.isAuthenticated()) { navigate('login'); return; }
                if (r.opts.roles && !Auth.hasRole(r.opts.roles)) { navigate('admin/dashboard'); return; }
                r.handler(params);
                if (typeof UI !== 'undefined' && UI.updateNav) UI.updateNav();
                if (typeof AOS !== 'undefined') setTimeout(() => { AOS.refresh(); window.dispatchEvent(new Event('scroll')); }, 150);
                return;
            }
        }
        if (notFoundFn) notFoundFn();
    }

    window.addEventListener('hashchange', resolve);
    return { on, notFound, navigate, resolve };
})();

// ==========================================
// MODULE 5: UI Utilities
// ==========================================
const UI_UTILS = (() => {
    function escapeHtml(str) {
        if (!str) return '';
        const d = document.createElement('div');
        d.textContent = str;
        return d.innerHTML;
    }

    function showToast(msg, type = 'info', duration = 4000) {
        const container = document.getElementById('toast-container');
        if (!container) return;
        const iconMap = { success: Icons.check, error: Icons.alertCircle, warning: Icons.alertCircle, info: Icons.info };
        const el = document.createElement('div');
        el.className = `toast ${type}`;
        el.innerHTML = `${iconMap[type] || Icons.info}<span>${escapeHtml(msg)}</span>`;
        container.appendChild(el);
        setTimeout(() => { el.classList.add('removing'); setTimeout(() => el.remove(), 300); }, duration);
    }

    function setupTheme() {
        const theme = localStorage.getItem('inkwell_theme') || 'light';
        document.documentElement.setAttribute('data-theme', theme);
        return theme;
    }

    function toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('inkwell_theme', next);
        return next;
    }

    function updateNav() {
        const isAuth = Auth.isAuthenticated();
        const login = document.getElementById('nav-login');
        const admin = document.getElementById('nav-admin');
        const logout = document.getElementById('nav-logout');
        
        if (login) login.classList.toggle('hidden', isAuth);
        if (admin) admin.classList.toggle('hidden', !isAuth);
        if (logout) logout.classList.toggle('hidden', !isAuth);
    }

    function handleLogout() {
        Auth.logout();
        updateNav();
        showToast('Logged out successfully', 'info');
        window.location.href = 'index.html#home';
    }

    return { escapeHtml, showToast, setupTheme, toggleTheme, updateNav, handleLogout };
})();

UI_UTILS.setupTheme();
