const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const bingRouter = require('./routes/bing');

app.use('/bing', bingRouter);

app.listen(3005, () => {
  console.log('Server running on http://localhost:3005');
});
