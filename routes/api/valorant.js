const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/agents', async (req, res) => {
    const response = await axios.get('https://valorant-api.com/v1/agents');
    const agentData = response.data;
    res.json(agentData);
  });

module.exports = router;