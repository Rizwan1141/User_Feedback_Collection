const passport = require('passport')

module.exports = (app) => {
  //app object then method type get or post etc then route handle, and code to be executed or function
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  )

  app.get('/auth/google/callback', passport.authenticate('google'))

  app.get('/api/logout', (req, res) => {
    req.logout();
    //it would take the cookie and kill it
    res.send(req.user)
  })

  app.get('/api/current_user', (req, res) => {
    //res.send(req.session)
    res.send(req.user)
  })
}
