import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ['Deposit', 'Withdraw'], required: true },
    amount: { type: Number, required: true },
    timeStamp: {type: Date, default: Date.now()}
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;