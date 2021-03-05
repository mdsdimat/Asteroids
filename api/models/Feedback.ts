import mongoose, { Schema } from 'mongoose';

const feedbackScheme = new Schema({
  user_id: Number,
  message: String,
});

const Feedback = mongoose.model('Feedback', feedbackScheme);

export default Feedback;
