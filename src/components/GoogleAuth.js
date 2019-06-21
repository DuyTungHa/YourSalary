import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {signIn, signOut, fetchProfileGoogle} from '../actions';
import history from '../history';

class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: process.env.CLIENT_ID,
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
            const googleUser = this.auth.currentUser.get().getBasicProfile();
            this.props.signIn(googleUser.getId());
            this.props.fetchProfileGoogle({
                name: googleUser.getName(),
                email: googleUser.getEmail(),
                image: googleUser.getImageUrl()
            });
        } else {
            this.props.signOut();
        }
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
        history.push('/');
    }

    renderAuthButton(){
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <>
                    <Link to='/profile' className="item">
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

export default connect(mapStateToProps, {signIn, signOut, fetchProfileGoogle})(GoogleAuth);