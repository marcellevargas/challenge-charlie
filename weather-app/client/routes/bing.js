const express = require('express');
const router = express.Router();
const https = require('https');

router.get('/image', (req, res) => {
  const url = 'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=pt-BR';

  https.get(url, (apiResponse) => {
    let data = '';
    apiResponse.on('data', (chunk) => {
      data += chunk;
    });
    apiResponse.on('end', () => {
      try {
        const parsedData = JSON.parse(data);

        if (parsedData.images && parsedData.images[0]) {
          const imageUrl = `https://www.bing.com${parsedData.images[0].url}`;
          const copyright = parsedData.images[0].copyright;
          res.json({
            url: imageUrl,
            copyright: copyright
          });

        } else {
          throw new Error('No image found');
        }
      } catch (error) {
        res.status(500).send({ error: 'Error parsing response or no image found' });
      }
    });
  }).on('error', (error) => {
    res.status(500).send({ error: 'Error fetching image' });
  });
});

module.exports = router;