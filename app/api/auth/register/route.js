import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { hashPassword } from '@/utils/hashPassword';
import User from '@/models/User'; 

export async function POST(req){
  try {

     // Debug log
     await connectDB();

     const body = await req.json();  //Parse once

     const {email, password} = body;
     
     console.log(body);  //Debug log


    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log('User already exists'); // Debug log
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({ email, password: hashedPassword });

    return NextResponse.json({ message: 'User registered successfully', userId: newUser._id });
 } catch (error) {
   console.error('Error during registration:', error); // Log error
   return NextResponse.json({ error: 'Server error' }, { status: 500 });
 }
}