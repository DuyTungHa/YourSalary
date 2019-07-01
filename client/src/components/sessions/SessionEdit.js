import _ from 'lodash';
import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchSession, editSession} from '../../actions';
import SessionForm from './SessionForm';
import Loader from '../utils/Loader';
import history from '../../history';

class SessionEdit extends React.Component {
    componentDidMount() {
        if(this.props.currentUserId)
            this.props.fetchSession(this.props.match.params.id);
    }

    componentDidUpdate(prevProps) {
        if(this.props.isSignedIn === false)
            history.push('/error');
        if(!prevProps.currentUserId && this.props.currentUserId){
            this.props.fetchSession(this.props.match.params.id);
        }
    }

    onSubmit = (formValues) => {
        this.props.editSession(this.props.match.params.id, formValues);
    }
    
    render(){
        if(!this.props.session) {
            return <div><Loader/></div>
        }
        return (
            <div>
                <Link 
                    to={`/sessions/delete/${this.props.session._id}`} 
                    style={{float: "right"}} 
                    className="negative ui button">
                        Delete This Session
                </Link>
                <h3>Edit Your Session</h3>
                <SessionForm
                    initialValues={_.pick(this.props.session, 'title', 'description', 'salary', 'startDate', 'endDate')}
                    onSubmit={this.onSubmit}
                />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isSignedIn: state.auth.isSignedIn,
        currentUserId: state.auth.userId,
        session: state.sessions[ownProps.match.params.id]
    };
}

export default connect(mapStateToProps, {fetchSession, editSession})(SessionEdit);