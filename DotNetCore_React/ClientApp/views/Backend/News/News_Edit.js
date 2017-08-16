import React, { Component } from 'react';
import { FormGroup, Label, Input, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

import axios from 'axios';
import history from '../../../history'
import EasyForm, { Field, FieldGroup } from 'react-easyform';
import TextInput from '../../Components/Forms/TextInput';
import DropDownList from '../../Components/Forms/DropDownList';
import { news_Enum } from '../../../EnumScript/GeneralEnumScript.js';
import CKEditor from '../../Components/Forms/CKEditor';
import classnames from 'classnames';
import { Get_Sys_Language,
  HandleInputChange,
  HandleInputChange_By_New_LanList,
  HandleInputChange_By_New_LanList_CKEditor } from './News_General';

class News_Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      News: {
        new_LanList:[],
      },
      Sys_Language_List: [],
      activeTab: '0'
    };
    // console.log(`this.props.match.params)`, this.props.match.params)

    this.GetData = this.GetData.bind(this);
    this.Button_Submit = this.Button_Submit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.toggle = this.toggle.bind(this);
    
        //Import
        this.Get_Sys_Language = Get_Sys_Language.bind(this);
        this.HandleInputChange_By_New_LanList_CKEditor = HandleInputChange_By_New_LanList_CKEditor.bind(this);
        this.HandleInputChange_By_New_LanList = HandleInputChange_By_New_LanList.bind(this);
        this.Component_Nav = this.Component_Nav.bind(this);
  }


  componentDidMount() {
    this.Get_Sys_Language();
    this.GetData();
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
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

  Button_Submit(event) {
    
        axios({
    
          url: '/api/News/Edit',
          method: 'post',
          data: this.state.News
        }).then((result) => {
    
          if (result.data.success) {
            document.location.href = '/News'
          }
        }).catch((error) => {
          console.log(error)
        });
    
    
        event.preventDefault();
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
                      
                      <TextInput name="title"
                      labelName="標題"
                      className=""
                      data-index={index}
                      display={this.props.display_title}
                      required={this.props.required_title}
                      validMessage={{ required: '標題 is reduired.' }}
                      onInput={this.HandleInputChange_By_New_LanList}
                      value={this.state.News.new_LanList[`${index}`].title}
                      placeholder="title" />
    
                      <TextInput name="subTitle"
                      labelName="副標題"
                      className=""
                      data-index={index}                  
                      display={this.props.display_subTitle}
                      required={this.props.required_subTitle}
                      validMessage={{ required: '副標題 is reduired.' }}
                      onInput={this.HandleInputChange_By_New_LanList}
                      value={this.state.News.new_LanList[`${index}`].subTitle}
                      placeholder="subTitle" />
    
                      <CKEditor name="content"
                      labelName="內容"
                      className=""
                      data-index={index}
                      display={this.props.display_content}
                      required={this.props.required_content}
                      validMessage={{ required: '內容 is reduired.' }}
                      onInput={this.HandleInputChange_By_New_LanList_CKEditor}
                      value={this.state.News.new_LanList[`${index}`].content}
                      cols="100" 
                      rows="6"
                      placeholder="content" />
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
        <div className="col-sm-6">
          <div className="card">
            <div className="card-header">
            編輯消息
            </div>
            <div className="card-block">
            <form className="" onSubmit={this.Button_Submit}>
                <input type="hidden" id="id" name="id" value={this.state.News.id} />

                <TextInput name="listImage"
                  labelName="列表圖片"
                  className=""
                  display={this.props.display_listImage}
                  required={this.props.required_listImage}
                  validMessage={{ required: '列表圖片 is reduired.' }}
                  onInput={this.handleInputChange}
                  value={this.state.News.listImage}
                  placeholder="listImage"/>

                <TextInput name="category"
                  labelName="類別"
                  className=""
                  display={this.props.display_category}
                  required={this.props.required_category}
                  validMessage={{ required: '類別 is reduired.' }}
                  onInput={this.handleInputChange}
                  value={this.state.News.category}
                  placeholder="category"/>

                <TextInput name="priority"
                  labelName="列表排序"
                  className=""
                  display={this.props.display_priority}
                  required={this.props.required_priority}
                  validMessage={{ required: '列表排序 is reduired.' }}
                  onInput={this.handleInputChange}
                  value={this.state.News.priority}
                  placeholder="priority"/>

                <TextInput name="startDate"
                  labelName="上架時間"
                  className=""
                  display={this.props.display_startDate}
                  required={this.props.required_startDate}
                  validMessage={{ required: '上架時間 is reduired.' }}
                  onInput={this.handleInputChange}
                  value={this.state.News.startDate}
                  placeholder="startDate"/>

                <TextInput name="endDate"
                  labelName="下架時間"
                  className=""
                  display={this.props.display_endDate}
                  required={this.props.required_endDate}
                  validMessage={{ required: '下架時間 is reduired.' }}
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

                  {this.Component_Nav()}

                <div className="form-group form-actions">
                <Button color="primary" disabled={$invalid ? 'disabled' : false} >完成</Button>
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
  display_listImage: true,
  display_category: true,
  display_priority: true,
  display_startDate: true,
  display_endDate: true,
  display_status: true,

  required_listImage:true,
  required_category:true,
  required_priority:true,
  required_startDate:true,
  required_endDate:true,
  required_status:true,
}