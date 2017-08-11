import React, { Component } from 'react';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import axios from 'axios';


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



  Button_Submit(event) {
    // debugger;
    
    // axios({

    //   url: 'api/Role/Delete',
    //   method: 'post',
    //   data:{
    //       "id": this.state.Role.id,
    //   }
    // })
    
    
    axios.post(`api/Role/Delete/${this.state.Role.id}`,{
  })
    
    
    .then((result) => {

      if (result.data.success) {
        document.location.href = '/#/Role_View'
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

                <div className="form-group">
                  <div className="input-group">
                    <input type="text" id="sysId" name="sysId" className="form-control" placeholder="sysId" value={this.state.Role.sysId} readOnly />
                    <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <input type="text" id="name" name="name" className="form-control" placeholder="name" value={this.state.Role.name} readOnly />
                    <span className="input-group-addon"><i className="fa fa-asterisk"></i></span>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <input type="text" id="priority" name="priority" className="form-control" placeholder="priority" value={this.state.Role.priority} readOnly />
                    <span className="input-group-addon"><i className="fa fa-asterisk"></i></span>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <input type="text" id="status" name="status" className="form-control" placeholder="status" value={this.state.Role.status} readOnly />
                    <span className="input-group-addon"><i className="fa fa-asterisk"></i></span>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <input type="text" id="createDate" name="createDate" className="form-control" placeholder="createDate" value={this.state.Role.createDate} readOnly />
                    <span className="input-group-addon"><i className="fa fa-asterisk"></i></span>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <input type="text" id="createUser" name="createUser" className="form-control" placeholder="createUser" value={this.state.Role.createUser} readOnly />
                    <span className="input-group-addon"><i className="fa fa-asterisk"></i></span>
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


export default Role_Delete;

// Role_Delete.propTypes = {

//   Id: React.PropTypes.string,
// }


// Role_Delete.defaultProps = {
//   Id: '',
// }