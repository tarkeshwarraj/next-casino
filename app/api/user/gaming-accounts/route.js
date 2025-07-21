import connectDB  from '@/lib/db';
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

export async function PATCH(req) {
    await connectDB;

    const token = req.cookies.get('token')?.value;

    if (!token){
        return NextResponse.json({ error: 'Unauthorized' }, {status: 401 });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const body = await req.json(); //e.g. {firekirin: "NewName123"}

        const updateKey = Object.keys(body)[0];
        const updateValue = body[updateKey];

        const updated = await GamingAccount.findOneAndUpdate(
            { user: decoded.id },
            { $set: {[`accounts.0.${updateKey}`]: updateValue }},  //Key point
            { new: true }
        );

        if(!updated){
            return NextResponse.json({error: 'Account not found' }, {status: 404});
        }

        return NextResponse.json({success: true, updated: updated.accounts });

    }catch(err){
        console.log('PATCH error:', err);
        return NextResponse.json({ error: 'Error updating gaming accounts' }, { status: 500 });
    }

}