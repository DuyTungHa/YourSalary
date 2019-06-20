import React from 'react';

const NotFound = () => {
    return (
        <div style={{marginBottom: 15}}>
            <img className="ui fluid rounded image" alt="Error 404" src={require('../../assets/errorPage.jpg')}/>
        </div>
    );
};

export default NotFound;