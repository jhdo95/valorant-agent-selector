import { useState } from 'react';
import * as quizzesAPI from '../../utilities/quizzes-api';
import './Quiz.css';


export default function Quiz({ quizData, currentQuestion, onAnswer, onNext, onPrevious, answers, rolePoints }) {
    const [recommendedAgent, setRecommendedAgent] = useState(null);
    const question = quizData[currentQuestion];
    const selectedAnswer = answers[question] || null;

    const handleFinish = async () => {
        const calculatedRolePoints = { ...rolePoints }; 
        Object.values(answers).forEach(answer => {
            if (answer.rolePoints) {
                Object.keys(answer.rolePoints).forEach(role => {
                    if (calculatedRolePoints[role] !== undefined) {
                        calculatedRolePoints[role] += answer.rolePoints[role];
                    }
                });
            }
        });
        let maxRole = '';
        let maxPoints = 0;
        Object.keys(calculatedRolePoints).forEach(role => {
            if (calculatedRolePoints[role] > maxPoints) {
                maxPoints = calculatedRolePoints[role];
                maxRole = role;
            }
        });
        try {
            const recommendedAgentData = await quizzesAPI.calcRecommendations(maxRole, answers);
            setRecommendedAgent(recommendedAgentData);
            
        } catch (error) {
            console.error('Error fetching recommended agent:', error);
        }
    };
    return (
        <div className="quiz-container">
            {recommendedAgent ? (
                <div className="recommended-agent-container">
                    <h3>Recommended Agent</h3>
                    <p className="agent-name">Name: {recommendedAgent.displayName}</p>
                    <p className="agent-description">Description: {recommendedAgent.description}</p>
                    <img className="agent-image" src={recommendedAgent.displayIcon} alt={recommendedAgent.displayName} />
                    <h4>Abilities:</h4>
                    <ul className="abilities-list">
                        {recommendedAgent.abilities.map((ability, index) => (
                            <li key={index} className="ability-item">
                                <p className="ability-name">Ability {index + 1}:</p>
                                <p className="ability-displayName">{ability.displayName}</p>
                                <p className="ability-description">Description: {ability.description}</p>
                                {ability.displayIcon && <img className="ability-icon" src={ability.displayIcon} alt={ability.displayName} />}
                            </li>
                        ))}
                    </ul>
                    <button className="pick-another-button" onClick={() => setRecommendedAgent(null)}>Pick Another Agent</button>
                </div>
            ) : (
                <div className="question-container">
                    <h2 className="question-text">
                        Q{currentQuestion + 1}. {question.question}
                    </h2>
                    <div className="choices-container">
                        {question.choices.map((choice, index) => (
                            <div key={index} className="choice-item">
                                <label className="choice-label">
                                    <input
                                        type="radio"
                                        name="answer"
                                        value={choice.text}
                                        checked={selectedAnswer === choice}
                                        onChange={() => onAnswer(question, choice)}
                                        className="choice-input"
                                    />
                                    {choice.text}
                                </label>
                            </div>
                        ))}
                    </div>
                    <button className="previous-button" onClick={onPrevious} disabled={currentQuestion === 0}>
                        Previous
                    </button>
                    <button className="next-button" onClick={currentQuestion === quizData.length - 1 ? handleFinish : onNext}>
                        {currentQuestion === quizData.length - 1 ? 'Finish' : 'Next'}
                    </button>
                </div>
            )}
        </div>
    )};