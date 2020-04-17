import { combineReducers } from 'redux'
import authReducer from './authReducer'
import { reducer as reduxForm } from 'redux-form' // just changing name according to es15,, just to avoid confusion like reducer,
import surveysReducer from './surveysReducer'

//one important aspect of combineReducers call is the object we are passing in, what ever keys it has is going to represent keys inside store
//like auth, it is being produced by authReducer so setting it in function below
export default combineReducers ({
    auth: authReducer,
    form: reduxForm,
    surveys: surveysReducer
})