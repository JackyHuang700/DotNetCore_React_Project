import React, { Component } from 'react';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import axios from 'axios';


class Role_Create extends Component {

  constructor(props) {
    super(props);
    this.state = {
      SysId: '',
      Name: '',
      Priority: '',
      Status: 1,
    };


    this.GetData = this.GetData.bind(this);
    this.Submit = this.Submit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

  }

  GetData() {

  }


  Submit(event) {
    const {
      SysId,
      Name,
      Priority,
      Status,
    } = this.state;
  

    axios({

      url: 'api/Role/Create',
      method: 'post',
      data: {
        SysId: SysId,
        Name: Name,
        Priority: Priority,
        Status: Status,
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
    return (
      <div className="animated fadeIn row justify-content-center">
        <div className="col-sm-4">
          <div className="card">
            <div className="card-header">
              新增腳色
              </div>
            <div className="card-block">
              <form action="" method="post">
                <div className="form-group">
                  <div className="input-group">
                    <input type="text" id="SysId" name="SysId" onChange={this.handleInputChange} value={this.state.SysId} className="form-control" placeholder="123" />

                    <span className="input-group-addon"><i className="fa fa-user"></i></span>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <input type="text" id="Name" name="Name" className="form-control" onChange={this.handleInputChange} value={this.state.Name} placeholder="123" />
                    <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <input type="text" id="Priority" name="Priority" className="form-control" onChange={this.handleInputChange} value={this.state.Priority} placeholder="123" />
                    <span className="input-group-addon"><i className="fa fa-asterisk"></i></span>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <input type="text" id="Status" name="Status" className="form-control" onChange={this.handleInputChange} value={this.state.Status} placeholder="123" />
                    <span className="input-group-addon"><i className="fa fa-asterisk"></i></span>
                  </div>
                </div>
                <div className="form-group form-actions">
                  <button type="botton" className="btn btn-sm btn-default" onClick={this.Submit}>確認</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default Role_Create;

// Role_Create.propTypes = {
//     Id:  React.PropTypes.string,
// }


// Role_Create.defaultProps = {
//     Id: '',
// }