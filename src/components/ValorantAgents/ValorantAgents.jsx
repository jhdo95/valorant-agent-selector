import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ValorantAgents() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Make an API request to fetch Valorant agent data
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
    <div>
      <h1>Valorant Agents</h1>
      {agents.map((agent) => (
        <div key={agent.uuid}>
          <h3>{agent.displayName}</h3>
          <p>{agent.description}</p>
          <img src={agent.displayIcon} alt={agent.displayName} />
        </div>
      ))}
    </div>
  );
}
