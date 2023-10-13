const axios = require('axios');
const Quiz = require('../../models/quiz');

module.exports = {
    index,
    calcRecommendations,
};
const VALORANT_AGENT_API_ENDPOINT = 'https://valorant-api.com/v1/agents';

async function index(req, res) {
    try {
      const questions = await Quiz.find();
      res.json(questions);
    } catch (err) {
      console.error('Error fetching questions:', err);
      res.status(500).json('Internal Server Error');
    }
  }


  async function fetchAgentsByRole(role) {
    try {
        const response = await axios.get(VALORANT_AGENT_API_ENDPOINT);
        const allAgents = response.data?.data; // Check if the data property exists

        if (!Array.isArray(allAgents)) {
            throw new Error('Data fetched is not an array');
        }

        const agentsInRole = allAgents.filter((agent) => {
            return agent.role && agent.role.displayName.toLowerCase() === role.toLowerCase();
        });

        if (agentsInRole.length === 0) {
            throw new Error(`No agents found for the role: ${role}`);
        }
        
        return agentsInRole;
    } catch (error) {
        console.error('Error fetching Valorant agent data:', error);
        throw new Error('Error fetching Valorant agent data');
    }
}
    
async function calcRecommendations(req, res) {
    const { role } = req.body;
  
    try {
      const agents = await fetchAgentsByRole(role);
  
      if (agents.length === 0) {
        throw new Error(`No agents found for the role: ${role}`);
      }
  
      const recommendedAgent = agents[Math.floor(Math.random() * agents.length)];
  
      res.json(recommendedAgent);
    } catch (error) {
      console.error('Error calculating recommendations:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

    async function determineRecommendedAgent(rolePoints) {
        let maxRole = '';
        let maxPoints = 0;
    
        Object.keys(rolePoints).forEach((role) => {
            if (rolePoints[role] > maxPoints) {
                maxPoints = rolePoints[role];
                maxRole = role;
            }
        });
    
        try {
            const response = await axios.get(`${VALORANT_AGENT_API_ENDPOINT}?role=${maxRole}`);
            const agentsInRole = response.data; // Contains data on agents for the specified role
    
            if (agentsInRole.length === 0) {
                throw new Error(`No agents found for the role: ${maxRole}`);
            }
    
            const randomAgent = agentsInRole[Math.floor(Math.random() * agentsInRole.length)];
    
            return randomAgent;
        } catch (error) {
            throw new Error('Error fetching recommended agent');
        }
    }
    