import React, { Component } from 'react';
import { FormGroup, Label, Input, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import axios from 'axios';
import { role_Enum } from '../../EnumScript/GeneralEnumScript.js';


//編輯與檢視共用
class Role_Edit_Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      is_Edit: this.props.match.params.edit.toLocaleLowerCase() === "true" ? true : false,
      Role: {},
    };
    // debugger;
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
      url: `api/Role/Get_Role?id=${this.props.match.params.id}`,
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
    // const {
    //   SysId,
    //   Name,
    //   Priority,
    //   Status,
    // } = this.state;


    axios({

      url: 'api/Role/Edit',
      method: 'post',
      data: this.state.Role
    }).then((result) => {

      if (result.data.success) {
        document.location.href = '/#/Role_View'
      }
    }).catch((error) => {
      console.log(error)
    });


    event.preventDefault();
    return false;
  }


  Button_BackUp(event) {
    document.location.href = '/#/Role_View';
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

                <div className="form-group">
                  <div className="input-group">
                    <input type="text" id="sysId" name="sysId" className="form-control" placeholder="sysId" value={this.state.Role.sysId} onChange={this.Bind_handleInputChange} readOnly={!this.state.is_Edit} />
                    <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <input type="text" id="name" name="name" className="form-control" placeholder="name" value={this.state.Role.name} onChange={this.Bind_handleInputChange} readOnly={!this.state.is_Edit} />
                    <span className="input-group-addon"><i className="fa fa-asterisk"></i></span>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <input type="text" id="priority" name="priority" className="form-control" placeholder="priority" value={this.state.Role.priority} onChange={this.Bind_handleInputChange} readOnly={!this.state.is_Edit} />
                    <span className="input-group-addon"><i className="fa fa-asterisk"></i></span>
                  </div>
                </div>
                {/* <div className="form-group">
                   <div className="input-group">
                     <input type="text" id="status" name="status" className="form-control" placeholder="status" value={this.state.Role.status} onChange={this.Bind_handleInputChange} readOnly={!this.state.is_Edit} />
                     <span className="input-group-addon"><i className="fa fa-asterisk"></i></span>
                   </div>
                 </div> */}


                <div className="form-group">
                  <FormGroup>
                    <Label for="status">狀態</Label>
                    <Input type="select" name="status" id="status" onChange={this.handleInputChange} readOnly={!this.state.is_Edit}>
                      <option value={role_Enum.STOP.value}>{role_Enum.STOP.name}</option>
                      <option value={role_Enum.NORMAL.value}>{role_Enum.NORMAL.name}</option>
                    </Input>
                  </FormGroup>
                </div>




                <div className="form-group">
                  <div className="input-group">
                    <input type="text" id="createDate" name="createDate" className="form-control" placeholder="createDate" value={this.state.Role.createDate} onChange={this.Bind_handleInputChange} readOnly={!this.state.is_Edit} />
                    <span className="input-group-addon"><i className="fa fa-asterisk"></i></span>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <input type="text" id="createUser" name="createUser" className="form-control" placeholder="createUser" value={this.state.Role.createUser} onChange={this.Bind_handleInputChange} readOnly={!this.state.is_Edit} />
                    <span className="input-group-addon"><i className="fa fa-asterisk"></i></span>
                  </div>
                </div>

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


export default Role_Edit_Show;

// Role_Edit_Show.propTypes = {

//   Id: React.PropTypes.string,
// }


// Role_Edit_Show.defaultProps = {
//   Id: '',
// }