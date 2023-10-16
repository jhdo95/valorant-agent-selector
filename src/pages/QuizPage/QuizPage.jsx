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
    const [answeredQuestions, setAnsweredQuestions] = useState([]); 
    const [selectedRole, setSelectedRole] = useState(null);
    const [quizCompleted, setQuizCompleted] = useState(false); 

    const handleAnswer = (question, answer) => {
        const updatedAnswers = { ...answers };
        updatedAnswers[question] = answer;
        setAnswers(updatedAnswers);
        const updatedRolePoints = { ...rolePoints };

        Object.keys(answer.rolePoints).forEach((role) => {
            if (updatedRolePoints[role] !== undefined) {
                updatedRolePoints[role] -= answers[question]?.rolePoints[role] || 0;
                updatedRolePoints[role] += answer.rolePoints[role];
            }
        });
        setRolePoints(updatedRolePoints);
        const updatedAnsweredQuestions = answeredQuestions.filter((answeredQuestion) => answeredQuestion !== question);
        setAnsweredQuestions(updatedAnsweredQuestions);
    };

    const handleNext = () => {
        if (currentQuestion < quizData.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          setQuizCompleted(true); 
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
                            rolePoints={rolePoints}
                        />
                    ) : (
                        selectedRole && <RecommendedAgent role={selectedRole} />
                    )
                ) : null}
            </div>
        </div>
    )};