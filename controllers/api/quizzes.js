const axios = require('axios');
const Quiz = require('../../models/quiz');
const VALORANT_AGENT_API_ENDPOINT = 'https://valorant-api.com/v1/agents';

module.exports = {
    index,
    calcRecommendations,
};


async function index(req, res) {
      const questions = await Quiz.find();
      res.json(questions);
  }

async function calcRecommendations(req, res) {
try {
    const { role } = req.body;
    const response = await axios.get(VALORANT_AGENT_API_ENDPOINT);
    const allAgents = response.data?.data || [];
    const agentsInRole = allAgents.filter((agent) => {
    return agent.role && agent.role.displayName.toLowerCase() === role.toLowerCase();
    });
    const recommendedAgent = agentsInRole[Math.floor(Math.random() * agentsInRole.length)];
    res.json(recommendedAgent);
} catch (error) {
    res.json({ error: 'Error fetching Valorant agent data' });
}
}