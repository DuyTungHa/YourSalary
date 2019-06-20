import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

const Header = () => {
    return (
        <div className="ui top inverted stackable menu">
            <div className="ui container">
                <Link to="/" className="item">
                    <label className="ui big green label">YourSalary</label>
                </Link>
                <div className="right menu">
                    <Link to="/" className="item">
                        Home
                    </Link>
                    <GoogleAuth/>
                </div>
            </div>
        </div>
    )
}

export default Header;