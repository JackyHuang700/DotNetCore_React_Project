import React, { Component } from 'react';
import { FormGroup, Label, Input, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import EasyForm, { Field, FieldGroup } from 'react-easyform';
import TextInput from '../../Components/Forms/TextInput';

import axios from 'axios';
import history from '../../../history'


class Personal_Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            User: {},
        };

        this.GetData = this.GetData.bind(this);        
    }


    componentDidMount() {
        this.GetData();
    }


    GetData() {
        const self = this;

        // axios({
        //   url: `/api/Role/Get_Role?id=${this.props.match.params.id}`,
        //   method: 'GET',
        //   data: {
        //   }
        // }).then((result) => {
        //   self.setState({
        //     Role: result.data
        //   });
        // }).catch((error) => {
        //   console.log(error)
        // });

    }


    render() {

        const { params } = this.props.params;
        const { $invalid } = this.props.easyform.$invalid;

        return (
            <div className="animated fadeIn row justify-content-center">
                <div className="col-sm-4">
                    <div className="card">
                        <div className="card-header">
                            {this.Title()}
                        </div>
                        <div className="card-block">
                            <form className="" onSubmit={this.Submit}>
                                <input type="hidden" id="id" name="id" value={this.state.User.id} />

                                <TextInput name="userName"
                                    labelName="角色名稱"
                                    className=""
                                    display={this.props.display_userName}
                                    required={this.props.required_userName}
                                    validMessage={{ required: 'userName is reduired.' }}
                                    onInput={this.Bind_handleInputChange}
                                    value={this.state.User.userName}
                                    placeholder="userName"
                                    readOnly={true} />

                                <TextInput name="password"
                                    labelName="角色名稱"
                                    className=""
                                    display={this.props.display_password}
                                    required={this.props.required_password}
                                    validMessage={{ required: 'password is reduired.' }}
                                    onInput={this.Bind_handleInputChange}
                                    value={this.state.User.password}
                                    placeholder="password" />

                                {/* 判斷Email格式 */}
                                <TextInput name="email"
                                    labelName="角色名稱"
                                    className=""
                                    display={this.props.display_email}
                                    required={this.props.required_email}
                                    validMessage={{ required: 'email is reduired.' }}
                                    onInput={this.Bind_handleInputChange}
                                    value={this.state.User.email}
                                    placeholder="email" />

                                <TextInput name="firstName"
                                    labelName="角色名稱"
                                    className=""
                                    display={this.props.display_firstName}
                                    required={this.props.required_firstName}
                                    validMessage={{ required: 'firstName is reduired.' }}
                                    onInput={this.Bind_handleInputChange}
                                    value={this.state.User.firstName}
                                    placeholder="firstName" />

                                <TextInput name="lastName"
                                    labelName="角色名稱"
                                    className=""
                                    display={this.props.display_lastName}
                                    required={this.props.required_lastName}
                                    validMessage={{ required: 'lastName is reduired.' }}
                                    onInput={this.Bind_handleInputChange}
                                    value={this.state.User.lastName}
                                    placeholder="lastName" />



                                <div className="form-group form-actions">
                                    <Button color="primary" disabled={$invalid ? 'disabled' : false}>編輯完成</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EasyForm(Personal_Edit, 2);


Personal_Edit.defaultProps = {
    display_userName: true,
    display_password: true,
    display_email: true,
    display_firstName: true,
    display_lastName: true,


    //..
    required_userName: true,
    required_password: true,
    required_email: true,
    required_firstName: true,
    required_lastName: true,

}












//   userName
//   password
//   email
//   firstName
//   lastName