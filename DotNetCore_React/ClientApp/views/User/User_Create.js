import React, { Component } from 'react';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import axios from 'axios';
import EasyForm, { Field, FieldGroup } from 'react-easyform';
import TextInput from '../Components/Forms/TextInput';


class User_Create extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
    };

    this.Submit = this.Submit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

  }

  Submit(event) {
    axios({
      url: 'api/User/Create',
      method: 'post',
      data: {
        SysId: this.state.SysId,
        Name: this.state.Name,
        Priority: this.state.Priority,
        Status: this.state.Status,
      }
    }).then((result) => {
      if (result.data.success) {
        document.location.href = '/#/User_View'
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

              <TextInput name="userName" 
              labelName="角色名稱"
              className=""
              display={this.props.display_userName}
              required={this.props.required_userName} 
              validMessage={{required: 'userName is reduired.'}} 
              onChange={this.handleInputChange} 
              defaultValue={this.state.userName} 
              placeholder="userName"/> 

              <TextInput name="roleId" 
              labelName="角色名稱"
              className=""
              display={this.props.display_roleId}
              required={this.props.required_roleId} 
              validMessage={{required: 'roleId is reduired.'}} 
              onChange={this.handleInputChange} 
              defaultValue={this.state.roleId} 
              placeholder="roleId"/> 

              
              <TextInput name="email" 
              labelName="角色名稱"
              className=""
              display={this.props.display_email}
              required={this.props.required_email} 
              validMessage={{required: 'email is reduired.'}} 
              onChange={this.handleInputChange} 
              defaultValue={this.state.email} 
              placeholder="email"/> 

              
              <TextInput name="emailComfirmed" 
              labelName="角色名稱"
              className=""
              display={this.props.display_emailComfirmed}
              required={this.props.required_emailComfirmed} 
              validMessage={{required: 'emailComfirmed is reduired.'}} 
              onChange={this.handleInputChange} 
              defaultValue={this.state.emailComfirmed} 
              placeholder="emailComfirmed"/> 

              <TextInput name="firstName" 
              labelName="角色名稱"
              className=""
              display={this.props.display_firstName}
              required={this.props.required_firstName} 
              validMessage={{required: 'firstName is reduired.'}} 
              onChange={this.handleInputChange} 
              defaultValue={this.state.firstName} 
              placeholder="firstName"/> 

              <TextInput name="lastName" 
              labelName="角色名稱"
              className=""
              display={this.props.display_lastName}
              required={this.props.required_lastName} 
              validMessage={{required: 'lastName is reduired.'}} 
              onChange={this.handleInputChange} 
              defaultValue={this.state.lastName} 
              placeholder="lastName"/> 


              {/* <TextInput name="status" 
              labelName="角色名稱"
              className=""
              display={this.props.status}
              required={this.props.status} 
              validMessage={{required: 'status is reduired.'}} 
              onChange={this.handleInputChange} 
              defaultValue={this.state.status} 
              placeholder="status"/>  */}
           
           
              <TextInput name="createDate" 
              labelName="角色名稱"
              className=""
              display={this.props.createDate}
              required={this.props.createDate} 
              validMessage={{required: 'createDate is reduired.'}} 
              onChange={this.handleInputChange} 
              defaultValue={this.state.createDate} 
              placeholder="createDate"/> 


              <TextInput name="createUser" 
              labelName="角色名稱"
              className=""
              display={this.props.createUser}
              required={this.props.createUser} 
              validMessage={{required: 'createUser is reduired.'}} 
              onChange={this.handleInputChange} 
              defaultValue={this.state.createUser} 
              placeholder="createUser"/>


       
              <TextInput name="updateDate" 
              labelName="角色名稱"
              className=""
              display={this.props.updateDate}
              required={this.props.updateDate} 
              validMessage={{required: 'updateDate is reduired.'}} 
              onChange={this.handleInputChange} 
              defaultValue={this.state.updateDate} 
              placeholder="updateDate"/> 


              <TextInput name="updateUser" 
              labelName="角色名稱"
              className=""
              display={this.props.updateUser}
              required={this.props.updateUser} 
              validMessage={{required: 'updateUser is reduired.'}} 
              onChange={this.handleInputChange} 
              defaultValue={this.state.updateUser} 
              placeholder="updateUser"/>

              <TextInput name="failedCount" 
              labelName="角色名稱"
              className=""
              display={this.props.failedCount}
              required={this.props.failedCount} 
              validMessage={{required: 'failedCount is reduired.'}} 
              onChange={this.handleInputChange} 
              defaultValue={this.state.failedCount} 
              placeholder="failedCount"/>


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

export default EasyForm(User_Create, 2);

User_Create.defaultProps = {
    display_userName     : true,
    display_roleId     : true,
    display_email     : true,
    display_emailComfirmed     : true,
    display_firstName     : true,
    // display_status     : true,
    display_createDate     : true,
    display_createUser    : true,
    display_updateDate     : true,
    display_updateUser    : true,
    display_failedCount    : true,


    required_userName     : true,
    required_roleId     : true,
    required_email     : true,
    required_emailComfirmed     : true,
    required_firstName     : true,
    // required_status     : true,
    required_createDate     : true,
    required_createUser    : true,
    required_updateDate     : true,
    required_updateUser    : true,
    required_failedCount    : true,
}

