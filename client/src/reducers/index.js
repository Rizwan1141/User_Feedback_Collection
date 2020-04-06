import { combineReducers } from 'redux'
import authReducer from './authReducer'

//one important aspect of combineReducers call is the object we are passing in, what ever keys it has is going to represent keys inside store
//like auth, it is being produced by authReducer so setting it in function below
export default combineReducers ({
    auth: authReducer

})