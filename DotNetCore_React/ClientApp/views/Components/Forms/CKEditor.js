import React, { Component } from 'react';
import { Input, FormGroup } from 'reactstrap';
import EasyForm, { Field, FieldGroup } from 'react-easyform';

export default class CKEditor extends Component {

    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount() {
        let configuration = {
          toolbar: "Basic"
        };
        CKEDITOR.replace(this.props.name, configuration);
        CKEDITOR.instances.editor.on('change', function () {
          let data = CKEDITOR.instances.editor.getData();
          this.props.onChange(data);
        }.bind(this));
      }


    render() {
        const myProps = Object.assign({},this.props);
        delete myProps.labelName;

        let baseField = <Field {...myProps} />
        baseField = React.cloneElement(baseField,{
            id:this.props.name
        });

        if (!this.props.display) {
            return (<div></div>)
        }

        return ( <FormGroup>
                <label style = {{ color: this.props.required && 'red' }} > { this.props.labelName } { this.props.required && '*' } </label> 
                { baseField } 
        </FormGroup>)
    }
}

CKEditor.defaultProps = {
    display: true,
    type: 'textarea',
    className: '',
    validMessage: null
}



