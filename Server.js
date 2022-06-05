const express = require('express');
const app = express();
require('./db')
var cors = require('cors')
const PORT=process.env.PORT || 3000;
const UserRouter = require('./src/Routers/AuthRouter')
const AdminRouter = require('./src/Routers/AdminRouter')
const MovieRouter = require('./src/Routers/MovieRouter')
const ListRouter = require('./src/Routers/ListRouter')
app.use(express.json());
app.use(cors());


// User Router
app.use('/user' ,UserRouter)

//Admin Router
app.use('/admin' , AdminRouter)

// Movie Router
app.use('/movie' ,MovieRouter)

// List Router
app.use('/ist' ,ListRouter)


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })