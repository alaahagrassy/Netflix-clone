const express = require('express');
const app = express();
require('./db')
var cors = require('cors')
require('express-async-errors');
const PORT=3001;
const UserRouter = require('./src/Routers/AuthRouter')
const ProfileRouter = require('./src/Routers/UserProfileRouter')
const AdminRouter = require('./src/Routers/AdminRouter')
const MovieRouter = require('./src/Routers/MovieRouter')
const ListRouter = require('./src/Routers/ListRouter')
app.use(express.json());
app.use(cors());

app.use((err, req, res, next) => {
    res.json({ error: err.message });
  next(err);
});

// User Router
app.use('/user' ,UserRouter)

//UserProfile 
app.use('/profile' ,ProfileRouter )

//Admin Router
app.use('/admin' , AdminRouter)

// Movie Router
app.use('/movie' ,MovieRouter)

// List Router
app.use('/list' ,ListRouter)


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })