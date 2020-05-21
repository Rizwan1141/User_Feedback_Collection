import { SURVEY_DETAILS } from '../actions/types'

export default function(state = [], action) {
    //console.log(action)

    switch (action.type) {
        case SURVEY_DETAILS:
            return action.payload
        default:
            return state
    }
}