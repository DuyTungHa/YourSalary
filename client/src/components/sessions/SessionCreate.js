import React from 'react';
import { connect } from 'react-redux';
import { createSession } from '../../actions';
import SessionForm from './SessionForm';
import Loader from '../utils/Loader';
import history from '../../history';

class SessionCreate extends React.Component {
    componentDidUpdate() {
        if(this.props.isSignedIn === false)
            history.push('/error');
    }
    
    onSubmit = (formValues) => {
        this.props.createSession(formValues);
    }

    render(){
        if(!this.props.currentUserId)
            return <Loader/>
        return (
            <div>
                <h3>New Session</h3>
                <SessionForm onSubmit={this.onSubmit}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return  {
        isSignedIn: state.auth.isSignedIn,
        currentUserId: state.auth.userId
    };
}

export default connect(mapStateToProps, {createSession})(SessionCreate);