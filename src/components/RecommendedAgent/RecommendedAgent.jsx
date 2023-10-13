import { useState, useEffect } from 'react';
import { fetchSelectedAgent } from '../../utilities/quizzes-api';

export default function RecommendedAgent({ role }) {
    const [recommendedAgent, setRecommendedAgent] = useState(null);

    useEffect(() => {
      const getRecommendedAgent = async () => {
        try {
          const agent = await fetchSelectedAgent(role);
          setRecommendedAgent(agent);
        } catch (error) {
          console.error('Error fetching recommended agent:', error);
        }
      };
      getRecommendedAgent();
    }, [role]);
  
    if (!recommendedAgent) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <h2>Recommended Agent: {recommendedAgent.name}</h2>
        <p>{recommendedAgent.description}</p>
        <h3>Abilities:</h3>
        <ul>
          {recommendedAgent.abilities.map((ability, index) => (
            <li key={index}>{ability}</li>
          ))}
        </ul>
      </div>
    );
  }
