// src/models/User.js
import { sql } from '@/db';
import bcrypt from 'bcrypt';

export const User = {
    create: async (userRegister) => {
       const hashedPassword = await bcrypt.hash(userRegister.password, 10);
        await sql.query`INSERT INTO Users (email, password) VALUES (${userRegister.email}, ${hashedPassword})`;
    },

    findByEmail: async (userRegister) => {
        const result = await sql.query`SELECT * FROM Users WHERE email = ${userRegister.email}`;
        return result.recordset[0]; // Return the first user found
    },
};
