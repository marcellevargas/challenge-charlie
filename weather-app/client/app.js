const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const bingRouter = require('./routes/bing');
const geolocationRouter = require('./routes/opencage');

app.use('/bing', bingRouter);
app.use('/geolocation', geolocationRouter);

app.listen(3005, () => {
  console.log('Server running on http://localhost:3005');
});
