const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './')));

// Email (SMTP) Transporter
const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT || 587);
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const mailFrom = process.env.MAIL_FROM || 'no-reply@example.com';
const mailTo = process.env.MAIL_TO || process.env.CONTACT_RECIPIENT || 'owner@example.com';

let mailTransporter = null;
if (smtpHost && smtpUser && smtpPass) {
    mailTransporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465, // true for 465, false for other ports
        auth: {
            user: smtpUser,
            pass: smtpPass
        }
    });
}

function sendContactEmail({ name, email, subject, message, dbId }) {
    if (!mailTransporter) {
        console.warn('Email not sent: SMTP not configured. Set SMTP_* env vars.');
        return Promise.resolve({ skipped: true });
    }

    const composedSubject = subject ? `[Portfolio] ${subject}` : '[Portfolio] New Contact Message';
    const html = `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || '(none)'} </p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
        <hr/>
        <p>Saved in DB with id: ${dbId}</p>
    `;

    const text = `New contact form submission\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject || '(none)'}\n\nMessage:\n${message}\n\nSaved in DB with id: ${dbId}`;

    const mailOptions = {
        from: mailFrom,
        to: mailTo,
        replyTo: email,
        subject: composedSubject,
        text,
        html
    };

    return mailTransporter.sendMail(mailOptions);
}

// Database setup
const db = new sqlite3.Database('./portfolio.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// Initialize database tables
const initDatabase = () => {
    // Certifications table
    db.run(`CREATE TABLE IF NOT EXISTS certifications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        issuer TEXT NOT NULL,
        description TEXT,
        issue_date TEXT,
        expiry_date TEXT,
        certificate_url TEXT,
        icon_class TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Skills table
    db.run(`CREATE TABLE IF NOT EXISTS skills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        proficiency INTEGER CHECK(proficiency >= 0 AND proficiency <= 100),
        icon_class TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Projects table
    db.run(`CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        technologies TEXT,
        live_url TEXT,
        github_url TEXT,
        image_url TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Contact messages table
    db.run(`CREATE TABLE IF NOT EXISTS contact_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT,
        message TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Goals table
    db.run(`CREATE TABLE IF NOT EXISTS goals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        progress INTEGER DEFAULT 0 CHECK(progress >= 0 AND progress <= 100),
        target_date TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    console.log('Database tables initialized successfully.');
};

// Initialize database
initDatabase();

// API Routes

// Get all certifications
app.get('/api/certifications', (req, res) => {
    db.all('SELECT * FROM certifications ORDER BY issue_date DESC', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Add new certification
app.post('/api/certifications', (req, res) => {
    const { title, issuer, description, issue_date, expiry_date, certificate_url, icon_class } = req.body;
    
    db.run(
        'INSERT INTO certifications (title, issuer, description, issue_date, expiry_date, certificate_url, icon_class) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [title, issuer, description, issue_date, expiry_date, certificate_url, icon_class],
        function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ id: this.lastID, message: 'Certification added successfully' });
        }
    );
});

// Get all skills
app.get('/api/skills', (req, res) => {
    db.all('SELECT * FROM skills ORDER BY category, proficiency DESC', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Add new skill
app.post('/api/skills', (req, res) => {
    const { name, category, proficiency, icon_class } = req.body;
    
    db.run(
        'INSERT INTO skills (name, category, proficiency, icon_class) VALUES (?, ?, ?, ?)',
        [name, category, proficiency, icon_class],
        function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ id: this.lastID, message: 'Skill added successfully' });
        }
    );
});

// Get all projects
app.get('/api/projects', (req, res) => {
    db.all('SELECT * FROM projects ORDER BY created_at DESC', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Add new project
app.post('/api/projects', (req, res) => {
    const { title, description, technologies, live_url, github_url, image_url } = req.body;
    
    db.run(
        'INSERT INTO projects (title, description, technologies, live_url, github_url, image_url) VALUES (?, ?, ?, ?, ?, ?)',
        [title, description, technologies, live_url, github_url, image_url],
        function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ id: this.lastID, message: 'Project added successfully' });
        }
    );
});

// Get all goals
app.get('/api/goals', (req, res) => {
    db.all('SELECT * FROM goals ORDER BY created_at DESC', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Add new goal
app.post('/api/goals', (req, res) => {
    const { title, description, progress, target_date } = req.body;
    
    db.run(
        'INSERT INTO goals (title, description, progress, target_date) VALUES (?, ?, ?, ?)',
        [title, description, progress, target_date],
        function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ id: this.lastID, message: 'Goal added successfully' });
        }
    );
});

// Submit contact form
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body || {};

    // Basic validation
    if (!name || !email || !message) {
        res.status(400).json({ error: 'Missing required fields: name, email, message' });
        return;
    }

    db.run(
        'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
        [name, email, subject || '', message],
        function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }

            // Try to send email (non-blocking for the client)
            sendContactEmail({ name, email, subject, message, dbId: this.lastID })
                .then(() => {
                    res.json({ id: this.lastID, message: 'Message sent successfully' });
                })
                .catch((mailErr) => {
                    console.error('Error sending contact email:', mailErr);
                    // Still return success for the form, but include a note
                    res.json({ id: this.lastID, message: 'Message saved. Email notification failed.' });
                });
        }
    );
});

// Get contact messages (admin only)
app.get('/api/contact', (req, res) => {
    db.all('SELECT * FROM contact_messages ORDER BY created_at DESC', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to view the portfolio`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        } else {
            console.log('Database connection closed.');
        }
        process.exit(0);
    });
});
