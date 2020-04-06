import axios from 'axios'
import { FETCH_USER } from './types'
import { bindActionCreators } from 'redux'

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
