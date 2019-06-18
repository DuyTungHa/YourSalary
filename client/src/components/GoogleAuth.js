import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {signIn, signOut} from '../actions';

class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '57079285349-ls3a0g5o1oo3snj0iu2o3nav2moadfts.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton(){
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <>
                    <Link to="/" className="item">
                            Profile
                    </Link>
                    <div className="item">
                        <button onClick={this.onSignOutClick} className="ui red google button">
                            <i className="google icon"/>
                                Sign Out
                        </button>
                    </div>
                </>
            )
        } else {
            return (
                <div className="item">
                    <button onClick={this.onSignInClick} className="ui red google button">
                        <i className="google icon"/>
                        Sign In with Google
                    </button>
                </div>
            );
        }
    }

    render() {
        return (
            <>
                {this.renderAuthButton()}
            </>);
    }
}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);