import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: String,
  request_amount: Number,
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;