//we are creating class based component/Header
//we are making it class based component because we want to define some function which would decide what content to show baed on if user is loged in or not
//other component type is functional component, but it gets messy
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom' //which is specifically the flavour of react router which works inside the browser 
import Payments from './Payments'
import UserInfo from './UserInfo'
//import * as $ from 'jquery';
//we would use Materializecss.com for just a basic look & feel
//MaterialUi another css library, it uses javascript based styling which is little hard to modify/customize

//-CSS- In React we use className instead of class which is used in css

//To determine if a user is loged in or not we would use our route '/api/current_user'
    //-on first boot of application we would make request to this path 
        //- if it responds back with user model then user is logedIn
        //- if it responds back with undefined/null etc then user is not loged IN
class Header extends Component
{
    
    //this function would decide what to render, if we dont know about user state yet we want to show empty area, if user is not loged in we want to show login with google , if loged in then welcom etc
    // for this purpose we would use now auth property which we set earlier 
    renderContent(){
        switch (this.props.auth){
            case null:
                return //'Still deciding'
            case false:
                return [
                    <li key="1"><a href="/auth/facebook">Login With Facebook</a></li>,
                    <li key="2"><a href="/auth/google">Login With Google</a></li>
                ]//'im logged out'
            default:
                return [
                    <li key="1"><Payments /></li>,
                    <li key="3" style={{ margin: '0 10px' }}>
                        Credits: {this.props.auth.credits}
                    </li>
                    //,<li key="2"><a href="/api/logout">Logout</a></li>
                    ,<UserInfo key="4"/>
                ] //'im logged in'
        }
    }
    render() {
        
        //console.log(this.props)
        //on clicking logo we will see if user is loged in then send it to different page than if the user is not loged in for which we would use auth property here as well
        return(
            <nav>                
                <div className="nav-wrapper">
                    <Link 
                    to={ this.props.auth ? '/surveys' : '/' }
                     className="left brand-logo"
                    >
                        Emaily
                    </Link>
                    <ul className="right">
                        { this.renderContent() }
                    </ul>
                </div>
            </nav>   
        )
    }
}
//this function gets called with the entire state object from the redux store
// function mapStateProps({state}){
//     return { atuth: state.auth }
// }
function mapStateProps({auth}){
    return { auth }
}
export default connect(mapStateProps) (Header)