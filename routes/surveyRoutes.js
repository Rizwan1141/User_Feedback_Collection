//the structure of these routes file, 
//1 -we define an arrow function, 
//2 -we export it immidiatly then 
//3 -we wire it up in our main index.js

//before creating survey we want to make sure that user is loged in
//2nd ly - if user is loged in then we would check if user has enough credit to make survey
// to handl this we would use middle ware for login check
const _ = require('lodash')
const { Path } = require('path-parser')
const { URL } = require('url')
const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplate/surveyTemplate')

const Survey = mongoose.model('surveys')
//pass middlewares in the same order in which u want to use them , like login check before payment check
module.exports = app => {

  app.get('/api/surveys', requireLogin, async (req, res) => {
    const { surveySent } = req.query
    console.log("Routes::surveyRoutes::fetch surveys::req.body:" + JSON.stringify(req.query))
    
    // here we want to fetch all surveys created by current user and show them to current user
    // we will use _user which is foreign key
    //const surveys = await Survey.find({ _user: req.user.id }) // to further exclude/include any field like here receipients we will use select#Query projection
    // - in select you can include any field by passing field names in string like select('title recepients') or to exclude add minus - like select('-title -recepients')
    // - another syntax to do the same is select (title : 1, recepients: 1) and to exclude set it to zero like select (title : 0, recepients: 0)
    const surveys = await Survey.find({ _user: req.user.id, surveySent }).select({ 
      recipients: 0 
    })

    res.send(surveys)  // here is loose end that is these surveys can contain huge list of receipients , so we dont want to pull all that info and throw at our express server
    // - as in the main surveys list, we dont want to show the receipients as well, so we will pass another filter to ignore the subdocument recipients
  })

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!')
  })

  app.post('/api/surveys/webhooks', (req, res) => {
    console.log(req.body)
    //console.log(res)
    //const events = _.map(req.body, (event) => { --we only need email and url so we would get them out only
    const p = new Path('/api/surveys/:surveyId/:choice')
    // const events = _.map(req.body, ({ email, url }) => {
    //   //to get only the url with out domain we would use URL library imported 
    //   //const pathname = new URL(url).pathname //it would extract /api/surveys/surveyid/yes and remove http://localhost:5000/
      
    //   //console.log(p.test(pathname))
    //   const match = p.test(new URL(url).pathname)
    //   if(match) {
    //     //return { email: event.email, surveyId: match.surveyId, choice: match.choice }
    //     return { email, surveyId: match.surveyId, choice: match.choice }
    //   }
    // })
    // //console.log(events)
    // const compactEvents = _.compact(events) // this function removes the undefined objects from array
    // const uniqueEvents = _.uniqBy(conmpactEvents, 'email', 'surveyId') //this function returns only unique events on the basis of given filters like here we gave email and survey id, so only one record would be given containing same email and surveyid
    // console.log(uniqueEvents)
     
    _.chain(req.body)
      .map(({ email, url }) => {
        console.log(email)
        console.log(url)
        const match = p.test(new URL(url).pathname)
        if(match) {
          return { email, surveyId: match.surveyId, choice: match.choice }
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each( ({ surveyId, email, choice }) => {
        Survey.updateOne({
          _id: surveyId, //in mongo id is _id so renaming it
          recipients: {
            $elemMatch: { email: email, responded: false }
          }
        }, {
          $inc: { [choice]: 1 }, //here choice is either yes or no so accordingly fields would be updated at runtime
          $set: { 'recipients.$.responded': true }, // this line would update the responded property, here we are using another mongo operator, $set sets value 	
          lastResponded: new Date()
        }).exec() // this exec() is required to execute query in the query
      })
      .value()
    //console.log(events) // instead of looping over events again and updating in db , we would add another chained function .each()
    // so this will update in the database at the same time

    res.send({}) // sending empty response to sendgrid so that this request/post is not remained hanged
    //as we dont need to send notification to sendgrid that the data is updated in our db or not, so we are not using async await, we are just send the response straight way
  })

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
      //request body should contain title, subject, body, recipients(comma separated)
      const { title, subject, body, recipients, surveyId } = req.body
      //so from front end wwe would be passing these properties from react side
      // its better to work on backend first in most professional projects, sometimes it seems to work with front end first easy but dont do that cover all your routes first on backend
      console.log("surveyRoutes::post:recipients::" + recipients)
      console.log('surveyRoute:surveyId', surveyId)
      
      const survey = new Survey({
          //title: title //first title is property of survey instance created from survey modle, 2nd is the local variable extracted from request body
          //now if both are named same so in es15 syntax we can simple use once like below
          title, // this is exactly similar to title: title
          subject,
          body,
          //creating subdocument schema is a little complicated but its easy, our recipient schema has email and responded properties 
          //we would pass (array of objects) mongo would automatically create sub document
          // so now we would be converting comma separated recipients to objects
          //recipients: recipients.split(',').map(email => { return { email: email }})
          //recipients: recipients.split(',').map(email => { return { email }}) // now as body of function is returning just one statement we can remove return and function curly braces in es15 syntax
          //recipients: recipients.split(',').map(email => ({ email })), // now javascript gets confused for like we are defining function body or shorthand object, we want object so we would wrap it in paranthesis, 
          //this all three are same statements
          recipients: recipients.toString().split(',').map(email => ({ email: email.trim() })), // as we want to remove all trailing spaces from email so we need to use the this syntax
          //map function takes every object from array, it runs some function and then it creates new array of objects
          _user: req.user.id, //this id here is the one automatically generated by mongo for each user
          dateSent: Date.now(),
          surveySent: true
      })
      //we can introduce new property specifying redirecting url after giving the feedback
      //uptill now we have just made an instance of survey in our memory yet not in database, to make it persistant to db we need to use save function

      // -- this is the place where we send an email
      // any time we want to create object of class we use new key word like below
      // the first argument would be all the information we want in our email, the second arguement would be the email template/html look out
      const mailer = new Mailer(survey, surveyTemplate(survey))
      try{
        await mailer.send();
        if(surveyId != '')
        {
          console.log('survey Routes: update one: survey Id:', surveyId)
          await Survey.updateOne({ _user: req.user.id, _id: surveyId }, {dateSent: Date.now(), surveySent: true})

        }
        else
          await survey.save()
        req.user.credits -= 1
        const user = await req.user.save()
        //Mailer(survey, surveyTemplate(survey));
            
        res.send(user)
      }
      catch(err){
        res.status(422).send(err)
      }      
  })

  app.post('/api/surveys/delete', requireLogin, async (req, res) => {
    const { surveyId } = req.body
    console.log("survey Routes ::" + surveyId)
    
    await Survey.findOneAndRemove({ _id: surveyId })
    
    res.send({})
  })

  app.post('/api/surveys/save', requireLogin, async (req, res) => {
    debugger;
    console.log("req.body" + req.body)
    console.log("title" + req.body.title)
    console.log("subject" + req.body.subject)
    console.log("req.body.body" + req.body.body)
    const { title, subject, body, recipients } = req.body
    console.log("surveyRoutes::/api/surveys/save:recipients::" + recipients)
    const survey = new Survey({
        title : (title != null ? title : ""), // this is exactly similar to title: title
        subject: (subject != null ? subject : ""),
        body: (body != null ? body : ""),
        recipients: (recipients != null ? recipients.toString().split(',').map(email => ({ email: email.trim() })) : []), // as we want to remove all trailing spaces from email so we need to use the this syntax
        _user: req.user.id, //this id here is the one automatically generated by mongo for each user
        dateSent: Date.now(),
        surveySent: false
    })
    console.log("survey:" + survey)
    try{
      await survey.save()
      res.send({})
    }
    catch(err){
      res.status(422).send(err)
    }      
  })

  app.get('/api/surveys/fetchSurvey', requireLogin, async (req, res) => {
    const { surveyId } = req.query
    console.log("Routes::surveyRoutes::fetchSurvey::req.body:" + JSON.stringify(req.query))
    const survey = await Survey.findOne({ _user: req.user.id, _id: surveyId }).select()
    res.send(survey)
  })
}

