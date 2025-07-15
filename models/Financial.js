import mongoose from "mongoose";

const FinancialSummarySchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    totalDeposit: {type: Number, default: 0},
    totalWithdrawal: {type: Number, default: 0},
    currentBalance: {type: Number, default: 0}
});

const FinancialSummary = mongoose.model('FinancialSummary', FinancialSummarySchema);

export default FinancialSummary;