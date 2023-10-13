import { useState } from 'react';
import Quiz from '../../components/Quiz/Quiz';
import quizData from '../../data/quizQuestions.json';
import RecommendedAgent from '../../components/RecommendedAgent/RecommendedAgent';

export default function QuizPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [rolePoints, setRolePoints] = useState({
        initiator: 0,
        controller: 0,
        sentinel: 0,
        duelist: 0,
    });
    const [answeredQuestions, setAnsweredQuestions] = useState([]); // New state to keep track of answered questions
    const [selectedRole, setSelectedRole] = useState(null);
    const [quizCompleted, setQuizCompleted] = useState(false); // New state to track quiz completion

    const handleAnswer = (question, answer) => {
        if (answeredQuestions.includes(question)) {
            console.log('Question already answered:', question);
            return;
        }


        if (!answer || !answer.rolePoints) {
            console.error('Answer object is invalid or does not contain rolePoints');
            console.log('Answer:', answer);
            return;
        }
    
        const updatedAnswers = { ...answers };
        updatedAnswers[question] = answer;
        setAnswers(updatedAnswers);
    
        const updatedRolePoints = { ...rolePoints };
        Object.keys(answer.rolePoints).forEach((role) => {
            if (updatedRolePoints[role] !== undefined) {
                updatedRolePoints[role] += answer.rolePoints[role];
            }
        });
    
        console.log('Updated role points:', updatedRolePoints);
    
        setRolePoints(updatedRolePoints);
        setAnsweredQuestions([...answeredQuestions, question]);
    };

    const handleNext = () => {
        if (currentQuestion < quizData.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          setQuizCompleted(true); 
          console.log('User Answers:', answers);
          console.log('Role Points:', rolePoints);
          const maxRole = Object.keys(rolePoints).reduce((a, b) =>
            rolePoints[a] > rolePoints[b] ? a : b
          );
          setSelectedRole(maxRole);
        }
      };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    return (
        <div>
          <div>
            {quizData.length > 0 ? (
              !quizCompleted ? ( 
                <Quiz
                  quizData={quizData}
                  currentQuestion={currentQuestion}
                  onAnswer={handleAnswer}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                  answers={answers}
                />
              ) : (
                selectedRole && <RecommendedAgent role={selectedRole} />
              )
            ) : (
              <p>No questions available.</p>
            )}
          </div>
        </div>
      );
    }