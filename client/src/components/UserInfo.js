// this file would handle all payment related stuff
// you can name it like stripe wraper etc

import React, { Component } from  'react'
import M from "materialize-css"
import { connect } from 'react-redux'

class UserInfo extends Component{
    componentDidMount() {
        //$('#dropdowner').dropdown();
        //document.addEventListener('DOMContentLoaded', function() {
            //var element = document.querySelector('#dropdowner');
            var element = document.querySelector('.dropdown-trigger');
            //var elems = element;
             M.Dropdown.init(element, {});
        //  });
        
    }
    render(){
        //debugger;
        return(
            <>
                <ul  id="userInfo_dropdown"  className="dropdown-content">
                    <li><a href="#">{this.props.auth.firstName}</a></li>
                    <li className="divider"></li>
                    <li><a href="/api/logout">Logout</a></li>
                </ul>
                <li >
                    <a className="dropdown-trigger" href="#" data-target="userInfo_dropdown">
                        {this.props.auth.firstName}
                        <i className="material-icons right">arrow_drop_down</i>
                    </a>
                </li>
            </>
        )
    }
    
}
function mapStateProps({auth}){
    return { auth }
}
export default connect(mapStateProps) (UserInfo);