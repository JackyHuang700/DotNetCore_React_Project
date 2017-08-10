import React, { Component } from 'react';
import { Alert } from 'reactstrap';

export default class InputError extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: 'Input is invalid'
        };
    }

  render(){
    return (
       <div>
         {
           this.props.visible &&
           <Alert color="warning">{this.props.errorMessage}</Alert>
         }
       </div>
    )
  }

  defaultProps = {
    visible : false
  }
}