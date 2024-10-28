// src/models/Movies.js
import { sql } from '@/db';

export const Movie = {
    create: async (title, publishingyear, poster) => {
        await sql.query`INSERT INTO Movies (title, publishingyear, poster) VALUES (${title}, ${publishingyear}, ${poster})`;
    },

    update: async (id, title, publishingyear, poster) => {
        await sql.query`
            UPDATE Movies
            SET title = ${title}, publishingyear = ${publishingyear}, poster = ${poster}
            WHERE id = ${id}
        `;
    },

    getAll: async () => {
        const result = await sql.query`SELECT * FROM Movies`;
        return result.recordset; 
    },

    getById: async (id) => {
        const result = await sql.query`SELECT * FROM Movies WHERE id = ${id}`;
        return result.recordset[0]; // Return the first (and expected only) result
    },
};
