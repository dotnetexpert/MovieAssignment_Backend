// src/models/User.js
import { sql } from '@/db';
import bcrypt from 'bcrypt';

export const User = {
    create: async (email, password) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        await sql.query`INSERT INTO Users (email, password) VALUES (${email}, ${hashedPassword})`;
    },

    findByEmail: async (email) => {
        const result = await sql.query`SELECT * FROM Users WHERE email = ${email}`;
        return result.recordset[0]; // Return the first user found
    },
};
