import React, { Component } from 'react';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import axios from 'axios';


//編輯與檢視共用
class User_Edit_Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      is_Edit: this.props.match.params.edit.toLocaleLowerCase() === "true" ? true : false,
      User: {},
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
    this.Is_Show_Password = this.Is_Show_Password.bind(this);
    
  }


  componentDidMount() {
    this.GetData();
  }


  GetData() {
    const self = this;

    axios({
      url: `api/User/Get_User?id=${this.props.match.params.id}`,
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


  Title() {
    return this.state.is_Edit ?
      "編輯會員" :
      "檢視會員";
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

      url: 'api/User/Edit',
      method: 'post',
      data: this.state.User
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


  Button_BackUp(event) {
    document.location.href = '/#/User_View';
  }



Is_Show_Password()
{
  return this.state.is_Edit ?
  (   <div className="form-group">
  <div className="input-group">
    <input type="text" id="password" name="password" className="form-control" placeholder="password" value={this.state.User.password} onChange={this.Bind_handleInputChange} readOnly={!this.state.is_Edit} />
    <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
  </div>
</div>) :
  null;
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
                <input type="hidden" id="id" name="id" value={this.state.User.id} />

                <div className="form-group">
                  <div className="input-group">
                    <input type="text" id="userName" name="userName" className="form-control" placeholder="userName" value={this.state.User.userName} onChange={this.Bind_handleInputChange} readOnly={!this.state.is_Edit} />
                    <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
                  </div>
                </div>
             
{this.Is_Show_Password()}
                <div className="form-group">
                <div className="input-group">
                  <input type="text" id="email" name="email" className="form-control" placeholder="email" value={this.state.User.email} onChange={this.Bind_handleInputChange} readOnly={!this.state.is_Edit} />
                  <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
                </div>
              </div>

              <div className="form-group">
              <div className="input-group">
                <input type="text" id="roleId" name="roleId" className="form-control" placeholder="roleId" value={this.state.User.roleId} onChange={this.Bind_handleInputChange} readOnly={!this.state.is_Edit} />
                <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
              </div>
            </div>
                
              <div className="form-group">
              <div className="input-group">
                <input type="text" id="firstName" name="firstName" className="form-control" placeholder="firstName" value={this.state.User.firstName} onChange={this.Bind_handleInputChange} readOnly={!this.state.is_Edit} />
                <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
              </div>
            </div>
                
              <div className="form-group">
              <div className="input-group">
                <input type="text" id="lastName" name="lastName" className="form-control" placeholder="lastName" value={this.state.User.lastName} onChange={this.Bind_handleInputChange} readOnly={!this.state.is_Edit} />
                <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
              </div>
            </div>
                
              <div className="form-group">
              <div className="input-group">
                <input type="text" id="status" name="status" className="form-control" placeholder="status" value={this.state.User.status} onChange={this.Bind_handleInputChange} readOnly={!this.state.is_Edit} />
                <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
              </div>
            </div>
              <div className="form-group">
              <div className="input-group">
                <input type="text" id="createDate" name="createDate" className="form-control" placeholder="createDate" value={this.state.User.createDate} onChange={this.Bind_handleInputChange} readOnly={!this.state.is_Edit} />
                <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
              </div>
            </div>

            <div className="form-group">
            <div className="input-group">
              <input type="text" id="createUser" name="createUser" className="form-control" placeholder="createUser" value={this.state.User.createUser} onChange={this.Bind_handleInputChange} readOnly={!this.state.is_Edit} />
              <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
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


export default User_Edit_Show;

// User_Edit_Show.propTypes = {

//   Id: React.PropTypes.string,
// }


// User_Edit_Show.defaultProps = {
//   Id: '',
// }