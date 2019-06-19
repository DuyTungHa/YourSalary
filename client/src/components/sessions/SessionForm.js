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

    renderInput = ({input, label, meta, rows}) => {
        const className = `field ${meta.error && meta.touched ? 'error': ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <textarea rows={rows} {...input}/>
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
                <Field name="title" component={this.renderInput} label="Title" rows={1}/>
                <Field name="description" component={this.renderInput} label="Description" rows={2}/>
                <Field name="salary" component={this.renderInput} label="Salary" rows={1}/>
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
    if(!formValues.salary) {
        errors.salary='You must provide a salary';
    }
    if(isNaN(formValues.salary) || formValues.salary < 0) {
        errors.salary='Salary must be a positive number';  
    }  
    return errors;
}

export default reduxForm({
    form: 'sessionForm',
    validate
})(SessionForm);