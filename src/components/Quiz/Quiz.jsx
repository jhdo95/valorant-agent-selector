import { useState } from 'react';
import { fetchQuizQuestions } from '../../utilities/quizzes-api';

export default function Quiz({ quizData, onAnswer, onNext, currentQuestion }) {
    const handleAnswer = (question, answer) => {
      onAnswer(question, answer);
    };
  
    const renderQuestion = () => {
      const question = quizData[currentQuestion];
      return (
        <div>
          <h2>Question {currentQuestion + 1}: {question.question}</h2>
          <ul>
            {question.choices.map((choice, index) => (
              <li key={index}>
                <button
                  onClick={() => handleAnswer(question.question, choice)}
                >
                  {choice}
                </button>
              </li>
            ))}
          </ul>
        </div>
      );
    };
  
    return (
      <div>
        {renderQuestion()}
        <button onClick={onNext}>
          {currentQuestion < quizData.length - 1 ? 'Next' : 'Finish'}
        </button>
      </div>
    );
  }