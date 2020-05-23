// this file would handle all payment related stuff
// you can name it like stripe wraper etc

import React, { Component } from  'react'
import M from "materialize-css"
import { connect } from 'react-redux'
import { fetchSurveys, deleteSurvey, fetchSurvey } from '../../actions'
import { withRouter } from 'react-router-dom'

class SavedSurveys extends Component{
    componentDidMount() {
        this.props.fetchSurveys({surveySent : false})

        const options = {
            // onOpenStart: () => {console.log("Open Start");},
            // onOpenEnd: () => {console.log("Open End");},
            // onCloseStart: () => {console.log("Close Start");},
            // onCloseEnd: () => {console.log("Close End");},
            inDuration: 250,
            outDuration: 250,
            opacity: 0.5,
            dismissible: false,
            startingTop: "4%",
            endingTop: "10%"
          };
        var element = document.querySelector('.modal');
        M.Modal.init(element, options);
                
    }
    renderSurveys() {
        //to bring the latest, new survey to top we will use reverse function
        return this.props.surveys.reverse().map(survey => {
            return (
                <div className="card light-green lighten-3" key={survey._id} >
                    <div className="card-content text-white">
                            <span className="card-title">{survey.title}</span>
                        <p>
                            {survey.body}
                        </p>
                        
                    </div>
                    <div className="card-action">
                    <span className="">
                            Saved On: {new Date(survey.dateSent).toLocaleDateString()}
                        <button onClick={(e) =>  {if (window.confirm('Are you sure to delete this survey?'))  this.props.deleteSurvey({"surveyId" : survey._id}) } } 
                                className="right btn-floating btn-small red">
                            <i className="material-icons">delete</i>
                        </button>
                        <a onClick={(e) =>  {console.log("Survey Selected is : surveyId:"+ survey._id);this.props.fetchSurvey({"surveyId": survey._id}, this.props.history)} } 
                                className="right modal-close btn-floating btn-small green" style={{ margin: '0 10px' }}>
                            <i className="material-icons">check_box</i>
                        </a>
                        </span>
                    </div>
                </div>
            )
        })
    }
    render(){
        //debugger;
        return(
            <>  
                <div id="surveysModal" className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="left">Saved Surveys</h4>
                            <div className="right">
                                <a href="#!" className="modal-close waves-effect waves-green red btn-flat white-text ">Cancel</a>
                            </div>                          
                        </div>
                        <div className="modal-body">
                            {this.renderSurveys()}
                        </div>
                    </div>
                </div>
                <button type="button" data-target="surveysModal" onClick={() => {this.setState({ loadSurvey: false })}}
                            className="modal-trigger green btn btn-flat white-text right" style={{ margin: '0 10px' }}>                        
                    Saved Surveys
                    <i className="material-icons right">list</i>
                </button>
            </>
        )
    }
    
}
function mapStateToProps( { surveys }) {
    return { surveys }
}
export default connect(mapStateToProps, { fetchSurveys, deleteSurvey, fetchSurvey }) (withRouter(SavedSurveys))