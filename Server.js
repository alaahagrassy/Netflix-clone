const express = require('express');
const app = express();
require('./db')
var cors = require('cors')
const PORT=process.env.PORT || 3000;
app.use(express.json());
app.use(cors());


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })