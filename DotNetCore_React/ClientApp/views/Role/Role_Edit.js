import React, { Component } from 'react';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


class Role_Edit extends Component {

 constructor(props) {
        super(props);

    }




    render() {
        return (
           <div className="animated fadeIn row justify-content-center">
            <h1>編輯腳色</h1>
                      <div className="col-sm-4">
            <div className="card">
              <div className="card-header">
                Example Form
              </div>
              <div className="card-block">
                <form action="" method="post">
                  <div className="form-group">
                    <div className="input-group">
                      <input type="text" id="username2" name="username2" className="form-control" placeholder="Username"/>
                      <span className="input-group-addon"><i className="fa fa-user"></i></span>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <input type="email" id="email2" name="email2" className="form-control" placeholder="Email"/>
                      <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <input type="password" id="password2" name="password2" className="form-control" placeholder="Password"/>
                      <span className="input-group-addon"><i className="fa fa-asterisk"></i></span>
                    </div>
                  </div>
                  <div className="form-group form-actions">
                    <button type="submit" className="btn btn-sm btn-default">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
            </div>
        )
    }
}


export default Role_Edit;

Role_Create.propTypes = {
    Id:  React.PropTypes.string,
}


Role_Create.defaultProps = {
    Id: '',
}