import React, { Component } from 'react';
import { Input, FormGroup } from 'reactstrap';
import EasyForm, { Field, FieldGroup } from 'react-easyform';

export default class TextInput extends Component {

  constructor(props) {
    super(props);
  }

  render(){
        let baseField = 
        <Field 
            type={this.props.type}
            id={this.props.name}
            name={this.props.name}
            className={this.props.className}
            onChange={this.props.onChange} 
            defaultValue={this.props.defaultValue} 
            placeholder={this.props.placeholder} />
            
        if(this.props.required){
            baseField = React.cloneElement(baseField,{
                required:'required',
                validMessage:this.props.validMessage
            });
        }

        if(this.props.pattern){
            baseField = React.cloneElement(baseField,{
                pattern:this.props.pattern
            });
        }

        if(this.props.confirm){
            baseField = React.cloneElement(baseField,{
                confirm:this.props.confirm
            });
        }

        if(this.props.minLength){
            baseField = React.cloneElement(baseField,{
                minLength:this.props.minLength
            });
        }

        if(this.props.maxLength){
            baseField = React.cloneElement(baseField,{
                maxLength:this.props.maxLength
            });
        }

        if(this.props.min){
            baseField = React.cloneElement(baseField,{
                min:this.props.min
            });
        }

        if(this.props.max){
            baseField = React.cloneElement(baseField,{
                max:this.props.max
            });
        }

        if(!this.props.display){
            return (<div></div>)
        }

        return(<FormGroup>
            <label style={{color:this.props.required && 'red'}}>{this.props.labelName} {this.props.required && '*'}</label>
                    {baseField}
            </FormGroup>)        
  }
}

TextInput.defaultProps = {
      display:true,
      type:'text',
      className:'',
      validMessage:null
}