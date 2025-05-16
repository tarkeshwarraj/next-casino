import connectDB from './db';

export async function connectAndLog() {
  try {
    await connectDB();
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
  }
}
