import React, { Component } from 'react'
import {  connect } from 'react-redux'
import { fetchSurveys, deleteSurvey } from '../../actions'
import M from "materialize-css"
import * as alertify from 'alertifyjs'
//import * as actions from '../../actions'

class SurveyList extends Component {
    componentDidMount() {
        this.props.fetchSurveys({surveySent : true})
        //this.props.deleteSurvey()
        
    }
    // handleDismissToast(){
    //     alert("hanlde Dismis Toast");
    //     var toastElement = document.querySelector('.delete_toast');
    //     var toastInstance = M.Toast.getInstance(toastElement);
    //     toastInstance.dismiss();
    // }
    handleDeleteSurvey(surveyId){
        const { deleteSurvey } = this.props;
        alertify.confirm('Are you sure to delete this survey?', function (ev) {
            deleteSurvey({"surveyId" : surveyId, "surveySent": true})
            .then(success => {M.toast({html: '<i class="material-icons left">done</i> Survey Deleted Successfully', classes:'green'})})
            .catch(error => {
                M.toast({html: '<i class="material-icons left">cancel</i>'+ error.response.data.error, classes:'red'})
            })
        }, function(ev) {
            //alertify.alert("Cancel Button Clicked");        
        });
        // if (window.confirm('Are you sure to delete this survey?'))  
        //     this.props.deleteSurvey({"surveyId" : surveyId})
    }
    renderSurveys() {
        //to bring the latest, new survey to top we will use reverse function
        return this.props.surveys.filter(survey => survey.surveySent == true).reverse().map(survey => {
            return (
                <div className="card blue-grey lighten-4" key={survey._id} >
                    <div className="card-content text-white">
                        
                            <span className="card-title">{survey.title}</span>
                           
                        
                        <p>
                            {survey.body}
                        </p>
                        
                        <p className="right">
                            Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                        </p>
                        
                    </div>
                    <div className="card-action">
                        <a>Yes: {survey.yes}</a>
                        <a>No: {survey.no}</a>
                        <button onClick={()=> this.handleDeleteSurvey(survey._id)} 
                                className="right btn-floating btn-small red">
                            <i className="material-icons">delete</i>
                        </button>
                    </div>
                </div>
            )
        })
    }
    //as the date when coming back from mongo is not a date format anymore but a string, so we will format it to date again
    render() {
        return (
            <div>
                {this.renderSurveys()}
            </div>
        )
    }
}

// function mapStateToProps(state){
//     return { surveys: state.surveys }
// }
// - above is written as which is same
function mapStateToProps( { surveys }) {
    return { surveys }
}
export default connect(mapStateToProps, { fetchSurveys, deleteSurvey } ) (SurveyList)