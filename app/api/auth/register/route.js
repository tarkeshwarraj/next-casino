import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { hashPassword } from '@/utils/hashPassword';
import User from '@/models/User'; 
import jwt from 'jsonwebtoken';
import { generateToken } from '@/utils/generateToken';

export async function POST(req){
  try {

     // Debug log
     await connectDB();

     const body = await req.json();  //Parse once

     const {email, password} = body;

     if (!email || !password) {
      console.log('Missing email or password'); // Debug log
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log('User already exists'); // Debug log
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);
    console.log(hashedPassword);

    const newUser = await User.create({ email, password: hashedPassword });


    // Create JWT token here
    const token = generateToken(newUser);

    return NextResponse.json({ message: 'User registered successfully', userId: newUser._id, token });
 } catch (error) {
   console.error('Error during registration:', error); // Log error
   return NextResponse.json({ error: 'Server error' }, { status: 500 });
 }
}