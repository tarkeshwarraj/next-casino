// app/api/user/info/route.js

import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(req) {
    await connectDB;

    //NOTE: Get the user from cookies/session
    const token = req.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    //Token decode karka ID nikale
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
        return NextResponse.json({ error: 'Invalid token' }, {status: 401});
    }

    console.log(decoded.id);

    try {
        const user = await User.findById(decoded.id).select('-password'); //ya password remove karega

        if (!user) {
            return NextResponse.json({error: 'User not found'}, {status: 401});
        }   

        return NextResponse.json({user});

    }catch (err) {
        return NextResponse.json({ error: 'Error fetching user info' }, { status: 500 });
    }
}