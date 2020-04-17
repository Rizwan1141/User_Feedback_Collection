//this form shows their input data to review
import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import formFields from './formFields'
import { withRouter } from 'react-router-dom'
import * as actions from '../../actions'

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
    //As here we are producing list of elemets, so every element needs to be have unique key
    //const reviewFields = _.map(formFields, field => {
        //as we are repeating field again n again, so we would directly fetch the properties we need to use like label and name
    const reviewFields = _.map(formFields, ({ name, label }) => {
        return(
            <div key={name}>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>
            </div>
        )
    })

    return (
        //Now here we are manually typing the property labels and values for each field on form, so this should be generacally picked
        //similarly duplicating code is not good, we should iterate over Fields array and use the properties defined
        //from future perspective, when somebody wants to change title he would just change in array, and it would be reflected every where
        <div>
            <h5>
                Please Confirm your Enteries.
            </h5>
            {reviewFields}
            {/* <div>
                <div>
                    <label>Survey Title</label>
                    <div>{formValues.title}</div>
                </div>
                <div>
                    <label>Subject Line</label>
                    <div>{formValues.subject}</div>
                </div>
                <div>
                    <label>Email Body</label>
                    <div>{formValues.body}</div>
                </div>
            </div> */}
            <button className="yellow darken-3 white-text btn-flat" onClick={onCancel} >
                Back
            </button>
            <button onClick={() => submitSurvey(formValues, history)} className="green btn-flat white-text  right">
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    )
    //Now when send survey is clicked, we would like to proceed, send emails etc
    //remember, with redux when we want to change anything to however our data is changed we are talking about action creator, so here we are talking about changing data so we need to bing this to action creator
    //when user clicks submit call action creator, we created for this, and pass the formvalues
        //- now as this is a direct function call, it would be called on form load, so we would call it under a arrow function, so that it should only be called when a user clicks this button
    //now on clicking submit we would like to do two things, one is save this data to our backend server and act accordingly, like send emails to all entered receipnts, secondly i would like to redirect user to home page
    //next, when user enters data in all fields and clicks cancel, the data is not removed from form fields, you can check this by clicking + (add) button again, so we need to remove this data when clicked on cancel
    // - remember we retained, persisted this data by using a little helper inside our surveyForm component, added property destroyOnUmount while exporting form
    // secondly its not only cancel button, but if user clicks logout or Emaily icon, again we would like to clear to data in fields, so we wont bind this to only cancel button but use below trick
    //- to acheive this we imported {reduxForm} form redux-form on SurveyNew.js which is parent component to both surveyform and surveyFormReview, as we want to keep values when move from surveyForm to surveyFormReview but clear out on anyother navigation
    //- so when user moves away from parent component that is surveyNew then we exported only surveyForm with out destroyOnUnmount option, which is default behaviour, so all values would be cleared automatically
}

//this function would take state from redux and set that to props in form
function mapStateToProps(state) {
    //console.log(state)
    console.log(state.form.surveyForm.values)
    return {
        formValues: state.form.surveyForm.values
    }
}
//what connect does is, all the values/data returned from mapStateToProps would be added to SurveyFormReview as props
export default connect(mapStateToProps, actions) (withRouter(SurveyFormReview))