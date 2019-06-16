import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class SessionList extends React.Component {
    renderCreate(){
        if(this.props.isSignedIn){
            return(
                <div style={{ textAlign: 'right'}}>
                    <Link to="/sessions/new" className="ui button primary">
                        Create Session
                    </Link>
                </div>
            );
        } else {
            return <div>SessionList</div>
        }
    }

    render() {
        return <div style={{marginTop: 80}}>{this.renderCreate()}</div>
    }
}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn,
        currentUserId: state.auth.userId
    };
}

export default connect(mapStateToProps)(SessionList);