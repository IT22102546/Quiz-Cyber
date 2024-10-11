// models/quizModel.js
import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answers: {
    type: [String],
    validate: {
      validator: (answers) => answers.length === 5,
      message: "Must have exactly 5 answers",
    },
    required: true,
  },
  correctAnswerIndex: {
    type: Number,
    required: true,
    min: 0,
    max: 4, 
  },
  category:{
    type:String,
    required:true
  }
}, { timestamps: true });

const Quiz = mongoose.model('Quiz', quizSchema);
export default Quiz;
