import React from 'react';

const Footer = () => {
    return (
        <div className="ui inverted vertical footer segment">
            <div className="ui center aligned container">
                <img src={require('../assets/logo.jpg')} className="ui centered tiny image" alt="logo"/>
                <div className="ui horizontal inverted small divided link list">
                    <div className="item">
                        © 2019 DuyTungHa
                    </div>
                    <a className="item" href="mailto:duytungha.dev@gmail.com">
                        Say Hello
                    </a>
                    <a className="item" href="https://github.com/DuyTungHa/YourSalary">
                        <img src={require('../assets/github.jpg')} alt="Git Repository" width={25} height={25}/>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Footer;