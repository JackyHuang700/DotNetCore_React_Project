import React, { Component } from 'react';
import axios from 'axios';
import {Auth} from '../../../helpers/auth'
import history from '../../../history'

class Login extends Component {


  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      userName: '',
      password: '',
      rememberMe: true,
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
      password,
      rememberMe
    } = this.state;

    Auth.authenticate(userName,password,rememberMe,() => {
      history.push('/Dashboard');
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
                    <div className="input-group mb-4">
                    <p className="text-muted">Remember Me　</p>
                      <label className="switch switch-text switch-pill switch-primary">
                        <input type="checkbox" className="switch-input" value={this.state.rememberMe} defaultChecked/>
                        <span className="switch-label" data-on="On" data-off="Off"></span>
                        <span className="switch-handle"></span>
                      </label>
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

               
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
