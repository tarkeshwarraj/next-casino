import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if(!MONGODB_URI) {
    throw new Error('Please define MONGODB_URI in .env.local');
}

let cached = global.mongoose || { conn: null, promise: null };

async function connectDB() {
    if(cached.conn) return cached.conn;

    if(!cached.promise){
        cached.promise = mongoose.connect(MONGODB_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then((mongoose) =>mongoose);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectDB;



// import mongoose from 'mongoose';

// const connectDB = async () => {
//   try {
//     if (mongoose.connections[0].readyState) {
//       console.log('Already connected to DB');
//       return;
//     }
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log('Connected to DB');
//   } catch (error) {
//     console.error('Error connecting to DB:', error);
//     throw new Error('Database connection failed');
//   }
// };

// export default connectDB;

