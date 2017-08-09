import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {


  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
    };

      this.handleInputChange = this.handleInputChange.bind(this);
      this.Login = this.Login.bind(this);
  }

   handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  Login(event) {
    const {
      userName,
      password
    } = this.state;
    console.log(userName)
    console.log(password)
    axios({
      
      url: 'api/WebApi/Login',
      method: 'post',
      data: {
      "UserName":userName,
      "Password":password
    }
    }).then((result) => {
      console.log(result.data)
    }).catch((error) => {
      console.log(error)
    });
    event.preventDefault();

  }


  render() {
    return (
      <div className="app flex-row align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card-group mb-0">

                <div className="card p-4">
                  <div className="card-block">
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <div className="input-group mb-3">
                      <span className="input-group-addon"><i className="icon-user"></i></span>
                      <input type="text" className="form-control" placeholder="Username" name="userName" value={this.state.userName} onChange={this.handleInputChange}/>
                    </div>
                    <div className="input-group mb-4">
                      <span className="input-group-addon"><i className="icon-lock"></i></span>
                      <input type="password" className="form-control" placeholder="Password" name="password" value={this.state.password} onChange={this.handleInputChange}/>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <button type="button" className="btn btn-primary px-4" onClick={this.Login}>Login</button>
                      </div>
                      <div className="col-6 text-right">
                        <button type="button" className="btn btn-link px-0">Forgot password?</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="card card-inverse card-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <div className="card-block text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                      <button type="button" className="btn btn-primary active mt-3">Register Now!</button>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
