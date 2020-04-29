const passport = require('passport')

module.exports = (app) => {
  //app object then method type get or post etc then route handle, and code to be executed or function
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  )
  
  //here passport.authenticate is a middleware, and after processing it cals next middleware
  // third parameter is when user is authenticated where to send user
  // this redirect function tells function to move on to next address
  app.get(
    '/auth/google/callback', 
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys')
    }
  )

  app.get('/api/logout', (req, res) => {
    req.logout();
    //it would take the cookie and kill it
    //res.send(req.user)
    res.redirect('/')
  })

  app.get('/api/current_user', (req, res) => {
    //res.send(req.session)
    res.send(req.user)
  })

  // app.get(
  //   '/auth/facebook',
  //   passport.authenticate('facebookToken', {
  //     scope: ['profile', 'email']
  //   })
  // )

  app.get(
    '/auth/facebook',
    passport.authenticate('facebook', {
      publish_actions: ['profile', 'email']
    })
  )

  app.get(
    '/auth/facebook/callback', 
    passport.authenticate('facebook'),
    (req, res) => {
      res.redirect('/surveys')
    }
  )

}
