// - Functional Component - Currently App.js is a functional component
// - Class Component - it should be class based component, in that way we would get access to nyc life cycle method which wil be automaticaly called when this component is actually rendered

//on the front end we are using import statement instead of require
// on front end we are using web pack of beble which gives us easy access to es2017
// on backend we are using older version of js, common js modules, they use/support require

import React, {Component} from 'react';
//BroweserRouter acts as brain of the react-router
// it defines how it would behave for any address
// React here would set up a Rule between a certain address and components on this address
import { BrowserRouter, Route} from 'react-router-dom'
//react redux lib is al about react and redux, we use connect component to get ability to call action creaters
import { connect } from 'react-redux'
import * as actions from '../actions' // we imported all the action creaters and assign them actions object here


//const Header = () => <h2> Header </h2>
import Header from './Header'
import Landing from './Landing'

//import { Component } from 'react'
const Dashboard = () => <h2> Dashboard </h2>
const ServeyNew = () => <h2> ServeyNew </h2>
//const Landing = () => <h2> Landing </h2>

class App extends Component {
    //life cycle method going to fetch current user, the instant it is rendered to screen it goes and fetch the current user
    componentDidMount(){
        this.props.fetchUser()
    }

    render(){
        //it would return jsx
        return (
            //this outer div we are leaving for css/look & feel settings
            //inside of BrowserRouter we are going to place a collection of different routes, each route is going to specify a rule/pair between address and possible components
            //BrowserRouter can have maximum one direct child, like just one div/children, we can create multiple Routes
            //defining first route for the Landing page, Path "/" is telling that this is the Root Route like Emaily.com
            //whenever react router is going to decide which components to show based on path specified, its going to current URL, it is going to match the every single Route and see if its path is included in the current path
            //like in /serveys it contains both / and /serveys, so react router shows both components
            //to fix this we are going to pass property "exact={true}" to match exactly same
            //in jsx, property name only means true like "exact" and "exact={true}" are equal
            //we always want to show Header component, so we put it on the top, now it would always be shown on all paths
            // Now to change content inside Header for different screens, content in Header is defined by code inside our redux store
            <div>            
                <BrowserRouter>
                    <div className="container">
                        <Header />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route path="/surveys/new" component={ServeyNew} />
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}


export default connect(null, actions) (App)
