//import materializeCSS from 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/css/materialize.min.css'
//both above are equal as we are not using this variable anywhere so condensed the syntax of import
import React from 'react'
import ReactDom from 'react-dom'
import {Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'

import App from './components/App'

//import for all the reducers here
import reducers from './reducers'
import axios from 'axios'
window.axios = axios //this is just a temp code to test send email function

// creating instance of store for our use
//1st argument is all the reducers we have in our application
//2nd argument for setting initial state, it is most relevent for server side rendering, stuff like that
//3rd middleware, 
const store = createStore(reducers, {}, applyMiddleware(reduxThunk))


//Now we would pass the component to render like App,
// make sure to use < /> jsx tags , because render expect a component instance which is created by using jsx tags
// and 2nd argument we need to refer to our existing DOM node inside the HTML document
// in public directory there is file index.html, in its body there is div with id="root", this would be the root of our application
ReactDom.render(
    <Provider store={store}><App /></Provider>,
    document.querySelector('#root'))
    //provider component is provied by react redux component
    //provider is responsible for reading and comunicating all states changes to all other components
// it takes two arguments 
// 1- root component
// 2- where we are tempting to render that component inside our dom
// root would be app which would contain main routing logic of application

console.log('Stripe Key Is:', process.env.REACT_APP_STRIPE_KEY);
console.log('Environment is', process.env.NODE_ENV)


