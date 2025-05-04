// /app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User'; 
import { comparePassword } from '@/utils/hashPassword';
import { generateToken } from '@/utils/generateToken';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    await connectDB();

    const user = await User.findOne({ email });
    console.log(user);
    
    if (!user) {
      return NextResponse.json({ error: 'Invalid Email or Password' }, { status: 400 });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid Email or Password' }, { status: 400 });
    }

    const token = generateToken(user);

    return NextResponse.json({ message: 'Login successful', token });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
