import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import ProfileForm from './ProfileForm';
import Loader from '../utils/Loader';
import {fetchProfile, editProfile} from '../../actions';

class Profile extends React.Component{
    componentDidMount() {
        if(this.props.currentUserId)
            this.props.fetchProfile(this.props.location.state);
    }

    componentDidUpdate(prevProps) {
        if(!prevProps.currentUserId && this.props.currentUserId){
            this.props.fetchProfile(this.props.location.state);
        }
    }

    onSubmit = (formValues) => {
        this.props.editProfile(formValues);
    }

    render() {
        if(!this.props.profile.name || !this.props.profile.profession)
            return <div><Loader/></div>;
        const {name, image, email, sumSalary, currency} = this.props.profile;
        return (
            <div>
                <h1 style={{textAlign: 'center'}}>Your Profile</h1>
                <div className="ui stackable cards">
                    <div className="ui centered card">
                        <div className="image">
                            <img src={image} alt="profile"/>
                        </div>
                        <div className="content">
                            <div className="header">{name}</div>
                            <div className="meta">
                                <span className="date">{email}</span>
                            </div>
                            <div className="description">
                                <div>{`Your salary: ${sumSalary} ${currency}`}</div>
                            </div>
                        </div>
                        <div className="extra content">
                            <ProfileForm
                                initialValues={_.pick(this.props.profile, 'profession', 'currency')}    
                                onSubmit={this.onSubmit}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const maptStateToProps = (state) => {
    return {
        currentUserId: state.auth.userId,
        profile: state.profile
    };
}

export default connect(maptStateToProps, {fetchProfile, editProfile})(Profile);