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
            // Make an HTTP GET request to the Valorant agent API endpoint
            const response = await axios.get(VALORANT_AGENT_API_ENDPOINT);
            const allAgents = response.data; // Contains data on all Valorant agents
            
            // Filter agents based on the specified role
            const agentsInRole = allAgents.filter((agent) => agent.role.displayName === role);
            
            return agentsInRole;
        } catch (error) {
            throw new Error('Error fetching Valorant agent data');
        }
    }
    
    async function calcRecommendations(req, res) {
      const { role } = req.body; // Get the role from the request body
    
      try {
        // Fetch agents from the Valorant API based on the specified role
        const agents = await fetchAgentsByRole(role);
    
        // Randomly select an agent from the retrieved agents
        const randomAgent = agents[Math.floor(Math.random() * agents.length)];
    
        // Now can use the "randomAgent" data as needed
    
        res.json(randomAgent);
      } catch (error) {
        console.error('Error calculating recommendations:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }