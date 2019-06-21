import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../utils/Model';
import Loader from '../utils/Loader';
import history from '../../history';
import {resetSalary} from '../../actions';

class ResetSalary extends React.Component{

    componentDidUpdate() {
        if(this.props.isSignedIn === false)
            history.push('/error');
    }

    renderActions(){
        return (
            <>
                <button onClick={() => {this.props.resetSalary()}} className="ui button negative">Reset</button>
                <Link to="/" className="ui button">Cancel</Link>
            </>
        );
    }

    render(){
        if(!this.props.currentUserId)
            return <Loader/>;
        return (
            <>
                <Modal
                    title="Reset Salary"
                    content="Your salary will become 0. Are you sure you want to reset your salary?"
                    actions= {this.renderActions()}
                    onDismiss={() => {history.push('/')}}
                />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn,
        currentUserId: state.auth.userId
    };
}

export default  connect(mapStateToProps, {resetSalary})(ResetSalary);

