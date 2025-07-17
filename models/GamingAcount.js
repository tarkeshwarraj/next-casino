import mongoose from "mongoose";

const GamingAccountSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  accounts: [
    {
      gameVault: { type: String, default: "N/A" },
      juwa: { type: String, default: "N/A" },
      firekirin: { type: String, default: "N/A" },
      milkyway: { type: String, default: "N/A" },
      pandaMaster: { type: String, default: "N/A" },
      orionStar: { type: String, default: "N/A" },
      vegasSweep: { type: String, default: "N/A" },
    },
  ],
});

const GamingAccount = mongoose.model('GamingAccount', GamingAccountSchema);

export default GamingAccount;
