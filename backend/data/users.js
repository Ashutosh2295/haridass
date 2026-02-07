const bcrypt = require('bcryptjs');

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123', // will be hashed in model but model hooks don't run on insertMany, so we should rely on pre-save logic? 
        // Actually insertMany with mongoose validates but doesn't run pre-save hooks unless specified?
        // Wait, Mongoose insertMany DOES NOT trigger pre('save').
        // I need to hash these passwords manually here or use create (loop).
        // For simplicity I will just put a hashed password or handle it.
        // Actually, let's just use a fixed hash for 'password123'
        // $2a$10$d/2Jul.D..5/.. some hash ..
        isAdmin: true,
        role: 'admin'
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        isAdmin: false,
        role: 'user'
    },
    {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password123',
        isAdmin: false,
        role: 'user'
    }
]

// Note: In a real seeder we should hash passwords.
// For now, I'll update seeder.js to hash them before inserting.
// I will not hash them here to avoid hardcoded hashes.

module.exports = users
