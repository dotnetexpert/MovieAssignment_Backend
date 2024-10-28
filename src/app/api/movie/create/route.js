// src/app/api/movies/create/route.js
import { connectDB } from '@/db';
import { Movie } from '@/model/movie';
import { authorize } from '@/middleware/auth';

export async function POST(request) {
    await connectDB(); // Ensure the database connection is established
    
    try {
     
        authorize(request);

        const { title, publishingyear, poster } = await request.json();

        // Validate Base64 format for the poster image if needed
        if (!/^data:image\/(png|jpeg|jpg);base64,/.test(poster)) {
            return new Response(JSON.stringify({ error: 'Invalid image format' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        await Movie.create(title, publishingyear, poster);

        return new Response(JSON.stringify({ message: 'Movie created successfully' }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Movie creation failed:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 401, // Unauthorized
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
