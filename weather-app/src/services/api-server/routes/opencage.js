const express = require('express');
const router = express.Router();
const https = require('https');
require('dotenv').config();

router.use(express.json());

router.post('/', (req, res) => {
  const { latitude, longitude } = req.body;
  if (!latitude || !longitude) {
    return res.status(400).send({ error: 'Latitude and longitude are required' });
  }

  const apiKey = process.env.OPEN_CAGE_KEY;
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${apiKey}`;

  https.get(url, (apiResponse) => {
    let data = '';
    apiResponse.on('data', (chunk) => {
      data += chunk;
    });
    apiResponse.on('end', () => {
      try {
        const parsedData = JSON.parse(data);

        if (parsedData.results && parsedData.results.length > 0) {
          res.json({
            results: parsedData.results
          });
        } else {
          throw new Error('No location found');
        }
      } catch (error) {
        res.status(500).send({ error: 'Error parsing response or no location found' });
      }
    });
  }).on('error', (error) => {
    res.status(500).send({ error: 'Error fetching location' });
  });
});

module.exports = router;