import { loginToGameVault } from "@/utils/loadAutomation";

//New NextJS 15

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, gameId, amount } = body;

    if (!username || !gameId || !amount || isNaN(amount)) {
      return new Response(JSON.stringify({ message: "Invalid request data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    //Simulate a recharge process
    console.log({ username, gameId, amount });
    const payload = {
      amount,
      gameId,
      username,
    };

    // Trigger backend automation
    const result = await loginToGameVault(payload);
    return new Response(
      JSON.stringify({ message: "Coins loaded Successfully!" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.log(err);
    return new Response(
      JSON.stringify({ message: "Server error while loading coins." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// export default async function handler(req, res) {
//     if(req.method === 'POST'){
//         const {username, gameId, amount }  = req.body;

//         //Simple validation
//         if(!username || !gameId || !amount || isNaN(amount)){
//             return res.status(400).json({message: 'Invalid request data'});
//         }

//         try{
//             //Simulate a recharge process
//             console.log({username, gameId, amount});
//             // const payload = {
//             //     amount,
//             //     gameId,
//             //     username,
//             // }

//             // Trigger backend automation
//             // const result = await loginToGameVault(payload);

//             // if(result?.status === 200) {
//             //     return res.status(200).json({ message: 'Coin loaded Successfully!'});
//             // }else{
//             //     return res.status(500).json({message: 'Recharge failed', data: result?.data || null});
//             // }

//         }catch(err){
//             console.log(err);
//             return res.status(500).json({message: 'Server error while loading coins.'})
//         }
//     }else{
//         //Method not allowed
//         res.setHeader('Allow', ['POST']);
//         return res.status(405).json({message: `Method ${req.method} not allowed`});
//     }
//
