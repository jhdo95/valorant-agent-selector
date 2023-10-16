import { useState, useEffect } from 'react';
import { fetchSelectedAgent } from '../../utilities/quizzes-api';

export default function RecommendedAgent({ role }) {
    const [recommendedAgent, setRecommendedAgent] = useState(null);

    useEffect(() => {
        const getSelectedAgent = async () => {
            try {
                const response = await fetchSelectedAgent(role);
                console.log('Recommended Agent:', response.data);
                setRecommendedAgent(response.data);
            } catch (error) {
                console.error('Error fetching recommended agent:', error);
            }
        };
        getSelectedAgent();
    }, [role]);

    if (!recommendedAgent) {
        return <div>Loading...</div>;
    }

    return (
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
    );
};