//error code from 400-499 indicates that user has made mistake in the request
// in http world there is status code on www.w3.org/Protocols/ status codes we have one status code 403, Forbidden
module.exports = (req, res, next) => {
    if(req.user.credits < 1 ){
        return res.status(403).send({ error: 'Not enough credits!'})
    }

    next()
}