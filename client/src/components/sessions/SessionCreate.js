import React from 'react';
import { connect } from 'react-redux';
import { createSession } from '../../actions';
import SessionForm from './SessionForm';

class SessionCreate extends React.Component {
    onSubmit = (formValues) => {
        this.props.createSession(formValues);
    }

    render(){
        return (
            <div>
                <h3>New Session</h3>
                <SessionForm onSubmit={this.onSubmit}/>
            </div>
        );
    }
}

export default connect(null, {createSession})(SessionCreate);