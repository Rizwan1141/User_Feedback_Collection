const mongoose = require('mongoose')
const {Schema} = mongoose
const RecipientSchema = require('./Recipient')

console.log('survey.js:: before schema declaration')
const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema], // This is a custom field, it would contain sub document collection
    yes: { type: Number, default: 0},
    no: { type: Number, default: 0},
    _user: { type: Schema.Types.ObjectId, ref: 'User'}, //name what ever we want, _ is to identify it as relationship, to make mongo understand that we are setting up relationship
    dateSent: Date, // the date it was sent to users
    lastResponded: Date, // the last response time, user would know if this is still active or not
    surveySent: { type: Boolean, default: false} 
})
//we have two issues with recipients being string of error
// - first is where do we store our feedback from end user, so against each recipient we need to save its feed back
// - we would introduc two new properties in our survey model yes and no,
// now if user hits yes or no again & again it will cause issues
// now inside our recipeints we going to store bunch of little models calls store/ sub document collection, so it would contain email/clicked, this will store each recipient feedback accordingly
// subdocument collection - we use them when we want to have very clear ownership association between records
// in mongo each record is reffered as document, in single document max data can be 4mb
mongoose.model('surveys',surveySchema)