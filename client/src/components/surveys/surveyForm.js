//SurveyForm shows a form for a user to add input
import _ from 'lodash'
import React, { Component } from 'react'
import { reduxForm, Field, getFormInitialValues, change   } from 'redux-form' // Field is helper of redux-form to handle any traditional fields/inputs/html elements of web, like checkbox, textarea, radiobutton, etc
import { Link, withRouter  } from 'react-router-dom'
import SurveyField from './SurveyField'
import validateEmails from '../../utils/validateEmails'
import formFields from './formFields'
import { saveSurvey } from '../../actions'
import {  connect } from 'react-redux'
import SavedSurveys from './SavedSurveys'

class SurveyForm extends Component {
    
    constructor(props){
        super(props)
        
            //console.log("SurveyForm::Constructor:formValues:" + JSON.stringify(this.props.formValues))
            if(typeof this.props.formValues == 'undefined'){
                //if(typeof this.props.formValues == 'undefined' && (typeof this.props.surveyDetail == 'undefined' || this.props.surveyDetail.title == 'undefined')){
                this.state = {
                    title: "",
                    subject: "",
                    body: "",
                    recipients: ""
                }
            }
            else
            {
                // if(typeof this.props.formValues == 'undefined')
                //     this.state = this.props.surveyDetail;
                // else
                    this.state = this.props.formValues
                const stat = this.state;
                const { dispatch } = this.props;
                formFields.forEach(function ({name}){
                    dispatch(change('surveyForm', name, (stat[name]!= 'undefined' ? stat[name] : '')));
                })
            }
            
            console.log("SurveyForm:Costructor:" + JSON.stringify(this.state))
            this.props.handleSubmit.bind(this);
    }
    
    componentDidUpdate(){
        // console.log("surveyForm::componentDidUpdate::Query params::" + (this.props.location.loadSurvey))
        // console.log("surveyForm::componentDidUpdate::state::" + (JSON.stringify(this.props.location.state)))
        console.log("surveyForm::componentDidUpdate::state:surveyDetails:" + (JSON.stringify(this.props.surveyDetails)))
         const { dispatch } = this.props;
        if(this.props.location.loadSurvey)
        {
            if(!_.isEqual(this.state, this.props.surveyDetails)){
                this.setState(this.props.surveyDetails)
                const stat = this.props.surveyDetails
                formFields.forEach(function ({name}){
                    //console.log("name:" + stat[name])
                    dispatch(change('surveyForm', name, (stat[name]!= 'undefined' ? stat[name] : '')));
                })
            }
            this.props.location.loadSurvey = false
        }
        
    }
    
    componentDidMount() {
        //console.log("SurveyForm:componentDidMount:" + JSON.stringify(this.state))
        //console.log("surveyForm::compnentDidMount::survey:" + this.props.survey)
        //console.log("surveyForm::compnentDidMount::state::" + (JSON.stringify(this.state)))
              
    }
        
    //it is better to keep render function small, so instead of adding direct html, i would create a helper function to generate all text fields
    //to pass any argument to the component we can just set that as property to the parent element
    // to avoid this duplicate code for fields we would use trick 
    renderFields() {
        return _.map(formFields, ({ label, name}) => {
            // return <Field component={SurveyField} type="text" label={field.label} name={field.name} />
            //console.log("renderFields::state[name]:" + this.state[name])//[name])
            return <Field key={name} component={SurveyField} type="text" label={label} name={name} content={this.state[name]}  onChange={(e)=> this.setState({ [e.target.name]: e.target.value})} /> //both statements are same, we changed the fields argument and fetched only properties and assigned them directly
           // return <Field key={name} component={SurveyField} type="text" label={label} name={name}/> 
            //any time we are using array, we need to specify a key so that react can uniquely identify each field, so name is unique we wil make it key
        })
        //Below commented code is same as above, just js tweaking
        // return (
        //     <div>
        //         <label>Survey Title</label>
        //         <input label="Survey Title" type="text" name="title"  value = {this.state.title || ""}  onChange={e => this.setState({[e.target.name]: e.target.value})}/>
        //         <label>Subject Line</label><input label="Subject Line" type="text" name="subject" value = {this.state.subject} onChange={e => this.setState({[e.target.name]: e.target.value})}/>
        //         <label>Email Body</label><input label="Email Body" type="text" name="body" value = {this.state['body']} onChange={e => this.setState({[e.target.name]: e.target.value})}/>
        //         <label>Recipient List</label><input label="Recipient List" type="text" name="recipients" value = {this.state['recipients']} onChange={e => this.setState({[e.target.name]: e.target.value})}/>
        //     </div>
        //)//onChange={(e)=> this.setState({subject: e.target.value})}
    }
    handleSubmit(event) {
        event.preventDefault();
        console.log("handleSubmit:" )
        this.props.handleSubmit(this.props.onSurveySubmit)
        //this.props.onSurveySubmit()
      }
    
