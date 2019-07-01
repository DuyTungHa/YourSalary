import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';

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

    renderDateTimePicker = ({input, label, meta}) => {
        const className = `field ${meta.error & meta.touched ? 'error': ''}`;
        return (
            <div className={className}>
                <TextField
                    label={label}
                    id="datetime-local"
                    type="datetime-local"
                    InputLabelProps={{shrink: true}}
                    error={meta.touched && meta.invalid}
                    helperText={meta.touched && meta.error}
                    {...input}
                />
            </div>
        );
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
                <Field name="startDate" component={this.renderDateTimePicker} label="Start Date"/>
                <Field name="endDate" component={this.renderDateTimePicker} label="End Date"/>
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
    if(!formValues.startDate) {
        errors.startDate = 'You must provide a start date';
    }
    if(!formValues.endDate) {
        errors.endDate = 'You must provide an end date';
    }
    if(formValues.startDate > formValues.endDate) {
        errors.startDate = 'Start date must be earlier than end date';
        errors.endDate = 'Start date must be earlier than end date';
    }
    return errors;
}

export default reduxForm({
    form: 'sessionForm',
    validate
})(SessionForm);