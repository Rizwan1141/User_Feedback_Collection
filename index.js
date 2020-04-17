// File used for initial setup of application only

const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser')
const keys = require('./config/keys');
require('./models/user')
require('./models/Survey')
require('./services/passport')

console.log('index.js:: before connecting to mongodb')
mongoose.connect(keys.mongoURI)
console.log('index.js:: after connecting to mongodb')
const app = express()
console.log('index.js:: before app.use cookie session')

app.use(bodyParser.json())

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
console.log('index.js:: after cookie session defined')
//app.use  //these three functions are middleware in our application, they are used to modify incoming requests before sending to route handlers
app.use(passport.initialize())
app.use(passport.session())
console.log('index.js after initialize and session')
//const authRoutes = require('./routes/authRoutes')
//authRoutes(app)
//alternate to above commented lines and access exported functions is
require('./routes/authRoutes')(app)
//it would include authRoutes file and function containing routes would be returned then that function is called by passing app parameter. (valid javascript syntax)
require('./routes/billingRoutes')(app)
// app.get('/', (req, res) => {
//   res.send({ bye: 'there - buddy' })
// })
require('./routes/surveyRoutes')(app)

if(process.env.NODE_ENV === 'production'){
  // express sill serve up production assets like our main.js file, or main.css
  app.use(express.static('client/build')) //it means if some one comes for specific asset like main.js look into this directoyr
  
  // this will be executed only when all uper routes are failed then serve it index.html
  //express will serve up the index.html file if it does not recognize the route
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  }) // it says if some one asks for route which we dont understand , we would consider it is defined with react router, so we would server index.html
}

const PORT = process.env.PORT || 5000
app.listen(PORT)
