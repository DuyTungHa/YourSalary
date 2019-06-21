import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../utils/Model';
import Loader from '../utils/Loader';
import history from '../../history';
import {fetchSession, deleteSession} from '../../actions';

class SessionDelete extends React.Component{
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

    renderActions(){
        const {id} = this.props.match.params;
        return (
            <>
                <button onClick={() => {this.props.deleteSession(id)}} className="ui button negative">Delete</button>
                <Link to="/" className="ui button">Cancel</Link>
            </>
        );
    }

    renderContent() {
        if(!this.props.session) {
            return 'Are you sure you want to delete this session?'
        }
        return `Are you sure you want to delete the session with title: ${this.props.session.title}?`;
    }

    render(){
        if(!this.props.currentUserId)
            return <Loader/>;
        return (
            <>
                <Modal
                    title="Delete Session"
                    content={this.renderContent()}
                    actions= {this.renderActions()}
                    onDismiss={() => {history.push('/')}}
                />
            </>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isSignedIn: state.auth.isSignedIn,
        currentUserId: state.auth.userId,
        session: state.sessions[ownProps.match.params.id]
    };
}

export default  connect(mapStateToProps, {fetchSession, deleteSession})(SessionDelete);