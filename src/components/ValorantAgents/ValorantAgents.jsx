import { useState, useEffect } from 'react';
import axios from 'axios';
import './ValorantAgents.css';

export default function ValorantAgents() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://valorant-api.com/v1/agents')
      .then((response) => {
        console.log('API Response:', response);
        const agentData = response.data.data;
        setAgents(agentData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching agent data:', error);
      });
  }, []);

  if (loading) {
    return <div>Loading agent data...</div>;
  }

  return (
    <div className="agents-container">
      {agents.map((agent) => (
        <div key={agent.uuid} className="agent-container">
          <h3>{agent.displayName}</h3>
          <p>{agent.description}</p>
          <img src={agent.displayIcon} alt={agent.displayName} className="agent-image" />
          <h4>Abilities:</h4>
          <ul>
            {agent.abilities.map((ability, index) => (
              <li key={index}>
                <div className="ability-description">
                  <strong>{ability.displayName}:</strong> {ability.description}
                </div>
                {ability.displayIcon && (
                  <img src={ability.displayIcon} alt={ability.displayName} className="ability-icon" />
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )};