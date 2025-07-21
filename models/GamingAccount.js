import mongoose from "mongoose";

const GameAccountDetailsSchema = new mongoose.Schema({
  username: { type: String, default: "N/A"},
  gameId: {type: String, default: "N/A"},
  title: {type: String, default: "N/A"},
}, {_id: false}); //Prevents subdocument _id creation

const GamingAccountSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    accounts: [
      {
        firekirin: {type: GameAccountDetailsSchema, default: ()=>({})},
        orionStar: {type: GameAccountDetailsSchema, default: ()=>({})},
        vegasSweep: {type: GameAccountDetailsSchema, default: ()=>({})},
        gameVault: {type: GameAccountDetailsSchema, default: ()=>({})},
        pandaMaster: {type: GameAccountDetailsSchema, default: ()=>({})},
        milkyway: {type: GameAccountDetailsSchema, default: ()=>({})},
        juwa: {type: GameAccountDetailsSchema, default: ()=>({})},
      },
    ],
});

export default mongoose.models.GamingAccount || mongoose.model("GamingAccount", GamingAccountSchema);