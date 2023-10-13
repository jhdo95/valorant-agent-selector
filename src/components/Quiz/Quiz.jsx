import axios from 'axios';
import { useState } from 'react';

export default function Quiz({ quizData, currentQuestion, onAnswer, onNext, onPrevious, answers }) {
    const [recommendedAgent, setRecommendedAgent] = useState(null);
    const question = quizData[currentQuestion];
    const selectedAnswer = answers[question] || null;

    const handleFinish = async () => {
    
        const rolePoints = {
            initiator: 0,
            controller: 0,
            sentinel: 0,
            duelist: 0,
        };
    
        Object.values(answers).forEach(answer => {
            if (answer.rolePoints) {
                Object.keys(answer.rolePoints).forEach(role => {
                    if (rolePoints[role] !== undefined) {
                        rolePoints[role] += answer.rolePoints[role];
                    }
                });
            }
        });

        console.log('Updated role points:', rolePoints);

    
        let maxRole = '';
        let maxPoints = 0;
    
        Object.keys(rolePoints).forEach(role => {
            if (rolePoints[role] > maxPoints) {
                maxPoints = rolePoints[role];
                maxRole = role;
            }
        });
    
        try {
            const response = await axios.post('/api/quizzes/calcRecommendations', {
                role: maxRole,
            });
    
            console.log('Recommended Agent:', response.data);
            setRecommendedAgent(response.data);
        } catch (error) {
            console.error('Error fetching recommended agent:', error);
        }
    };
    return (
        <div>
          <h2>{question.question}</h2>
          <div>
            {question.choices.map((choice, index) => (
              <div key={index}>
                <label>
                  <input
                    type="radio"
                    name="answer"
                    value={choice.text}
                    checked={selectedAnswer === choice}
                    onChange={() => onAnswer(question, choice)}
                  />
                  {choice.text}
                </label>
              </div>
            ))}
          </div>
          <button onClick={onPrevious} disabled={currentQuestion === 0}>
            Previous
          </button>
          <button onClick={currentQuestion === quizData.length - 1 ? handleFinish : onNext}>
            {currentQuestion === quizData.length - 1 ? 'Finish' : 'Next'}
          </button>
      
          {recommendedAgent && (
            <div>
              <h3>Recommended Agent</h3>
              <p>Name: {recommendedAgent.displayName}</p>
              <p>Description: {recommendedAgent.description}</p>
              <img src={recommendedAgent.displayIcon} alt={recommendedAgent.displayName} />
              <h4>Abilities:</h4>
              <ul>
                {recommendedAgent.abilities.map((ability, index) => (
                  <li key={index}>
                    <p>Ability {index + 1}:</p>
                    <p>{ability.displayName}</p>
                    <p>Description: {ability.description}</p>
                    {/* You can add the ability icon here if available */}
                    {ability.displayIcon && <img src={ability.displayIcon} alt={ability.displayName} />}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )};