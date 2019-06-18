import React from 'react';
import { Field, reduxForm } from 'redux-form';

class SessionForm extends React.Component {
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
        const className = `field ${meta.error && meta.touched ? 'error': ''}`
        return (
            <div className={className}>
                <label>{label}</label>
                <textarea rows="2" {...input}/>
                {this.renderError(meta)}
            </div>
        )
    }

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" component={this.renderInput} label="Title"/>
                <Field name="description" component={this.renderInput} label="Description"/>
                <Field name="salary" component={this.renderInput} label="Salary"/>
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = formValues => {
    const errors = {};
    if (!formValues.title) {
        errors.title='You must provide a title';
    }
    if(!formValues.description) {
        errors.description='You must provide a description';
    }
    if(isNaN(formValues.salary)) {
        errors.salary='Salary must be a number';
    }
    return errors;
}

export default reduxForm({
    form: 'sessionForm',
    validate
})(SessionForm);