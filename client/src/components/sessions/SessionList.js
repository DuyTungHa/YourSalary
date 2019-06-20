import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchSessions, fetchProfile, addSalary, subtSalary} from '../../actions';
import About from '../utils/About';
import history from '../../history';

class SessionList extends React.Component {
    componentDidMount() {
        if(this.props.currentUserId) {
            this.props.fetchSessions();
            this.props.fetchProfile();
        }
    }

    componentDidUpdate(prevProps) {
        if(!prevProps.currentUserId && this.props.currentUserId){
            this.props.fetchSessions();
            this.props.fetchProfile();
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
                                <div onClick={() => {this.props.addSalary(session._id)}} className="ui inverted green button">Add</div>
                                <div onClick={() => {this.props.subtSalary(session._id)}} className="ui inverted red button">Subtract</div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    }

    renderSalary(){
        if(!this.props.salary && this.props.salary !== 0)
            return null;
        return(
            <div className="ui two column stackable grid" style={{ marginBottom: 15, marginTop: 15 }}>
                <div className="fourteen wide column"><h2 className="ui header">{`Your Salary: ${this.props.salary} ${this.props.currency}`}</h2></div>
                <button onClick={() => {history.push('/resetSalary')}} className="negative ui button" style={{textAlign: 'right', marginBottom: 15, marginLeft: 10}}>Reset Salary</button>
            </div>
        );
    }

    renderCreate(){
        return(
            <div style={{ textAlign: 'right', marginTop: 15, marginBottom: 15}}>
                <Link to="/sessions/new" className="ui button primary">
                    Create Session
                </Link>
            </div>
        );
    }

    render() {
        if(!this.props.currentUserId)
            return <About/>;
        else
            return (
                <div>
                    <div>{this.renderSalary()}</div>
                    <div className="ui three column stackable grid container">{this.renderList()}</div>
                    <div style={{marginTop: 15}}>{this.renderCreate()}</div>
                </div>
            );
    }
}

const mapStateToProps = (state) => {
    return {
        currentUserId: state.auth.userId,
        sessions: Object.values(state.sessions),
        salary: state.profile.sumSalary,
        currency: state.profile.currency
    };
}

export default connect(mapStateToProps, {
    fetchSessions, 
    fetchProfile, 
    addSalary, 
    subtSalary
})(SessionList);