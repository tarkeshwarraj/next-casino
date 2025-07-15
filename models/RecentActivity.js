import mongoose from "mongoose";

const RecentActivitySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    type: { type: String, enum: ['Deposit', 'Withdraw', 'GamePlay'], required: true },
    amount: { type: Number, required: true },
    gameName: { type: String, required: true },
    timeStamp: {type: Date, default: Date.now()}
})

const RecentActivity = mongoose.model('RecentActivity', RecentActivitySchema);

export default RecentActivity;