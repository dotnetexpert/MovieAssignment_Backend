// src/app/api/movies/update/route.js
import { connectDB } from '@/db';
import { Movie } from '@/model/movie';
import { authorize } from '@/middleware/auth';

export async function PUT(request) {
    await connectDB(); 

    try {
        // Authorize the request by passing the request object
        authorize(request);

        const { id, title, publishingyear, poster } = await request.json();

        if (!id) {
            return new Response(JSON.stringify({ error: 'Movie ID is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Validate Base64 format for the poster image if it's being updated
        if (poster && !/^data:image\/(png|jpeg|jpg);base64,/.test(poster)) {
            return new Response(JSON.stringify({ error: 'Invalid image format' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Update the movie in the database
        await Movie.update(id, title, publishingyear, poster);

        return new Response(JSON.stringify({ message: 'Movie updated successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Movie update failed:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 401, // Unauthorized
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
