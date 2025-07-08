import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name:{
    type: String,
    required: true,
  },
  gameUsernames:{
    gameVault: { type: String, default: "" },
    juwa: { type: String, default: "" },
    firekirin: { type: String, default: "" },
    milkyway: { type: String, default: "" },
    pandaMaster: {type: String, default: ''},
    orionStar: { type: String, default: ""},
    vegasSweep: {type: String, default: ""},
  },
  balance: {
    type: Number,
    default: 0,
  },
  loyaltyPoints: {
    type: Number,
    default: 0,
  },
  achievements: {
    type: Number,
    default: 0,
  },
  gamesPlayed:{
    type: Number,
    default: 0,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  vipTier: {
    type: String,
    default: "None", //Can be 'None', 'VIP Gold', etc.
  }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;