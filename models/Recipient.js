const mongoose = require('mongoose')
const {Schema} = mongoose

console.log('recipient.js:: before schema declaration')
const recipientSchema = new Schema({
    email: String,
    responded: { type: Boolean, default: false}
})

module.exports = recipientSchema