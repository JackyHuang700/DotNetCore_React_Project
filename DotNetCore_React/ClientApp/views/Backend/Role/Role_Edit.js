import React, { Component } from 'react';
import { FormGroup, Label, Input, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import axios from 'axios';
import { role_Enum } from '../../../EnumScript/GeneralEnumScript.js';
import EasyForm, { Field, FieldGroup } from 'react-easyform';
import TextInput from '../../Components/Forms/TextInput';
import DropDownList from '../../Components/Forms/DropDownList';


//編輯與檢視共用
class Role_Edit_Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      is_Edit: this.props.match.params.edit.toLocaleLowerCase() === "true" ? true : false,
      Role: {},
    };
    // console.log(`this.props.match.params)`, this.props.match.params)

    this.GetData = this.GetData.bind(this);
    this.Button_Click = this.Button_Click.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    //

    this.Title = this.Title.bind(this);
    this.Bind_handleInputChange = this.Bind_handleInputChange.bind(this);
    this.Button_Submit = this.Button_Submit.bind(this);

  }


  componentDidMount() {
    this.GetData();
  }


  GetData() {
    const self = this;

    axios({
      url: `/api/Role/Get_Role?id=${this.props.match.params.id}`,
      method: 'GET',
      data: {
      }
    }).then((result) => {
      // console.log(result.data);
      self.setState({
        Role: result.data
      });
    }).catch((error) => {
      console.log(error)
    });

  }

  handleInputChange(event) {

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    var new_Role = Object.assign(this.state.Role);
    new_Role[name] = value;


    this.setState({
      Role: new_Role,
    });
  }


  Title() {
    return this.state.is_Edit ?
      "編輯角色" :
      "檢視角色";
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

      this.Button_Submit();
    }
    else {
      this.Button_BackUp();

    }

    event.preventDefault();
    return false;
  }


  Button_Submit(event) {

    axios({

      url: '/api/Role/Edit',
      method: 'post',
      data: this.state.Role
    }).then((result) => {

      if (result.data.success) {
        document.location.href = '/Role'
      }
    }).catch((error) => {
      console.log(error)
    });


    event.preventDefault();
    return false;
  }


  Button_BackUp(event) {
    document.location.href = '/Role';
  }

  render() {
    return (
      <div className="animated fadeIn row justify-content-center">
        <div className="col-sm-4">
          <div className="card">
            <div className="card-header">
              {this.Title()}
            </div>
            <div className="card-block">
              <form action="" method="post">
                <input type="hidden" id="id" name="id" value={this.state.Role.id} />

                <TextInput name="sysId"
                  labelName="角色名稱"
                  className=""
                  display={this.props.display_sysId}
                  required={this.props.required_sysId}
                  validMessage={{ required: 'sysId is reduired.' }}
                  onChange={this.Bind_handleInputChange}
                  value={this.state.Role.sysId}
                  placeholder="sysId"
                  readOnly={!this.state.is_Edit} />

                <TextInput name="name"
                  labelName="角色名稱"
                  className=""
                  display={this.props.display_name}
                  required={this.props.required_name}
                  validMessage={{ required: 'name is reduired.' }}
                  onChange={this.Bind_handleInputChange}
                  value={this.state.Role.name}
                  placeholder="name"
                  readOnly={!this.state.is_Edit} />

                <TextInput name="priority"
                  labelName="角色名稱"
                  className=""
                  display={this.props.display_priority}
                  required={this.props.required_priority}
                  validMessage={{ required: 'priority is reduired.' }}
                  onChange={this.Bind_handleInputChange}
                  value={this.state.Role.priority}
                  placeholder="priority"
                  readOnly={!this.state.is_Edit} />

                 <DropDownList name="status"
                  labelName="狀態"
                  display={this.props.display_Status}
                  required={this.props.required_Status} 
                  validMessage={{required: 'Status is reduired.'}} 
                  onChange={this.handleInputChange} 
                  value={this.state.Role.status}
                  readOnly={!this.state.is_Edit}
                  options={
                    [
                      {
                        name:role_Enum.STOP.name,
                        value:role_Enum.STOP.value
                      },
                      {
                        name:role_Enum.NORMAL.name,
                        value:role_Enum.NORMAL.value
                      }
                    ]}
                  />

                <TextInput name="createDate"
                  labelName="角色名稱"
                  className=""
                  display={this.props.display_createDate}
                  required={this.props.required_createDate}
                  validMessage={{ required: 'createDate is reduired.' }}
                  onChange={this.Bind_handleInputChange}
                  value={this.state.Role.createDate}
                  placeholder="createDate"
                  readOnly={!this.state.is_Edit} />


                <TextInput name="createUser"
                  labelName="角色名稱"
                  className=""
                  display={this.props.display_createUser}
                  required={this.props.required_createUser}
                  validMessage={{ required: 'createUser is reduired.' }}
                  onChange={this.Bind_handleInputChange}
                  value={this.state.Role.createUser}
                  placeholder="createUser"
                  readOnly={!this.state.is_Edit} />

                <div className="form-group form-actions">
                  <button type="botton" className="btn btn-sm btn-default" onClick={this.Button_Click} >{this.Button_Text()}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default EasyForm(Role_Edit_Show, 2);


Role_Edit_Show.defaultProps = {
  display_sysId: true,
  display_name: true,
  display_priority: true,
  display_status     : true,
  display_createDate: true,
  display_createUser: true,

  required_sysId: true,
  required_name: true,
  required_priority: true,
  required_status     : true,
  required_createDate: true,
  required_createUser: true,
}