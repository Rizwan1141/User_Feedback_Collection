//next - it is the done call back or next function to be called after this middleware success, but if it fails or we dont receive proper request we would return from here
// - but if it is successful we would call next()
module.exports = (req, res, next) => {
    if(!req.user){
        return res.status(401).send({ error: 'You must login!'})
    }

    next()
}