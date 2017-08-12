import React, { Component } from 'react';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import axios from 'axios';
import { user_Enum } from '../../../EnumScript/GeneralEnumScript.js';
import EasyForm, { Field, FieldGroup } from 'react-easyform';
import TextInput from '../../Components/Forms/TextInput';
import DropDownList from '../../Components/Forms/DropDownList';


//編輯與檢視共用
class User_Delete extends Component {

  constructor(props) {
    super(props);
    this.state = {
      User: {},
    };

    this.GetData = this.GetData.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.Button_Submit = this.Button_Submit.bind(this);
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
      // console.log(result.data);
      self.setState({
        User: result.data
      });
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



  Button_Submit(event) {

    axios.post(`/api/User/Delete/${this.state.User.id}`, {
    }).then((result) => {

        if (result.data.success) {
          document.location.href = '/User'
        }
      }).catch((error) => {
        console.log(error)
      });

    event.preventDefault();
    return false;
  }


  render() {
    return (
      <div className="animated fadeIn row justify-content-center">
        <div className="col-sm-4">
          <div className="card">
            <div className="card-header">
              刪除會員
            </div>
            <div className="card-block">
              <form action="" method="post">
                <input type="hidden" id="id" name="id" value={this.state.User.id} />

                <TextInput name="userName"
                  labelName="角色名稱"
                  className=""
                  display={this.props.display_userName}
                  required={this.props.required_userName}
                  validMessage={{ required: 'userName is reduired.' }}
                  onChange={this.handleInputChange}
                  value={this.state.User.userName}
                  placeholder="userName"
                  readOnly={true} />



                <TextInput name="password"
                  labelName="角色名稱"
                  className=""
                  display={this.props.display_password}
                  required={this.props.required_password}
                  validMessage={{ required: 'password is reduired.' }}
                  onChange={this.handleInputChange}
                  value={this.state.User.password}
                  placeholder="password"
                  readOnly={true} />


                <TextInput name="email"
                  labelName="角色名稱"
                  className=""
                  display={this.props.display_email}
                  required={this.props.required_email}
                  validMessage={{ required: 'email is reduired.' }}
                  onChange={this.handleInputChange}
                  value={this.state.User.email}
                  placeholder="email"
                  readOnly={true} />




                <TextInput name="roleId"
                  labelName="角色名稱"
                  className=""
                  display={this.props.display_roleId}
                  required={this.props.required_roleId}
                  validMessage={{ required: 'roleId is reduired.' }}
                  onChange={this.handleInputChange}
                  value={this.state.User.roleId}
                  placeholder="roleId"
                  readOnly={true} />


                <TextInput name="firstName"
                  labelName="角色名稱"
                  className=""
                  display={this.props.display_firstName}
                  required={this.props.required_firstName}
                  validMessage={{ required: 'firstName is reduired.' }}
                  onChange={this.handleInputChange}
                  value={this.state.User.firstName}
                  placeholder="firstName"
                  readOnly={true} />


                <TextInput name="lastName"
                  labelName="角色名稱"
                  className=""
                  display={this.props.display_lastName}
                  required={this.props.required_lastName}
                  validMessage={{ required: 'lastName is reduired.' }}
                  onChange={this.handleInputChange}
                  value={this.state.User.lastName}
                  placeholder="lastName"
                  readOnly={true} />
                
                <DropDownList name="status"
                  labelName="狀態"
                  display={this.props.display_Status}
                  required={this.props.required_Status} 
                  validMessage={{required: 'Status is reduired.'}} 
                  onChange={this.handleInputChange} 
                  value={this.state.User.status}
                  readOnly={!this.state.is_Edit}
                  options={
                    [
                      {
                        name:user_Enum.STOP.name,
                        value:user_Enum.STOP.value
                      },
                      {
                        name:user_Enum.NORMAL.name,
                        value:user_Enum.NORMAL.value
                      }
                    ]}
                  />


                <TextInput name="createDate"
                  labelName="角色名稱"
                  className=""
                  display={this.props.display_createDate}
                  required={this.props.required_createDate}
                  validMessage={{ required: 'createDate is reduired.' }}
                  onChange={this.handleInputChange}
                  value={this.state.User.createDate}
                  placeholder="createDate"
                  readOnly={true} />





                <TextInput name="createUser"
                  labelName="角色名稱"
                  className=""
                  display={this.props.display_createUser}
                  required={this.props.required_createUser}
                  validMessage={{ required: 'createUser is reduired.' }}
                  onChange={this.handleInputChange}
                  value={this.state.User.createUser}
                  placeholder="createUser"
                  readOnly={true} />


                <div className="form-group form-actions">
                  <button type="botton" className="btn btn-sm btn-danger" onClick={this.Button_Submit}>確認刪除</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default EasyForm(User_Delete, 2);

User_Delete.defaultProps = {
  display_userName: true,
  display_password: true,
  display_roleId: true,
  display_firstName: true,
  display_lastName: true,
  display_createDate: true,
  display_createUser: true,

  required_userName: true,
  required_password: true,
  required_roleId: true,
  required_firstName: true,
  required_lastName: true,
  required_createDate: true,
  required_createUser: true,
}