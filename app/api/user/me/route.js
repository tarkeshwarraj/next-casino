import {NextResponse} from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function GET(req) {
    try{
        await connectDB();

        const token = req.headers.get('authorization')?.split(' ')[1];
        if(!token) return NextResponse.json({error: 'Unauthorized'}, {status: 401});

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token: ", decoded);

        const user = await User.findById(decoded.id).select('-password');
    
    
        if(!user) return NextResponse.json({error: 'User not found'}, {status: 401});

        return NextResponse.json({user});

    }catch(err) {
        return NextResponse.json({error: 'Invalid token'}, {status: 401});
    }
}
