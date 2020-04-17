//SurveyField contains logic to render a sigle lable and text input

import React from 'react'
import { reduxForm, Field } from 'redux-form' 
//Now this component is being rendered by Field Tag, due to which now it has whole bunch of props being passed from redux-form
//redux form is generating bunch of event handlers that we are gona generate ourselves, means we added input element, redux-form is automatically attaching lot of events etc

// export default props => {
//     console.log(props.input)
//now as we are using props twice and ultimately fetching its property, no other use so we can write it in es15 syntax as below
export default ({ input, label, meta: { error, touched} }) => {
    //meta: {error, touched} means we are not fetching whole object but only two properties which we need
    //console.log(meta)
    //console.log(props.input)
    //<input onBlur={input.onBlur} onChange={input.onChange} /> -- this is equal to <input {...input} />
    // which means that include all the events of this element
    // we want this label text to be sent from parent, as we want to reuse this component, so we would add this in the argument as well and set it below like {label}
    return (
        <div>
            <label>{label}</label> 
            <input {...input} style={{ marginBottom: '5px' }}/>
            <div className="red-text" style={{ marginBottom: '20px' }}>
            { touched && error }
            </div>
        </div>
    )
}