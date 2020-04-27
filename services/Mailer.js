
//it is going to export a class , so name starts with a capital letter
// passport.js starts with small letter, because it doesnot return anything
//const sgMail = require('@sendgrid/mail');
//sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const sendgrid = require('sendgrid')
const helper = sendgrid.mail
const keys = require('../config/keys')

class Mailer extends helper.Mail {
    // helper.Mail propert a object that takes configuration and spit out a mailer
    // we want to add certain modifications to it, so we our extending our class with this helper.Mail

    //1st function called automatically when an oject is created is constructor
    constructor({ subject, recipients }, content) {
        //1st thing here is that we need to call consturctor of Mail
        super() //es2016 syntax

        this.sgApi = sendgrid(keys.sendGridKey) // passing key generated from sendgrid
        this.from_email = new helper.Email('rizi.1141@outlook.com')
        this.subject = subject
        this.body = new helper.Content('text/html', content)
        this.recipients = this.formatAddresses(recipients)

        this.addContent(this.body) //here we are registering actual body of email, this is from base class which we extended
        //click tracking would enable that users feedback to routed to us, at sendgrid side it would enable url replacement with their own url to track each user's feedback and then send us
        this.addClickTracking()
        this.addRecipients()
    }

    formatAddresses(recipients){
        return recipients.map(({ email }) => { // here we are extracting email from recipients
            return new helper.Email(email) //format email using Email Class as we did above in from email
            // now the function would return array of new helper.Email things containing actual email
        })
    }

    addClickTracking(){
        const trackingSettings = new helper.TrackingSettings
        const clickTracking = new helper.ClickTracking(true, true)

        trackingSettings.setClickTracking(clickTracking)
        this.addTrackingSettings(trackingSettings)
    }

    addRecipients(){ // this is the way of adding recipients described in sendgrid documentation
        const personalize = new helper.Personalization()

        this.recipients.forEach(recipient => { //here we are taking all recipients from and adding them to personalize object
            personalize.addTo(recipient)
        })
        this.addPersonalization(personalize) // here above personalize object is added to base class function
    }

    async send() {
        //try {
            console.log("in send")
            const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
            });
                    
            //try {
                console.log("before respose")
            const response = await this.sgApi.API(request);
            console.log("after respose")
            // } catch (err) {
            //     response.status(422).send(err);
            // }
            return response;
        // } catch (err) {
        //     response.status(422).send(err);
        // }
    }
}
//sendgrid is free and easy to use, 
module.exports = Mailer
