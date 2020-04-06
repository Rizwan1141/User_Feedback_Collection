//we would be looking for post request that are generated for credits
// so here inside this post request we would receive token , now we would  put logic to handle token and authorize with stripe api for charge and then update the users no of credits

const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey)
const requireLogin = require('../middlewares/requireLogin')

//Gotcha - Express - when you make post request to express server, it does not parse payload
// so we have to install another module that instructs express to take payload from post request and parse it
// here 2nd parameter is the middleware, we didnot use it like a function() although it is a function , because we dont want to run it immidiatly when it is loaded in browser, rather we 
// tell any time soon when the post request comes to this route, execute this reference function
// app.get/post etc can accept any no of arguments, it only requires one function to process the in coming request and send back the response to user, so we can introduce how many middleware we want to use
module.exports = app => {
    app.post('/api/stripe', 
        requireLogin,
        async (req, res) => {
            //console.log(req.body)
            //if by any reason , some body press add credits without sign in, it would generate error as req.user wont exist so it would be confused where to tadd credits
            //for this we would make sure that user is loged in before adding credits, at top of this route handler we can check if user is loged in or not
            //here we are taking naive case, we would discuss it later to improve
            // we want to make sure for user loged in at so many places in application, so for every route hander we should not wite this code instead it should be written once
            // we can achieve this in middlewares, which tweaks incoming request before sending it to further, but here we only want to apply certain address so we would configure it separately

            // if(!req.user){
            //     return res.statu(401).send({ error: 'You must log in!'})
            // }
            const charge = await stripe.charges.create({
                        amount: 500,
                        currency: 'usd',
                        description: '$5 for 5 Credits',
                        source: req.body.id
                    })
            console.log(charge)
            
        //req.user would contain, it is set by passport automatically
        req.user.credits += 5
        // now to update in db, we will call save
        const user = await req.user.save()
        //to communcate the updated user back to browser
        res.send(user)
    })
}