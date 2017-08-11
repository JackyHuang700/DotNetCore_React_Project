import React, { Component } from 'react';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import axios from 'axios';


//編輯與檢視共用
class User_Delete extends Component {

  constructor(props) {
    super(props);
    this.state = {
      User: {},
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



  Button_Submit(event) {
    // debugger;
    
    // axios({

    //   url: 'api/User/Delete',
    //   method: 'post',
    //   data:{
    //       "id": this.state.User.id,
    //   }
    // })
    
    
    axios.post(`api/User/Delete/${this.state.User.id}`,{
  })
    
    
    .then((result) => {

      if (result.data.success) {
        document.location.href = '/#/User_View'
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
              刪除會員
            </div>
            <div className="card-block">
              <form action="" method="post">
                <input type="hidden" id="id" name="id" value={this.state.User.id} />
                
                <div className="form-group">
                <div className="input-group">
                  <input type="text" id="userName" name="userName" className="form-control" placeholder="userName" value={this.state.User.userName} readOnly/>
                  <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <input type="text" id="password" name="password" className="form-control" placeholder="password" value={this.state.User.password} readOnly/>
                  <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
                </div>
              </div>

              <div className="form-group">
              <div className="input-group">
                <input type="text" id="email" name="email" className="form-control" placeholder="email" value={this.state.User.email} readOnly/>
                <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
              </div>
            </div>

            <div className="form-group">
            <div className="input-group">
              <input type="text" id="roleId" name="roleId" className="form-control" placeholder="roleId" value={this.state.User.roleId} readOnly/>
              <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
            </div>
          </div>
              
            <div className="form-group">
            <div className="input-group">
              <input type="text" id="firstName" name="firstName" className="form-control" placeholder="firstName" value={this.state.User.firstName} readOnly/>
              <span className="input-group-addon"><i className="fa fa-envelope"></i></span>ㄇㄩ
            </div>
          </div>
              
            <div className="form-group">
            <div className="input-group">
              <input type="text" id="lastName" name="lastName" className="form-control" placeholder="lastName" value={this.state.User.lastName} readOnly/>
              <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
            </div>
          </div>
              
            <div className="form-group">
            <div className="input-group">
              <input type="text" id="status" name="status" className="form-control" placeholder="status" value={this.state.User.status} readOnly/>
              <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
            </div>
          </div>
            <div className="form-group">
            <div className="input-group">
              <input type="text" id="createDate" name="createDate" className="form-control" placeholder="createDate" value={this.state.User.createDate} readOnly/>
              <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
            </div>
          </div>

          <div className="form-group">
          <div className="input-group">
            <input type="text" id="createUser" name="createUser" className="form-control" placeholder="createUser" value={this.state.User.createUser} readOnly/>
            <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
          </div>
        </div>

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


export default User_Delete;

// User_Delete.propTypes = {

//   Id: React.PropTypes.string,
// }


// User_Delete.defaultProps = {
//   Id: '',
// }