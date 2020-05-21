import axios from 'axios'
import { FETCH_USER } from './types'
import { FETCH_SURVEYS } from './types'
import { SURVEY_DETAILS } from './types'
//import { bindActionCreators } from 'redux'

export const fetchUser = () => 
    async (dispatch) => {
        const res = await axios.get('/api/current_user')
        dispatch({ type: FETCH_USER, payload: res.data })
        //res is a complete object containing so many proprties,which we dont need, so we would only return res.data
    }
    //refactor to use async/await and aero functions
    //aero func: if you have curly braces and return stateent, means only one statement in func we can remove curly braces
    // function(dispatch) { 
    //     axios
    //         .get('/api/current_user')
    //         .then(res => dispatch({ type: FETCH_USER, payload: res }))
        /*const request = axios.get('/api/current_user')
        return {
            type: FETCH_USER,
            payload: request
        } */
   // }

//now we would make post request to our backend server, beacuase we want to send some info along request
// so in post we give two parameters api address and information that we want to post
export const handleToken = (token) =>
    async (dispatch) => {
        const res = await axios.post('./api/stripe', token)
        dispatch({ type: FETCH_USER, payload: res.data })
    }

//values would be the data we receive from user input form
//redux always expect us to return an object which is an action, with type property
export const submitSurvey = (values, history) => 
    async dispatch => {
        const res = await axios.post('/api/surveys', values)
        
        history.push('/surveys')
        dispatch({ type: FETCH_USER, payload: res.data })
        //return { type: 'submit_survey' }
}

export const fetchSurveys = (param) => async dispatch => {
    console.log("Actions::Index::fetch Surveys::" + param.surveySent) 
    console.log("Actions::Index::fetch Surveys::" + JSON.stringify(param)) 
    const res = await axios.get('/api/surveys?surveySent=' + param.surveySent)

    dispatch({ type: FETCH_SURVEYS, payload: res.data })
}

export const deleteSurvey = (surveyId) => 

    async dispatch => {
        console.log("delete Survey::" + surveyId)        
        console.log("delete Survey::" + JSON.stringify(surveyId)    )
        await axios.post('/api/surveys/delete', surveyId)
        
        const res = await axios.get('/api/surveys')
        dispatch({ type: FETCH_SURVEYS, payload: res.data })
        //return { type: 'submit_survey' }
}

export const saveSurvey = (values, history) => 
    async dispatch => {
        console.log("save Survey::" + values)        
        await axios.post('/api/surveys/save', values)
        
        history.push('/surveys')
        //dispatch({ type: FETCH_SURVEYS, payload: res.data })
        
}
function loadSurveyDetails(survey){
    var recipientsObj = survey.recipients
    //console.log("Actions::Index::loadSurveyDetails:recipients" + JSON.stringify(recipientsObj) )
    var recipients = ''
    recipientsObj.forEach(obj=>{ recipients += ',' + obj.email})
    recipients = (recipients.length > 1 ? recipients.substring(1) : '')
    //console.log("Actions::Index::loadSurveyDetails:recipients:" +  recipients)

    var detailObj = {
        title: survey.title,
        subject: survey.subject,
        body: survey.body,
        recipients: recipients
    }

    return{
        type: SURVEY_DETAILS,
        payload: detailObj
    }
}

export const fetchSurvey = (param, history) => async dispatch => {
    console.log("Actions::Index::fetch Surveys::" + param.surveyId) 
    //console.log("Actions::Index::fetch Surveys::" + JSON.stringify(param)) 
    const res = await axios.get('/api/surveys/fetchSurvey?surveyId=' + param.surveyId)
    //console.log("Actions::Index::fetch Surveys::res" + res) 
    //console.log("Actions::Index::fetch Surveys::res.data" + JSON.stringify(res.data)) 
    
    var returnedObj = loadSurveyDetails(res.data)
    dispatch(returnedObj);
    history.push({pathname: '/surveys/new'
                , loadSurvey:"true"})
}
