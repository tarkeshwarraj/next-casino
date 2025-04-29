import connectDB from "@/lib/db";

export async function GET(){
    try{
        await connectDB(); //Try to connect DB

        return Response.json({message: '✅ MongoDB Connected Successfully'});
    }catch(error){
        console.error('❌ MongoDB Connection Failed:', error);
        return Response.json({ error: '❌ MongoDB Connection Failed' }, { status: 500 });
    }
}