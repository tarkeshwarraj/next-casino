import mongoose from "mongoose";

const GamingAccountSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  accounts: [
    {
      gameVault: { type: String, default: "" },
      juwa: { type: String, default: "" },
      firekirin: { type: String, default: "" },
      milkyway: { type: String, default: "" },
      pandaMaster: { type: String, default: "" },
      orionStar: { type: String, default: "" },
      vegasSweep: { type: String, default: "" },
    },
  ]
});

const GamingAccount = mongoose.model('GamingAccount', GamingAccountSchema);

export default GamingAccount;
