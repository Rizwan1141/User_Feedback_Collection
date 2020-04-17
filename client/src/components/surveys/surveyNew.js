//Survey New shows SurveyForm and SurveyFormReview

import React, { Component } from 'react'
import SurveyForm from './surveyForm'
import SurveyFormReview from './SurveyFormReview'
import { reduxForm } from 'redux-form'

class SurveyNew extends Component {
    //in create-react-app classic way to make/initialize component level state, 
    //is by adding constructor and call super function with props and then assigning your state object, like this.state and set property value what ever we need to here we need boolean
    // but then there is this bebble which allows us to achieve the same in a slightly different fashion/way
    // which is as below
    // constructor(props) {
    //     super(props)

    //     this.state = { new: true }
    // }
    state = { showFormReview: false } // both these ways for initializing state in compnent is exactly same, the second one is short way of doing so with help of bebble

    //now we would define helper function to decide which form to show as below
    renderContent() {
        if(this.state.showFormReview) {
            return <SurveyFormReview onCancel={() => this.setState({ showFormReview: false })}/>
        }

        //to handle/toggle this state we would use a callback function using property onSurveySubmit
        return <SurveyForm  onSurveySubmit={() => this.setState({ showFormReview: true })}/>
    }
    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        )
    }
}

export default reduxForm({
    form: 'surveyForm'
}) (SurveyNew);