import { useState, useEffect } from 'react';
import { fetchQuizQuestions } from '../../utilities/quizzes-api';
import Quiz from '../../components/Quiz/Quiz';

export default function QuizPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [quizData, setQuizData] = useState([]);
    const [loading, setLoading] = useState(true);
  
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
  
    return (
      <div>
        {loading ? (
          <p>Loading quiz questions...</p>
        ) : (
          <Quiz
            quizData={quizData}
            currentQuestion={currentQuestion}
            onAnswer={handleAnswer}
            onNext={handleNext}
          />
        )}
      </div>
    );
  }