import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    financialSummary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FinancialSummary",
    },
    gamingAccounts: 
      { type: mongoose.Schema.Types.ObjectId, ref: "GamingAccount" },
    
    recentActivities: [
      { type: mongoose.Schema.Types.ObjectId, ref: "RecentActivity" },
    ],
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
