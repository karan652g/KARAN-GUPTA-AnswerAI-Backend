// src/models/Question.js
import { Schema, model } from 'mongoose';

const questionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  questionText: { type: String, required: true },
  answerText: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default model('Question', questionSchema);
