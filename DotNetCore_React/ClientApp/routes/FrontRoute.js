import React, { Component } from 'react';
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import {Auth} from '../helpers/auth'

export function FrontRoute({ component: Component, ...rest }) {

  return (
    <Route
      {...rest}
      render={(props) =>
        <div>
          <nav className="navbar navbar-default navbar-static-top">
            <div className="container">
              <div className="navbar-header">
                <Link to="/" className="navbar-brand">Front Home</Link>
              </div>
              <ul className="nav navbar-nav pull-right">
                <li>
                  <Link to="/" className="navbar-brand">Home</Link>
                </li>
                <li>
                  <Link to="/dashboard" className="navbar-brand">Dashboard</Link>
                </li>
                <li>
                  <Link to="/JackyTest" className="navbar-brand">JackyTest</Link>
                </li>
                <li>
                  {Auth.isAuthenticated
                    ? <button
                      style={{ border: 'none', background: 'transparent' }}
                      onClick={() => {
                        logout()
                      }}
                      className="navbar-brand">Logout</button>
                    : <span>
                      <Link to="/login" className="navbar-brand">Login</Link>
                    </span>}
                </li>
              </ul>
            </div>
          </nav>
          <div className="container">
            <div className="row">

            </div>
            <Component {...props} />
          </div>
        </div>
      }
    />
  )
}