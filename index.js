// File used for initial setup of application only

const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('./config/keys');
require('./models/user')
require('./services/passport')


mongoose.connect(keys.mongoURI)

const app = express()
//now here we are telling express that it needs to make use of cookie in our application
//cookie Session Parameters description
//1 - time for which cookie would remain valid in milliseconds
//2 - //it would always be array as we can provide mulitple keys for security, so cookie can use anyone string
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, 
    keys: [keys.cookieKey]
  })
)
//app.use  //these functions are middleware in our application, they are used to modify incoming requests before sending to route handlers
app.use(passport.initialize())
app.use(passport.session())

//const authRoutes = require('./routes/authRoutes')
//authRoutes(app)
//alternate to above commented lines and access exported functions is
require('./routes/authRoutes')(app)
//it would include authRoutes file and function containing routes would be returned then that function is called by passing app parameter. (valid javascript syntax)

// app.get('/', (req, res) => {
//   res.send({ bye: 'there - buddy' })
// })


const PORT = process.env.PORT || 5000
app.listen(PORT)
