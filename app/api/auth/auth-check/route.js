// app/api/auth/me/route.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(req){
    const token = req.cookies.get('token')?.value;

    if(!token){
        return NextResponse.json({isLoggedIn: false}, {status: 200});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return NextResponse.json({isLoggedIn: true, user: decoded}, { status: 200});
    }catch(err){
        return NextResponse.json({isLoggedIn: false}, {status: 200});
    }
}