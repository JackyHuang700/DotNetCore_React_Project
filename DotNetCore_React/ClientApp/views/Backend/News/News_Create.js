import React, { Component } from 'react';
import { FormGroup, Label, Input, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import axios from 'axios';
import history from '../../../history'
import EasyForm, { Field, FieldGroup } from 'react-easyform';
import TextInput from '../../Components/Forms/TextInput';
import DropDownList from '../../Components/Forms/DropDownList';

import { news_Enum } from '../../../EnumScript/GeneralEnumScript';
import classnames from 'classnames';
import { Get_Sys_Language,
  HandleInputChange,
  HandleInputChange_By_New_LanList } from './News_General';

class News_Create extends Component {

  constructor(props) {
    super(props);
    this.state = {
      News: {
        new_LanList:[],
      },
      Sys_Language_List: [],
      activeTab: '0'
    };

    this.Submit = this.Submit.bind(this);
    this.Button_Submit = this.Button_Submit.bind(this);
    this.toggle = this.toggle.bind(this);

    //Import
    this.Get_Sys_Language = Get_Sys_Language.bind(this);
    this.HandleInputChange = HandleInputChange.bind(this);
    this.HandleInputChange_By_New_LanList = HandleInputChange_By_New_LanList.bind(this);
    this.Component_Nav = this.Component_Nav.bind(this);
  }

  componentDidMount() {
    this.Get_Sys_Language();
  }


  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  Submit(event) {
    const self = this;
    event.preventDefault();
    axios({
      url: '/api/News/Create',
      method: 'post',
      data: {
        self
      }
    }).then((result) => {
      if (result.data.success) {
        history.push('/News/View');
      }
    }).catch((error) => {
      console.log(error)
    });
    return false;
  }


  Button_Submit(event) {
    event.preventDefault();
    axios.post(`/api/News/Delete/${this.state.News.id}`, {
    }).then((result) => {
      if (result.data.success) {
        history.push('/News');
      }
    }).catch((error) => {
      console.log(error)
    });


    return false;
  }

  //語系元件
  Component_Nav() {

    return (
      <div>
        <Nav tabs>
          {
            this.state.Sys_Language_List.map((sys, index) => {
              return (
                <NavItem>

                  <NavLink
                    className={classnames({ active: this.state.activeTab === `${index}` })}
                    onClick={() => { this.toggle(`${index}`); }}>
                    <i className="icon-calculator"></i> {sys.name}
                  </NavLink>
                </NavItem>

              );
            })
          }
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          {
            this.state.Sys_Language_List.map((sys, index) => {
              return (
                <TabPane tabId={`${index}`}>
                  
                  <TextInput name="Title"
                  labelName="Title"
                  className=""
                  data-index={index}
                  display={this.props.display_Title}
                  required={this.props.required_Title}
                  validMessage={{ required: 'Title is reduired.' }}
                  onInput={this.HandleInputChange_By_New_LanList}
                  value={this.state.News.new_LanList[`${index}`].Title}
                  placeholder="Title" />

                  <TextInput name="SubTitle"
                  labelName="SubTitle"
                  className=""
                  data-index={index}                  
                  display={this.props.display_SubTitle}
                  required={this.props.required_SubTitle}
                  validMessage={{ required: 'SubTitle is reduired.' }}
                  onInput={this.HandleInputChange_By_New_LanList}
                  value={this.state.News.new_LanList[`${index}`].SubTitle}
                  placeholder="SubTitle" />

                  <TextInput name="Content"
                  labelName="Content"
                  className=""
                  data-index={index}
                  display={this.props.display_Content}
                  required={this.props.required_Content}
                  validMessage={{ required: 'Content is reduired.' }}
                  onInput={this.HandleInputChange_By_New_LanList}
                  value={this.state.News.new_LanList[`${index}`].Content}
                  placeholder="Content" />

                </TabPane>
              )
            })
          }
        </TabContent>
      </div>
    );


  }


  render() {
    const { params } = this.props.params;
    const { $invalid } = this.props.easyform.$invalid;

    return (
      <div className="animated fadeIn row justify-content-center">
        <div className="col-sm-4">
          <div className="card">
            <div className="card-header">
              建立最新消息
              </div>
            <div className="card-block">
              <form className="" onSubmit={this.Submit}>


                <TextInput name="listImage"
                  labelName="listImage"
                  className=""
                  display={this.props.display_listImage}
                  required={this.props.required_listImage}
                  validMessage={{ required: 'listImage is reduired.' }}
                  onInput={this.HandleInputChange}
                  value={this.state.News.listImage}
                  placeholder="listImage" />



                <TextInput name="category"
                  labelName="category"
                  className=""
                  display={this.props.display_category}
                  required={this.props.required_category}
                  validMessage={{ required: 'category is reduired.' }}
                  onInput={this.HandleInputChange}
                  value={this.state.News.category}
                  placeholder="category" />



                <TextInput name="priority"
                  labelName="priority"
                  className=""
                  display={this.props.display_priority}
                  required={this.props.required_priority}
                  validMessage={{ required: 'priority is reduired.' }}
                  onInput={this.HandleInputChange}
                  value={this.state.News.priority}
                  placeholder="priority" />


                <TextInput name="startDate"
                  labelName="startDate"
                  className=""
                  display={this.props.display_startDate}
                  required={this.props.required_startDate}
                  validMessage={{ required: 'startDate is reduired.' }}
                  onInput={this.HandleInputChange}
                  value={this.state.News.startDate}
                  placeholder="startDate" />


                <TextInput name="endDate"
                  labelName="endDate"
                  className=""
                  display={this.props.display_endDate}
                  required={this.props.required_endDate}
                  validMessage={{ required: 'endDate is reduired.' }}
                  onInput={this.HandleInputChange}
                  value={this.state.News.endDate}
                  placeholder="endDate" />


                <DropDownList name="status"
                  labelName="status"
                  display={this.props.display_status}
                  required={this.props.required_status}
                  validMessage={{ required: 'status is reduired.' }}
                  onInput={this.HandleInputChange}
                  value={this.state.News.status}
                  options={
                    [
                      {
                        name: news_Enum.STOP.name,
                        value: news_Enum.STOP.value
                      },
                      {
                        name: news_Enum.NORMAL.name,
                        value: news_Enum.NORMAL.value
                      }
                    ]}
                />

                {this.Component_Nav()}

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

export default EasyForm(News_Create, 2);

News_Create.defaultProps = {

  display_listImage: true,
  display_category: true,
  display_priority: true,
  display_startDate: true,
  display_endDate: true,
  display_status: true,

  /* */
  required_listImage: true,
  required_category: true,
  required_priority: true,
  required_startDate: true,
  required_endDate: true,
  required_status: true,
}