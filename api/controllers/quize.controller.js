import Quiz from '../models/quize.model.js';
import User from '../models/user.model.js';

export const addQuiz = async (req, res) => {
  try {
    const { question, answers, correctAnswerIndex,category } = req.body;

    if (!question || !Array.isArray(answers) || answers.length !== 5 || correctAnswerIndex < 0 || correctAnswerIndex > 4) {
      return res.status(400).json({
        message: 'Invalid input data',
      });
    }

    const newQuiz = new Quiz({
      question,
      answers,
      correctAnswerIndex,
      category
    });

    await newQuiz.save();

    return res.status(201).json({
      message: 'Quiz added successfully!',
      quiz: newQuiz,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error adding quiz',
      error: error.message,
    });
  }
};

export const getAllQuizzes = async (req, res) => {
  const { searchTerm, category } = req.query; // Get both searchTerm and category from the query parameters

  try {
    // Create a regex for case-insensitive searching
    const query = {};
    
    // Add searchTerm filter
    if (searchTerm) {
      query.question = { $regex: searchTerm, $options: 'i' };
    }

    // Add category filter
    if (category) {
      query.category = category;
    }
    
    // Fetch quizzes from the database, filtering by the query if a search term or category is provided
    const quizzes = await Quiz.find(query); 

    return res.status(200).json({
      message: 'Quizzes retrieved successfully!',
      quizzes,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error retrieving quizzes',
      error: error.message,
    });
  }
};


export const getQuizById = async (req, res) => {
  const { id } = req.params; // Get the quiz ID from the route parameters
  try {
    const quiz = await Quiz.findById(id); // Find the quiz by ID
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    return res.status(200).json({
      message: 'Quiz retrieved successfully!',
      quiz,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error retrieving quiz',
      error: error.message,
    });
  }
};

// New updateQuiz function
export const updateQuiz = async (req, res) => {
  const { id } = req.params; // Get the quiz ID from the route parameters
  const { question, answers, correctAnswerIndex,category } = req.body; // Destructure the request body

  try {
    // Validate input data
    if (!question || !Array.isArray(answers) || answers.length !== 5 || correctAnswerIndex < 0 || correctAnswerIndex > 4) {
      return res.status(400).json({
        message: 'Invalid input data',
      });
    }

    const updatedQuiz = await Quiz.findByIdAndUpdate(
      id,
      { question, answers, correctAnswerIndex,category },
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    if (!updatedQuiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    return res.status(200).json({
      message: 'Quiz updated successfully!',
      quiz: updatedQuiz,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error updating quiz',
      error: error.message,
    });
  }
};

// New deleteQuiz function
export const deleteQuiz = async (req, res) => {
  const { id } = req.params; // Get the quiz ID from the route parameters
  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(id); // Find and delete the quiz by ID
    if (!deletedQuiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    return res.status(200).json({
      message: 'Quiz deleted successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error deleting quiz',
      error: error.message,
    });
  }
};

export const updateScore = async (req, res, next) => {
  const { userId, score } = req.body;

  console.log(userId)

  try {
    // Update user score in the database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { result: score },
      { new: true }
    );

    if (!updatedUser) {
      return next(errorHandler(404, 'User not found'));
    }

    res.status(200).json({ message: 'Score updated successfully' });
  } catch (error) {
    console.error('Error updating score:', error);
    next(error);
  }
};

