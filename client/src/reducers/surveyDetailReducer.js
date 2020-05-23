import { SURVEY_DETAILS, CLEAR_FIELDS } from '../actions/types'

export default function(state = [], action) {
    //console.log(action)

    switch (action.type) {
        case SURVEY_DETAILS:
            return action.payload
        case CLEAR_FIELDS:
            return {}
        default:
            return state
    }
}