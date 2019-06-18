import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchSessions} from '../../actions';

class SessionList extends React.Component {
    componentDidMount() {
        if(this.props.currentUserId)
            this.props.fetchSessions();
    }

    componentDidUpdate(prevProps) {
        if(!prevProps.currentUserId && this.props.currentUserId){
            this.props.fetchSessions();
        }
    }

    renderList() {
        return this.props.sessions.map(session => {
            return (
                <div className="column" key={session._id}>
                    <div className="ui link card">
                        <Link to={`/sessions/edit/${session._id}`} className="content">         
                            <div className="header">{session.title}</div>
                            <div className="meta">
                                <span className="category">{session.salary}</span>
                            </div>
                            <div className="description">
                                <p>{session.description}</p>
                            </div>
                        </Link>
                        <div className="extra content">
                            <div className="ui two buttons" >
                                <div onClick={() => {}} className="ui inverted green button">Add</div>
                                <div onClick={() => {}} className="ui inverted red button">Subtract</div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    }

    renderCreate(){
        return(
            <div style={{ textAlign: 'right'}}>
                <Link to="/sessions/new" className="ui button primary">
                    Create Session
                </Link>
            </div>
        );
    }

    render() {
        if(!this.props.currentUserId)
            return <div>Please Sign-In First</div>;
        else
            return (
                <div>
                    <div className="ui three column stackable grid container">{this.renderList()}</div>
                    <div style={{marginTop: 15}}>{this.renderCreate()}</div>
                </div>
            );
    }
}

const mapStateToProps = (state) => {
    return {
        currentUserId: state.auth.userId,
        sessions: Object.values(state.sessions)
    };
}

export default connect(mapStateToProps, {fetchSessions})(SessionList);