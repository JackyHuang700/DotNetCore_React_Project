import React, { Component } from 'react';
import { FormGroup, Label, Input, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import axios from 'axios';
import { role_Enum } from '../../../EnumScript/GeneralEnumScript.js';
import EasyForm, { Field, FieldGroup } from 'react-easyform';
import TextInput from '../../Components/Forms/TextInput';
import DropDownList from '../../Components/Forms/DropDownList';


class News_Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      News: {},
    };
    // console.log(`this.props.match.params)`, this.props.match.params)

    this.GetData = this.GetData.bind(this);
    this.Button_Click = this.Button_Click.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }


  componentDidMount() {
    this.GetData();
  }


  GetData() {
    const self = this;

    axios({
      url: `/api/News/Get_News?id=${this.props.match.params.id}`,
      method: 'GET',
      data: {
      }
    }).then((result) => {
      // console.log(result.data);
      self.setState({
        News: result.data
      });
    }).catch((error) => {
      console.log(error)
    });

  }

  handleInputChange(event) {

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    var new_News = Object.assign(this.state.News);
    new_News[name] = value;


    this.setState({
      News: new_News,
    });
  }



  render() {
    return (
      <div className="animated fadeIn row justify-content-center">
        <div className="col-sm-4">
          <div className="card">
            <div className="card-header">
            編輯最新消息
            </div>
            <div className="card-block">
              <form action="" method="post">
                <input type="hidden" id="id" name="id" value={this.state.News.id} />

                <TextInput name="listImage"
                  labelName="listImage"
                  className=""
                  display={this.props.display_listImage}
                  required={this.props.required_listImage}
                  validMessage={{ required: 'listImage is reduired.' }}
                  onInput={this.handleInputChange}
                  value={this.state.News.listImage}
                  placeholder="listImage"/>

                <TextInput name="category"
                  labelName="category"
                  className=""
                  display={this.props.display_category}
                  required={this.props.required_category}
                  validMessage={{ required: 'category is reduired.' }}
                  onInput={this.handleInputChange}
                  value={this.state.News.category}
                  placeholder="category"/>

                <TextInput name="priority"
                  labelName="priority"
                  className=""
                  display={this.props.display_priority}
                  required={this.props.required_priority}
                  validMessage={{ required: 'priority is reduired.' }}
                  onInput={this.handleInputChange}
                  value={this.state.News.priority}
                  placeholder="priority"/>

                <TextInput name="startDate"
                  labelName="startDate"
                  className=""
                  display={this.props.display_startDate}
                  required={this.props.required_startDate}
                  validMessage={{ required: 'startDate is reduired.' }}
                  onInput={this.handleInputChange}
                  value={this.state.News.startDate}
                  placeholder="startDate"/>

                <TextInput name="endDate"
                  labelName="endDate"
                  className=""
                  display={this.props.display_endDate}
                  required={this.props.required_endDate}
                  validMessage={{ required: 'endDate is reduired.' }}
                  onInput={this.handleInputChange}
                  value={this.state.News.endDate}
                  placeholder="endDate"/>


                 <DropDownList name="status"
                  labelName="status"
                  display={this.props.display_Status}
                  required={this.props.required_Status} 
                  validMessage={{required: 'Status is reduired.'}} 
                  onInput={this.handleInputChange} 
                  value={this.state.News.status}
                  options={
                    [
                      {
                        name:news_Enum.STOP.name,
                        value:news_Enum.STOP.value
                      },
                      {
                        name:news_Enum.NORMAL.name,
                        value:news_Enum.NORMAL.value
                      }
                    ]}
                  />


                  <TextInput name="createDate"
                  labelName="createDate"
                  className=""
                  display={this.props.display_createDate}
                  required={this.props.required_createDate}
                  validMessage={{ required: 'createDate is reduired.' }}
                  onInput={this.handleInputChange}
                  value={this.state.News.createDate}
                  readOnly={true}
                  placeholder="createDate"/>

                  <TextInput name="createUser"
                  labelName="createUser"
                  className=""
                  display={this.props.display_createUser}
                  required={this.props.required_createUser}
                  validMessage={{ required: 'createUser is reduired.' }}
                  onInput={this.handleInputChange}
                  value={this.state.News.createUser}
                  readOnly={true}
                  placeholder="createUser"/>

                  <TextInput name="updateDate"
                  labelName="updateDate"
                  className=""
                  display={this.props.display_updateDate}
                  required={this.props.required_updateDate}
                  validMessage={{ required: 'updateDate is reduired.' }}
                  onInput={this.handleInputChange}
                  value={this.state.News.updateDate}
                  readOnly={true}
                  placeholder="updateDate"/>

                  <TextInput name="updateUser"
                  labelName="updateUser"
                  className=""
                  display={this.props.display_updateUser}
                  required={this.props.required_updateUser}
                  validMessage={{ required: 'updateUser is reduired.' }}
                  onInput={this.handleInputChange}
                  value={this.state.News.updateUser}
                  readOnly={true}
                  placeholder="updateUser"/>

                <div className="form-group form-actions">
                <Button color="primary" disabled={$invalid ? 'disabled' : false}  onClick={this.Button_Submit}>完成</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default EasyForm(News_Edit, 2);


News_Edit.defaultProps = {
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