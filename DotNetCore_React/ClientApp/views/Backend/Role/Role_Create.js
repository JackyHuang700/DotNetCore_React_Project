import React, { Component } from 'react';
import { FormGroup, Label,Input ,Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import axios from 'axios';
import EasyForm, { Field, FieldGroup } from 'react-easyform';
import TextInput from '../Components/Forms/TextInput';


import {role_Enum} from '../../EnumScript/GeneralEnumScript.js';

class Role_Create extends Component {

  constructor(props) {
    super(props);
    this.state = {
      SysId: '',
      Name: '',
      Priority: '',
      Status: 1,
    };

    this.Submit = this.Submit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

  }

  Submit(event) {
    axios({
      url: 'api/Role/Create',
      method: 'post',
      data: {
        SysId: this.state.SysId,
        Name: this.state.Name,
        Priority: this.state.Priority,
        Status: this.state.Status,
      }
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

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
            // 经过EasyForm包装的组件，props里会有一个params属性，包含所有的表单项值
            const { params } = this.props.params;
            /*
             * props里的easyform对象，包含了一组验证结果，
             * 其中$invalid/$valid 可以用来判断表单项是够已经正确填写
             */
            const {$invalid} = this.props.easyform.$invalid;

    return (
      <div className="animated fadeIn row justify-content-center">
        <div className="col-sm-4">
          <div className="card">
            <div className="card-header">
              新增角色
              </div>
            <div className="card-block">
              <form className="" onSubmit={this.submit}>

                <TextInput name="SysId"
                  labelName="系統識別碼"
                  className=""
                  display={this.props.display_SysId}
                  required={this.props.required_SysId} 
                  pattern={/^[\w]{5,10}$/}
                  validMessage={{required: 'SysId is reduired.', pattern: '不能包含字母数字底線以外的字符'}}
                  onChange={this.handleInputChange} 
                  defaultValue={this.state.SysId} 
                  placeholder="sys123"/>

                <TextInput name="Name" 
                  labelName="角色名稱"
                  className=""
                  display={this.props.display_Name}
                  required={this.props.required_Name} 
                  validMessage={{required: 'Name is reduired.'}} 
                  onChange={this.handleInputChange} 
                  defaultValue={this.state.Name} 
                  placeholder="糖糖"/>               

                <TextInput name="Priority" 
                  labelName="權重"
                  className=""
                  display={this.props.display_Priority}
                  required={this.props.required_Priority} 
                  validMessage={{required: 'Priority is reduired.'}} 
                  onChange={this.handleInputChange} 
                  defaultValue={this.state.Priority} 
                  placeholder="1"/>

                {/* <TextInput name="Status"
                  labelName="狀態"
                  className=""
                  display={this.props.display_Status}
                  required={this.props.required_Status} 
                  validMessage={{required: 'Status is reduired.'}} 
                  onChange={this.handleInputChange} 
                  defaultValue={this.state.Status} 
                  placeholder="1"/> */}

                  <FormGroup>
                  <Label for="Status">狀態</Label>
           <Input type="select" name="Status" id="Status" onChange={this.handleInputChange}>
            <option value={role_Enum.STOP.value}>{role_Enum.STOP.name}</option>
            <option value={role_Enum.NORMAL.value}>{role_Enum.NORMAL.name}</option>
          </Input>

          </FormGroup>


                <div className="form-group form-actions">
                  <Button color="primary" disabled={$invalid ? 'disabled' : false}>確認</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EasyForm(Role_Create, 2);

Role_Create.defaultProps = {
    display_SysId     : true,
    display_Name      : true,
    display_Priority  : true,
    display_Status    : true,
    required_SysId    : true,
    required_Name     : true,
    required_Priority : true,
    required_Status   : true,
}