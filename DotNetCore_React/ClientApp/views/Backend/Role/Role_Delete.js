import React, { Component } from 'react';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import axios from 'axios';

import EasyForm, { Field, FieldGroup } from 'react-easyform';
import TextInput from '../../Components/Forms/TextInput';


//編輯與檢視共用
class Role_Delete extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Role: {},
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



  Button_Submit(event) {

    axios.post(`/api/Role/Delete/${this.state.Role.id}`, {
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


  render() {
    return (
      <div className="animated fadeIn row justify-content-center">
        <div className="col-sm-4">
          <div className="card">
            <div className="card-header">
              刪除角色
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
                  onChange={this.handleInputChange}
                  value={this.state.Role.sysId}
                  placeholder="sysId"
                  readOnly={true} />


                <TextInput name="name"
                  labelName="角色名稱"
                  className=""
                  display={this.props.display_name}
                  required={this.props.required_name}
                  validMessage={{ required: 'name is reduired.' }}
                  onChange={this.handleInputChange}
                  value={this.state.Role.name}
                  placeholder="name"
                  readOnly={true} />

                <TextInput name="priority"
                  labelName="角色名稱"
                  className=""
                  display={this.props.display_priority}
                  required={this.props.required_priority}
                  validMessage={{ required: 'priority is reduired.' }}
                  onChange={this.handleInputChange}
                  value={this.state.Role.priority}
                  placeholder="priority"
                  readOnly={true} />




                <TextInput name="status"
                  labelName="角色名稱"
                  className=""
                  display={this.props.display_status}
                  required={this.props.required_status}
                  validMessage={{ required: 'status is reduired.' }}
                  onChange={this.handleInputChange}
                  value={this.state.Role.status}
                  placeholder="status"
                  readOnly={true} />


                <TextInput name="createDate"
                  labelName="角色名稱"
                  className=""
                  display={this.props.display_createDate}
                  required={this.props.required_createDate}
                  validMessage={{ required: 'createDate is reduired.' }}
                  onChange={this.handleInputChange}
                  value={this.state.Role.createDate}
                  placeholder="createDate"
                  readOnly={true} />

                <TextInput name="createUser"
                  labelName="角色名稱"
                  className=""
                  display={this.props.display_createUser}
                  required={this.props.required_createUser}
                  validMessage={{ required: 'createUser is reduired.' }}
                  onChange={this.handleInputChange}
                  value={this.state.Role.createUser}
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


export default EasyForm(Role_Delete, 2);

Role_Delete.defaultProps = {
  display_sysId: true,
  display_name: true,
  display_priority: true,
  display_status: true,
  display_createDate: true,
  display_createUser: true,

  required_sysId: true,
  required_name: true,
  required_priority: true,
  required_status: true,
  required_createDate: true,
  required_createUser: true,
}