const express = require('express');
const router = express.Router();
const axios = require('axios');

// Define a route for fetching Valorant agent data
router.get('/agents', async (req, res) => {
  try {
    const response = await axios.get('https://valorant-api.com/v1/agents');
    const agentData = response.data;
    res.json(agentData);
  } catch (error) {
    console.error('Error fetching Valorant agent data:', error);
    res.status(500).json({ error: 'Failed to fetch agent data' });
  }
});

module.exports = router;