const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('users')

passport.serializeUser((user, done) => {
  done(null, user.id)
  // we are not using googleid because user can use facebookid or linkedin id or anyother aouth, so we would be using database generated id to resolve this
  // so once google aoth is done for the first time registration then we would be only using our own id
})
//done  // it is a callback, that we have to call after we have done some work of nudging passport alone

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user)
    })
  //now we would be finding this user by using its id in 'users' collection
})
console.log('passport.js:: defined serialize and deserialize')
//new google strategry we are telling application that we want to authenticate with google
//passport.use is generic function to handle authentication, and what type, that we wrote as parameter googlestrategy
//parameters for google strategy are client iinformation like id and secret and callback url which is used once google authenticates
//and user grants our application permision then we need to redirect him for which callbackURL is used
//------------
//Client ID: 371169569591-b3kqlujpj9gk9frbrgf6u341nrmjfgta.apps.googleusercontent.com
//Client Secret: bltOUxgiBIO12A9uKAiH5upw
// Client id is pubilc token, we can share with any one , it identifies our project on google repositories
// Client Secret is private, it should not be shared with any one otherwise they can have elevated previlage access to our application
//---------------
//'https://murmuring-badlands-81838.herokuapp.com/auth/google/callback'
passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback', 
        proxy: true
      },
      async (accessToken, refreshToken, profile, done) => {
        //In mongoose it does not return directly and it makes asychronous requests
        //then statement is used after query completion, it is null or not
        //below line would check into db if this id already exists?
        console.log('Google aouth successfully returned .')
        const existingUser = await User.findOne({ googleId: profile.id })
        if(existingUser)
        {
          console.log(('User Already Exists with ID:').concat(existingUser.googleId))
          // we already have a record with the given Profie ID
          return  done(null, existingUser) // null mean no error, second parameter is existing User
        } 
        // we dont have a user with this ID, make a new user in db
        // we created new object of User and assigned it value and to save in actual database we used function save()
        //used then to call done, as we dont know what and when user creation is completed due to asyncronous behaviour 
        const user = await new User({ googleId: profile.id }).save()
        done(null, user)
              
        // console.log('accessToken', accessToken);
       // console.log('refresh Token', refreshToken);
       // console.log('profile', profile);
      }
    )
  )
  console.log('passport.js:: after strategy defined')