// src/app/api/movies/getAll/route.js
import { connectDB } from '@/db';
import { Movie } from '@/model/movie';
import { authorize } from '@/middleware/auth';

export async function GET(request) {
    await connectDB(); 
    
    try {
      
        authorize(request);

        const movies = await Movie.getAll();

        return new Response(JSON.stringify(movies), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Failed to retrieve movies:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 401, // Unauthorized
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
