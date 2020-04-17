//SurveyForm shows a form for a user to add input
import _ from 'lodash'
import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form' // Field is helper of redux-form to handle any traditional fields/inputs/html elements of web, like checkbox, textarea, radiobutton, etc
import { Link } from 'react-router-dom'
import SurveyField from './SurveyField'
import validateEmails from '../../utils/validateEmails'
import formFields from './formFields'


class SurveyForm extends Component {
    //it is better to keep render function small, so instead of adding direct html, i would create a helper function to generate all text fields
    //to pass any argument to the component we can just set that as property to the parent element
    // to avoid this duplicate code for fields we would use trick 
    renderFields() {
        return _.map(formFields, ({ label, name}) => {
            // return <Field component={SurveyField} type="text" label={field.label} name={field.name} />
            return <Field key={name} component={SurveyField} type="text" label={label} name={name} /> //both statements are same, we changed the fields argument and fetched only properties and assigned them directly
            //any time we are using array, we need to specify a key so that react can uniquely identify each field, so name is unique we wil make it key
        })
        //Below commented code is same as above, just js tweaking
        // return (
        //     <div>
        //         <Field label="Survey Title" type="text" name="title" component={SurveyField} />
        //         <Field label="Subject Line" type="text" name="subject" component={SurveyField} />
        //         <Field label="Email Body" type="text" name="body" component={SurveyField} />
        //         <Field label="Recipient List" type="text" name="emails" component={SurveyField} />
        //     </div>
        // )
    }
    render() {
        return (
            //<form onSubmit={this.props.handleSubmit(values => console.log(values))}>
            //we wont be sending values in handlesubmit as it would be taken care by redux-form
            //we removed paranthesis from this.props.onSurveySubmit function because we dont want it to be called immidiatly on form load, but when used submits form then, so it is a reference which would be invoked on form submission
            <div> 
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()/* <Field type="text" name="surveyTitle" component="input" /> */}
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button type="submit" className="teal btn-flat right white-text" >
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        )
    }
}

//values are all the values in the form, so values would be an object containing all fields , field name as key 
function validate(values) {
    const errors = {}
    
    //so what we are doing here we are checking all the fields we want to validate from values, and then if validation fails then we add same named property to errors with error discription
    //now as below code is just being repeated, so remove this redundancy i would iterate over form fields and use name property
    //this time we just want to iterate, so we would use each function from dash _, as we only need name so using es15 we would fetch only name property like { name }
    _.each(formFields, ({ name, noValueError }) => {
        //to fecth any object named specific key we use this syntax values[name]
            //Now for emails/recipients we need special validation, like email format, comma separated etc
        errors.recipients = validateEmails(values.recipients || '')

        if(!values[name]) {
            errors[name] = noValueError //'You must provide a value'
            // Now above message is generic one, if you want to show specific errors you can add additional property to Fields like noValueError,
        }
    })
    // if(!values.title){
    //     errors.title = 'You must provide a title!'
    // }
    

    
    //if errors is empty then it is good to go, but if it contain any value then redux form would raise it
    return errors
}
//onSubmit is the function called on form submission like normal html, so we have access to all data on form on submission in this.props.handleSubmit
export default reduxForm({
    //validate: validate,
    //as both sides are same named we can use es15 as below
    validate,
    //form - it sets the name of this form in the state/redux store, to access its data we will use this name as key
    form: 'surveyForm',
    destroyOnUnmount: false
}) (SurveyForm); //it is similar to connect function of redux, but unlike connect it only take one argument