    handleSave(event) {
        event.preventDefault();
        //console.log("handleSave:" )
        console.log("handleSave:this.values:" + JSON.stringify( this.state ))
        this.props.dispatch(saveSurvey(this.state, this.props.history))
      }
    render() {
        return (
            //<form onSubmit={this.props.handleSubmit(values => console.log(values))}>
            //we wont be sending values in handlesubmit as it would be taken care by redux-form
            //we removed paranthesis from this.props.onSurveySubmit function because we dont want it to be called immidiatly on form load, but when used submits form then, so it is a reference which would be invoked on form submission
            <div> 
                <form  onSubmit = { this.props.handleSubmit(this.props.onSurveySubmit)} >
                    {this.renderFields()/* <Field type="text" name="surveyTitle" component="input" /> */}
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button type="submit"
                            className="teal btn-flat right white-text" >
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                    
                    <button type="button" onClick={this.handleSave.bind(this)}
                            className="blue btn btn-flat white-text right" style={{ margin: '0 10px' }}>
                        Save
                        <i className="material-icons right">save</i>
                    </button>
                    <SavedSurveys />
                </form>
            </div>
        )
        // return (
        //     //<form onSubmit={this.props.handleSubmit(values => console.log(values))}>
        //     //we wont be sending values in handlesubmit as it would be taken care by redux-form
        //     //we removed paranthesis from this.props.onSurveySubmit function because we dont want it to be called immidiatly on form load, but when used submits form then, so it is a reference which would be invoked on form submission
        //     <div> 
        //         <form  onSubmit = { handleSubmit(onSurveySubmit)} >
        //             {this.renderFields()/* <Field type="text" name="surveyTitle" component="input" /> */}
        //             <Link to="/surveys" className="red btn-flat white-text">
        //                 Cancel
        //             </Link>
        //             <button type="submit"
        //                     className="teal btn-flat right white-text" >
        //                 Next
        //                 <i className="material-icons right">done</i>
        //             </button>
                    
        //             <button type="button" onClick={() => this.props.saveSurvey(this.props.values, this.props.history)} 
        //                     className="green btn btn-flat white-text right" style={{ margin: '0 10px' }}>
        //                 Save Survey
        //                 <i className="material-icons right">save</i>
        //             </button>
        //             <SavedSurveys />
        //         </form>
        //     </div>
        // )
    }
}

//values are all the values in the form, so values would be an object containing all fields , field name as key 
function validate(values) {
    const errors = {}
    //console.log("validate::values:" + JSON.stringify(values))
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
  
    //if errors is empty then it is good to go, but if it contain any value then redux form would raise it
    return errors
}
// const mapStateToProps = (state, props) => ({
//     initialValues: {
//       ...getFormInitialValues("surveyForm")(state),
//       ...getPageOneInitialValues(state, props)
//     }
//   });
function mapStateToProps( state ) {
    console.log("mapStateToProps:surveyForm:" , (state))  
    //console.log("mapStateToProps:surveyForm:" + JSON.stringify(state.form.surveyForm.values))  
    return {
        formValues: state.form.surveyForm.values,
        surveyDetails: state.surveyDetail
    }
}
// const selector = formValueSelector('surveyForm') // <-- same as form name
// SurveyForm = connect(
//   (state => {
//     // can select values individually
//     const title = selector(state, 'title')
//     const subject = selector(state, 'subject')
//     const body = selector(state, 'body')
//     const recipients = selector(state, 'recipients')
//     var values = { title, subject, body, recipients }
//     return { values }
//   }, mapStateToProps ), {  saveSurvey, fetchSurvey }
// )(withRouter(SurveyForm))
const decoratedForm = connect( mapStateToProps, { saveSurvey })(withRouter(SurveyForm))
//onSubmit is the function called on form submission like normal html, so we have access to all data on form on submission in this.props.handleSubmit
export default reduxForm({
    //validate: validate,
    //as both sides are same named we can use es15 as below
    validate,
    //form - it sets the name of this form in the state/redux store, to access its data we will use this name as key
    form: 'surveyForm',
    //enableReinitialize: true,
    //keepDirtyOnReinitialize: true,
    destroyOnUnmount: false,
    //forceUnregisterOnUnmount: true,
})(decoratedForm) ; //it is similar to connect function of redux, but unlike connect it only take one argument


