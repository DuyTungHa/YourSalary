import React from 'react';
import { Field, reduxForm } from 'redux-form';

class ProfileForm extends React.Component{
    renderError({error, touched}) {
        if(touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    renderInput = ({input, label, meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error':''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input}/>
                {this.renderError(meta)}
            </div>
        )
    }

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    }

    render() {
        return (
            <form onSubmit ={this.props.handleSubmit(this.onSubmit)} className="ui form error">      
                <Field name="profession" component={this.renderInput} label="Profession"/>
                <Field name="currency" component={this.renderInput} label="Currency"/>
                <button className="ui button primary" style={{float: 'right'}}>Save</button>
            </form>
        );
    }
}

const validate = formValues => {
    const errors = {};
    if(!formValues.profession){
        errors.profession='You must provide a profession';
    }
    if(!formValues.currency){
        errors.currency='You must provide a currency';
    }
    return errors;
}

export default reduxForm({
    form: 'profileForm',
    validate
})(ProfileForm);