const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = 'aaffeef-admin-super-secret-key-2026';

// Global error handlers to prevent Node.js from exiting perfectly on C++ TLS Binding errors during MongoDB Atlas WiFi blocks
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception captured globally:', err.message);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection captured globally:', reason);
});

// ==========================================
// 1. SECURITY MIDDLEWARES
// ==========================================

// Set security HTTP headers (SSL/TLS enforced via headers implicitly for browsers)
app.use(helmet());

// Cross-Origin Resource Sharing
app.use(cors());

// Body parser, reading data from body into req.body, with size limits to prevent payload attacks
app.use(express.json({ limit: '10kb' }));

// Rate Limiting (Acts as a basic WAF against brute-force / DDoS attacks)
const limiter = rateLimit({
    max: 100, // Adjusted to 100 to avoid locking out the admin page on reloads
    windowMs: 60 * 60 * 1000, // 1 Hour
    message: { error: 'Too many requests from this IP, please try again in an hour!' }
});
// Apply the rate limiter to our API endpoints
app.use('/api/contact', limiter); // Only apply to contact to avoid admin lockouts

// ==========================================
// 2. DATABASE CONFIGURATION
// ==========================================
const MONGODB_URI = 'mongodb+srv://naaffeefahmed_db_user:aaffeefahmed04@aaffeef.kkpsy0h.mongodb.net/?appName=aaffeef';

mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 5000,
    connectTimeoutMS: 5000
}).then(() => {
    console.log('✅ Connected securely to MongoDB database');
}).catch((err) => {
    console.warn('⚠️ MongoDB connection restricted (Likely IP not whitelisted in Atlas). Falling back to JSON database.');
});

// To completely prevent MongoDB SSL from forcing Node 20 ungraceful exit (which halts the EmailJS step on frontend):
mongoose.connection.on('error', err => {
    console.error('MongoDB Runtime Error (Database Offline):', err.message);
});

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    message: { type: String, required: true, trim: true },
    date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// ==========================================
// 3. SECURE ENDPOINTS & DATA VALIDATION
// ==========================================
app.post(
    '/api/contact',
    [
        // Data Validation middlewares (checking payload integrity)
        body('name')
            .notEmpty().withMessage('Name is required.')
            .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters.')
            .matches(/^[A-Za-z0-9\s.,'-]+$/).withMessage('Name contains invalid characters.'),

        body('email')
            .notEmpty().withMessage('Email is required.')
            .isEmail().withMessage('Please provide a valid email address.')
            .normalizeEmail(),

        body('message')
            .notEmpty().withMessage('Message cannot be empty.')
            .isLength({ min: 5, max: 2000 }).withMessage('Message must be between 5 and 2000 characters.')
            .escape() // Escapes HTML entities
    ],
    async (req, res) => {
        // Enforce validation checks
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: 'Validation Failed',
                details: errors.array().map(err => err.msg)
            });
        }

        const { name, email, message } = req.body;

        try {
            if (mongoose.connection.readyState === 1) {
                // Connection is established - save to cloud Mongo DB
                const newContact = new Contact({ name, email, message });
                await newContact.save();
                console.log(`🛡️ Secure contact message received from: ${name} (Saved to MongoDB)`);
            } else {
                // Fallback to local array file if MongoDB is blocked by dynamic IP / WiFi network
                const fs = require('fs');
                const path = require('path');
                const backupPath = path.join(__dirname, 'messages.json');

                let localMessages = [];
                if (fs.existsSync(backupPath)) {
                    const data = fs.readFileSync(backupPath, 'utf8');
                    localMessages = JSON.parse(data || '[]');
                }
                localMessages.push({ id: Date.now().toString(), name, email, message, date: new Date().toISOString() });
                fs.writeFileSync(backupPath, JSON.stringify(localMessages, null, 2));

                console.warn(`⚠️ MongoDB connection unavailable. Message from ${name} safely backed up to local messages.json.`);
            }

            res.status(200).json({ success: true, message: 'Message sent securely!' });
        } catch (error) {
            console.error('Error saving message:', error);
            res.status(500).json({ error: 'Server error: Failed to save message safely.' });
        }
    }
);

// ==========================================
// 4. ADMIN ENDPOINTS
// ==========================================

// Login endpoint
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;

    // Check credentials against environment or hardcoded user requirements
    if (username === 'aaffeefnaruto' && password === 'aaffeef04') {
        const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ success: true, token });
    }

    return res.status(401).json({ error: 'Invalid credentials' });
});

// Middleware to protect routes
const verifyAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(403).json({ error: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(401).json({ error: 'Invalid or expired token.' });
    }
};

// Get all messages
app.get('/api/admin/messages', verifyAdmin, async (req, res) => {
    try {
        let messages = [];
        if (mongoose.connection.readyState === 1) {
            messages = await Contact.find().sort({ date: -1 }); // Latest first
        }

        // Grab local fallbacks if they exist
        const fs = require('fs');
        const path = require('path');
        const backupPath = path.join(__dirname, 'messages.json');
        if (fs.existsSync(backupPath)) {
            const data = fs.readFileSync(backupPath, 'utf8');
            const localMessages = JSON.parse(data || '[]');
            localMessages.forEach(msg => messages.push({
                _id: msg.id, // map for frontend
                name: msg.name,
                email: msg.email,
                message: msg.message,
                date: msg.date,
                isFallback: true
            }));
        }

        // Sort globally by date descending
        messages.sort((a, b) => new Date(b.date) - new Date(a.date));

        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Failed to fetch messages.' });
    }
});

// Delete a message by ID
app.delete('/api/admin/messages/:id', verifyAdmin, async (req, res) => {
    try {
        const id = req.params.id;

        // Check if ID is likely a MongoDB ObjectId (24 hex characters)
        const isMongoId = /^[0-9a-fA-F]{24}$/.test(id);

        if (isMongoId) {
            // Delete from Cloud MongoDB
            if (mongoose.connection.readyState !== 1) {
                return res.status(503).json({ error: 'Database offline. Cannot delete cloud messages.' });
            }
            const message = await Contact.findByIdAndDelete(id).maxTimeMS(5000);
            if (!message) return res.status(404).json({ error: 'Cloud message not found.' });
            return res.status(200).json({ success: true, message: 'Deleted from MongoDB cloud.' });
        } else {
            // Delete from fallback messages.json database
            const fs = require('fs');
            const path = require('path');
            const backupPath = path.join(__dirname, 'messages.json');

            if (fs.existsSync(backupPath)) {
                const data = fs.readFileSync(backupPath, 'utf8');
                let localMessages = JSON.parse(data || '[]');

                const originalLength = localMessages.length;
                localMessages = localMessages.filter(msg => msg.id !== id);

                if (localMessages.length === originalLength) {
                    return res.status(404).json({ error: 'Local message not found.' });
                }

                fs.writeFileSync(backupPath, JSON.stringify(localMessages, null, 2));
                return res.status(200).json({ success: true, message: 'Deleted from local backup file.' });
            } else {
                return res.status(404).json({ error: 'Message file missing.' });
            }
        }
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({ error: 'Failed to delete message. Server error.' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Secure Server running on http://localhost:${PORT}`);
});
