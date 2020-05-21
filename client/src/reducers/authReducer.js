
import { FETCH_USER } from '../actions/types'

//1st argument is the state which is responsible for this reducer, it is null by default so that if request takes time we would return null instantly that means we are not sure about the response yer
//but later we would return the actual response like action.payload,if payload is empty it would return false as we used ||
//2nd argument is action, means update/add/remove/fetch some state in store, 
//at start we dont have any state , so to handle null/error in this case we are using emplty state like state={}
// after defining this now we are going to import this in reducer's index.js, 
    //-then we weould wire it up with combined reducers call 
    //-then hook that up with our redux store inside our application root index.js
    export default function(state = null, action){
        //action types would be any types defined in our project would be added in swithc statement 
        //console.log(action)
        switch(action.type){
            case FETCH_USER:
                return action.payload || false
            default:
                return state
        }
    }