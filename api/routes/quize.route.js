import express from 'express';
import { addQuiz, deleteQuiz, getAllQuizzes, getQuizById, updateQuiz } from '../controllers/quize.controller.js'; 

const router = express.Router();

router.post('/quizzes', addQuiz);
router.get('/get-quizzes', getAllQuizzes);
router.get('/quizzes/:id', getQuizById); 
router.put('/update/:id', updateQuiz);
router.delete('/delete/:id', deleteQuiz); 

export default router;
