// src/app/api/auth/register/route.js
import { connectDB } from '@/db';
import { User } from '@/model/user';

export async function POST(request) {
    await connectDB();
    const { email, password } = await request.json(); // Change username to email

    try {
        await User.create(email, password); // Use email instead of username
        return new Response(JSON.stringify({ message: 'User registered successfully' }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Registration failed:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
