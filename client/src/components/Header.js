import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from '../GoogleAuth';

const Header = () => {
    return (
        <div className="ui top fixed inverted menu">
            <div className="ui container">
                <Link to="/" className="header item">
                    <img className="logo" src={require('../logo.png')} alt="logo"/>
                </Link>
                <div className="right menu">
                    <Link to="/" className="item">
                        All Sessions
                    </Link>
                    <GoogleAuth/>
                </div>
            </div>
        </div>
    )
}

export default Header;