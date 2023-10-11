import { useState, useEffect } from 'react';
import { fetchQuizQuestions } from '../../utilities/quizzes-api';
import Quiz from '../../components/Quiz/Quiz';

export default function QuizPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [quizData, setQuizData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Add state for new question and choices
  const [newQuestion, setNewQuestion] = useState('');
  const [newChoices, setNewChoices] = useState('');
  
    useEffect(() => {
      const fetchQuestions = async () => {
        try {
          const data = await fetchQuizQuestions();
          setQuizData(data);
          setLoading(false);
        } catch (error) {
          // Handle errors as needed
        }
      };
  
      fetchQuestions();
    }, []);
  
    const handleAnswer = (question, answer) => {
      setAnswers({ ...answers, [question]: answer });
    };
  
    const handleNext = () => {
      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        console.log('User Answers:', answers);
      }
    };
// Handle form submission to add a new question
const handleAddQuestion = async () => {
    // Create an object for the new question
    const newQuestionData = {
      question: newQuestion,
      choices: newChoices,
    };

    // Send a POST request to add the new question
    try {
      const response = await fetch('/api/quizzes/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuestionData),
      });

      if (response.ok) {
        // Question added successfully, you can handle this as needed
        // Clear the form inputs
        setNewQuestion('');
        setNewChoices([]);
      } else {
        console.error('Failed to add question');
      }
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading quiz questions...</p>
      ) : (
        <div>
          {quizData.length > 0 ? (
            <Quiz
              quizData={quizData}
              currentQuestion={currentQuestion}
              onAnswer={handleAnswer}
              onNext={handleNext}
            />
          ) : (
            <p>No questions available.</p>
          )}
          <form>
            <label>
              New Question:
              <input
                type="text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
              />
            </label>
            <label>
            New Choices (comma-separated):
            <input
                type="text"
                value={newChoices}
                onChange={(e) => setNewChoices(e.target.value)}
            />
            </label>
            <button type="submit" onClick={handleAddQuestion}>
              Add Question
            </button>
          </form>
        </div>
      )}
    </div>
  );
}