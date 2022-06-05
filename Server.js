const express = require('express');
const app = express();
require('./db')
var cors = require('cors')
const PORT=process.env.PORT || 3000;
const UserRouter = require('./src/Routers/AuthRouter')
const MovieRouter = require('./src/Routers/MovieRouter')
const ListRouter = require('./src/Routers/ListRouter')
app.use(express.json());
app.use(cors());


// User Router
app.use('/user' ,UserRouter)

// Movie Router
app.use('/movie' ,MovieRouter)

// List Router
app.use('/list' ,ListRouter)


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })