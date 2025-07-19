import { connectDB } from '@/lib/dbConnect';
import GamingAccount from '@/models/GamingAccount';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';


export async function GET(req) {
    await connectDB;

    const token = req.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const accounts = await GamingAccount.find({ user: decoded.id });

        return NextResponse.json(accounts);

    }catch(err){
        console.log(err);
        return NextResponse.json({ error: 'Error fetching gaming accounts' }, { status: 500 });
    }
}