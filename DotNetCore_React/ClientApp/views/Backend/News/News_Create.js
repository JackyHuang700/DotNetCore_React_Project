import React, { Component } from 'react';
import { FormGroup, Label, Input, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,  TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import axios from 'axios';
import history from '../../../history'
import EasyForm, { Field, FieldGroup } from 'react-easyform';
import TextInput from '../../Components/Forms/TextInput';
import DropDownList from '../../Components/Forms/DropDownList';

import { news_Enum } from '../../../EnumScript/GeneralEnumScript';
import classnames from 'classnames';
import {Get_Sys_Language} from './News_General';

class News_Create extends Component {

  constructor(props) {
    super(props);
    this.state = {
      News: {},
      Sys_Language_List: [],
      activeTab: '1'
    };

    this.Submit = this.Submit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.Button_Submit = this.Button_Submit.bind(this);
    this.toggle = this.toggle.bind(this);

    //Import
    this.Get_Sys_Language = Get_Sys_Language.bind(this);
  }

  componentDidMount(){
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
                  onInput={this.handleInputChange}
                  value={this.state.listImage}
                  placeholder="listImage" />

                

                <TextInput name="category"
                  labelName="category"
                  className=""
                  display={this.props.display_category}
                  required={this.props.required_category}
                  validMessage={{ required: 'category is reduired.' }}
                  onInput={this.handleInputChange}
                  value={this.state.category}
                  placeholder="category" />

                

                <TextInput name="priority"
                  labelName="priority"
                  className=""
                  display={this.props.display_priority}
                  required={this.props.required_priority}
                  validMessage={{ required: 'priority is reduired.' }}
                  onInput={this.handleInputChange}
                  value={this.state.priority}
                  placeholder="priority" />

                
                <TextInput name="startDate"
                  labelName="startDate"
                  className=""
                  display={this.props.display_startDate}
                  required={this.props.required_startDate}
                  validMessage={{ required: 'startDate is reduired.' }}
                  onInput={this.handleInputChange}
                  value={this.state.startDate}
                  placeholder="startDate" />

                
                <TextInput name="endDate"
                  labelName="endDate"
                  className=""
                  display={this.props.display_endDate}
                  required={this.props.required_endDate}
                  validMessage={{ required: 'endDate is reduired.' }}
                  onInput={this.handleInputChange}
                  value={this.state.endDate}
                  placeholder="endDate" />

                
                <DropDownList name="status"
                  labelName="status"
                  display={this.props.display_status}
                  required={this.props.required_status}
                  validMessage={{ required: 'status is reduired.' }}
                  onInput={this.handleInputChange}
                  value={this.state.status}
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

{/* 副表 */}

<Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}
                >
                  <i className="icon-calculator"></i> Calculator
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}
                >
                  <i className="icon-basket-loaded"></i> Shoping cart
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '3' })}
                  onClick={() => { this.toggle('3'); }}
                >
                  <i className="icon-pie-chart"></i> Charts
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                1. 
              </TabPane>
              <TabPane tabId="2">
                2. 
              </TabPane>
              <TabPane tabId="3">
                3. 
              </TabPane>
            </TabContent>

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