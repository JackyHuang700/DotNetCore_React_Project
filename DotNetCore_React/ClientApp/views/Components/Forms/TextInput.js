import React, {
    Component
} from 'react';
import InputError from './InputError';

export default class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEmpty: true,
            value: null,
            valid: false,
            errorMessage: "Input is invalid",
            errorVisible: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleChange(event) {
        //validate the field locally
        this.validation(event.target.value);

        //Call onChange method on the parent component for updating it's state
        //If saving this field for final form submission, it gets passed
        // up to the top component for sending to the server
        if (this.props.onChange) {
            this.props.onChange(event);
        }
    }

    validation(value, valid) {
        //The valid variable is optional, and true if not passed in:
        if (typeof valid === 'undefined') {
            valid = true;
        }

        var message = "";
        var errorVisible = false;

        //we know how to validate text fields based on information passed through props
        if (!valid) {
            //This happens when the user leaves the field, but it is not valid
            //(we do final validation in the parent component, then pass the result
            //here for display)
            message = this.props.errorMessage;
            valid = false;
            errorVisible = true;
        } else if (this.props.required && this.isEmptyObject(value)) {
            //this happens when we have a required field with no text entered
            //in this case, we want the "emptyMessage" error message
            message = this.props.emptyMessage;
            valid = false;
            errorVisible = true;
        } else if (value.length < this.props.minCharacters) {
            //This happens when the text entered is not the required length,
            //in which case we show the regular error message
            message = this.props.errorMessage;
            valid = false;
            errorVisible = true;
        }

        //setting the state will update the display,
        //causing the error message to display if there is one.
        this.setState({
            value: value,
            isEmpty: this.isEmptyObject(value),
            valid: valid,
            errorMessage: message,
            errorVisible: errorVisible
        });

    }

    isEmptyObject(obj){
      for(var n in obj){return false}
      return true;
    }

    handleBlur(event) {
        //Complete final validation from parent element when complete
        let validfunc = this.commonValidate;

        switch (this.props.validate) {
            case 'email':
                validfunc = this.validateEmail;
            case 'dollar':
                validfunc = this.validateDollars;
            default:
                validfunc = this.commonValidate;
        }

        var valid = validfunc(event.target.value);

        //pass the result to the local validation element for displaying the error
        this.validation(event.target.value, valid);
    }

    validateEmail(value) {
        // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(value);
    }

    validateDollars(value) {
        //will accept dollar amounts with two digits after the decimal or no decimal
        //will also accept a number with or without a dollar sign
        var regex = /^\$?[0-9]+(\.[0-9][0-9])?$/;
        return regex.test(value);
    }

    commonValidate() {
        //you could do something here that does general validation for any form field
        return true;
    }

    render() {
        return ( 
            <div className={this.props.uniqueName}>
                <input
                id={this.props.uniqueName}
                name={this.props.uniqueName}
                placeholder={this.props.text}
                className={'input input-' + this.props.uniqueName}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                value={this.state.value} />
            
                <InputError 
                visible={this.state.errorVisible} 
                errorMessage={this.state.errorMessage} />
            </div>
        )
    }

    defaultProps = {
        validate: ''
    }

}