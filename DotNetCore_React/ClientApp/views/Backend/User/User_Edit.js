import React, { Component } from 'react';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import axios from 'axios';
import EasyForm, { Field, FieldGroup } from 'react-easyform';
import { user_Enum } from '../../../EnumScript/GeneralEnumScript.js';
import history from '../../../history'

import TextInput from '../../Components/Forms/TextInput';

import DropDownList from '../../Components/Forms/DropDownList';

//編輯與檢視共用
class User_Edit_Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      is_Edit: this.props.match.params.edit.toLocaleLowerCase() === "true" ? true : false,
      User: {},
      RoleList: [],
    };

    this.GetData = this.GetData.bind(this);
    this.Button_Click = this.Button_Click.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    //

    this.Title = this.Title.bind(this);
    this.Bind_handleInputChange = this.Bind_handleInputChange.bind(this);
    this.Button_Submit = this.Button_Submit.bind(this);
    this.Is_Show_Password = this.Is_Show_Password.bind(this);

  }


  componentDidMount() {
    this.GetData();
  }


  GetData() {
    const self = this;

    axios({
      url: `/api/User/Get_User?id=${this.props.match.params.id}`,
      method: 'GET',
      data: {
      }
    }).then((result) => {
      self.setState({
        User: result.data
      });
    }).catch((error) => {
      console.log(error)
    });


    //抓取角色權限
    axios({
      url: `/api/Role/Role_View`,
      method: 'GET',
      data: {
      }
    }).then((result) => {
      var a = [];
      result.data.map((c) => {
        a.push({
          name: c.name,
          value: c.id
        });
      });

      this.setState({ RoleList: a });
    }).catch((error) => {
      console.log(error)
    });
  }

  handleInputChange(event) {

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    var new_User = Object.assign(this.state.User);
    new_User[name] = value;


    this.setState({
      User: new_User,
    });
  }


  Title() {
    return this.state.is_Edit ?
      "編輯會員" :
      "檢視會員";
  }

  Bind_handleInputChange(event) {
    return this.state.is_Edit ?
      this.handleInputChange(event) :
      null;
  }


  //按鈕觸發事件
  Button_Text() {
    return this.state.is_Edit ?
      "編輯完成" :
      "返回";
  }


  //按鈕觸發事件
  Button_Click(event) {
    if (this.state.is_Edit) {

      this.Button_Submit(event);
    }
    else {
      this.Button_BackUp(event);

    }

    event.preventDefault();
    return false;
  }

  /**
  * 編輯
  */
  Button_Submit(event) {
    event.preventDefault();
    axios({
      url: '/api/User/Edit',
      method: 'post',
      data: this.state.User
    }).then((result) => {
      if (result.data.success) {
        history.push('/User');
      }
    }).catch((error) => {
      console.log(error)
    });
    return false;
  }

  /**
  * 返回
  */
  Button_BackUp(event) {
    history.push('/User');
  }

  Is_Show_Password() {

    return this.state.is_Edit ?
      (<TextInput name="password"
        labelName="角色名稱"
        className=""
        display={this.props.display_password}
        required={this.props.required_password}
        validMessage={{ required: 'password is reduired.' }}
        onInput={this.Bind_handleInputChange}
        value={this.state.User.password}
        placeholder="password"
        readOnly={!this.state.is_Edit} />) :
      null;
  }

  render() {

    const { params } = this.props.params;
    const { $invalid } = this.props.easyform.$invalid;

    return (
      <div className="animated fadeIn row justify-content-center">
        <div className="col-sm-6">
          <div className="card">
            <div className="card-header">
              {this.Title()}
            </div>
            <div className="card-block">
            <form className="" onSubmit={this.Button_Submit}>

                <TextInput name="userName"
                  labelName="角色名稱"
                  className=""
                  display={this.props.display_userName}
                  required={this.props.required_userName}
                  validMessage={{ required: 'userName is reduired.' }}
                  onInput={this.Bind_handleInputChange}
                  value={this.state.User.userName}
                  placeholder="userName"
                  readOnly={!this.state.is_Edit} />


                {this.Is_Show_Password()}

                <TextInput name="email"
                  labelName="角色名稱"
                  className=""
                  display={this.props.display_email}
                  required={this.props.required_email}
                  validMessage={{ required: 'email is reduired.' }}
                  onInput={this.Bind_handleInputChange}
                  value={this.state.User.email}
                  placeholder="email"
                  readOnly={!this.state.is_Edit} />


                <DropDownList name="roleId"
                  labelName="狀態"
                  display={this.props.display_roleId}
                  required={this.props.required_roleId}
                  validMessage={{ required: 'roleId is reduired.' }}
                  onInput={this.Bind_handleInputChange}
                  value={this.state.User.roleId}
                  readOnly={!this.state.is_Edit}
                  options={this.state.RoleList}
                />



                <TextInput name="firstName"
                  labelName="角色名稱"
                  className=""
                  display={this.props.display_firstName}
                  required={this.props.required_firstName}
                  validMessage={{ required: 'firstName is reduired.' }}
                  onInput={this.Bind_handleInputChange}
                  value={this.state.User.firstName}
                  placeholder="firstName"
                  readOnly={!this.state.is_Edit} />

                <TextInput name="lastName"
                  labelName="角色名稱"
                  className=""
                  display={this.props.display_lastName}
                  required={this.props.required_lastName}
                  validMessage={{ required: 'lastName is reduired.' }}
                  onInput={this.Bind_handleInputChange}
                  value={this.state.User.lastName}
                  placeholder="lastName"
                  readOnly={!this.state.is_Edit} />

                <DropDownList name="status"
                  labelName="狀態"
                  display={this.props.display_status}
                  required={this.props.required_status}
                  validMessage={{ required: 'status is reduired.' }}
                  onInput={this.Bind_handleInputChange}
                  value={this.state.User.status}
                  readOnly={!this.state.is_Edit}
                  options={
                    [
                      {
                        name: user_Enum.STOP.name,
                        value: user_Enum.STOP.value
                      },
                      {
                        name: user_Enum.NORMAL.name,
                        value: user_Enum.NORMAL.value
                      },
                      {
                        name: user_Enum.EMAIL_NO_VAILD.name,
                        value: user_Enum.EMAIL_NO_VAILD.value
                      },
                      {
                        name: user_Enum.FIRST_PASSWORD_UNCHANGE.name,
                        value: user_Enum.FIRST_PASSWORD_UNCHANGE.value
                      },
                      {
                        name: user_Enum.ERROR_COUNT.name,
                        value: user_Enum.ERROR_COUNT.value
                      }
                    ]}
                />

                <TextInput name="createDate"
                  labelName="角色名稱"
                  className=""
                  display={this.props.display_createDate}
                  required={this.props.required_createDate}
                  validMessage={{ required: 'createDate is reduired.' }}
                  onInput={this.Bind_handleInputChange}
                  value={this.state.User.createDate}
                  placeholder="createDate"
                  readOnly={!this.state.is_Edit} />


                <TextInput name="createUser"
                  labelName="角色名稱"
                  className=""
                  display={this.props.display_createUser}
                  required={this.props.required_createUser}
                  validMessage={{ required: 'createUser is reduired.' }}
                  onInput={this.Bind_handleInputChange}
                  value={this.state.User.createUser}
                  placeholder="createUser"
                  readOnly={!this.state.is_Edit} />



                <div className="form-group form-actions">
                  <Button color="primary" disabled={$invalid ? 'disabled' : false} >{this.Button_Text()}</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default EasyForm(User_Edit_Show, 2);


User_Edit_Show.defaultProps = {
  display_userName: true,
  display_password: true,
  display_roleId: true,
  display_email: true,
  display_firstName: true,
  display_lastName: true,
  display_status     : true,
  display_createDate: true,
  display_createUser: true,


  required_userName: true,
  required_password: true,

  required_roleId: true,
  required_email: true,
  required_firstName: true,
  required_lastName: true,
  required_status     : true,
  required_createDate: true,
  required_createUser: true,
}