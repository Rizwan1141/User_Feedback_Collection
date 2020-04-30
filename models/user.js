const mongoose = require('mongoose')
//const Schema = mongoose.Schema
const {Schema} = mongoose
//Above two lines are similar, second line is suggesting that mongoose has property named Schema, assign it to local variable Schema, This is called destructuring.
console.log('user.js:: before schema declaration')
//defining modelClass for collection named 'users' Schema
// further options can be seen on mongoos documentation
const userSchema = new Schema({
    googleId: String,
    firstName: { type: String, default: "" },
    credits: { type: Number, default: 0 } // for setting multiple properties we are using object
})
console.log('user.js:: after schema declaration')
//using below command we are telling mongoose to create collection named 'users'
//if it already exists it wont cause issue
mongoose.model('users',userSchema)
// two arguments in above statement means we are loading something in mongoose
// one argument in above statement would mean that we want to fetch/unload something from mongoose
console.log('user.js:: add collection and schema declaration')