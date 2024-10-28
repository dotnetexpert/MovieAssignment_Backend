// src/db.js
import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};

export async function connectDB() {
    try {
        await sql.connect(config);
        console.log('Connected to database:', process.env.DB_DATABASE);
        await createUsersTable();
       await createMoviesTable();
       
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
}

async function createUsersTable() {
    const query = `
        IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Users')
        BEGIN
            CREATE TABLE Users (
                id INT PRIMARY KEY IDENTITY(1,1),
                email NVARCHAR(255) UNIQUE NOT NULL, -- Changed to email
                password NVARCHAR(255) NOT NULL
            );
        END
    `;
    await sql.query(query);
}


async function createMoviesTable() {
    const query = `
        IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Movies')
        BEGIN
            CREATE TABLE Movies (
                id INT PRIMARY KEY IDENTITY(1,1),
                title NVARCHAR(255) NOT NULL,
                publishingyear INT NOT NULL,
                poster NVARCHAR(MAX) -- Storing Base64 string as NVARCHAR(MAX)
            );
        END
    `;
    await sql.query(query);
}


export { sql };
