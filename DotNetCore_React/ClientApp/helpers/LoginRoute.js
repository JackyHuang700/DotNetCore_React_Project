import React, { Component } from 'react';
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import { islogin } from './auth'

export function LoginRoute ({component: Component, ...rest}) {
  let logined = islogin();
  return (
          <Route
      {...rest}
      render={(props) => logined === true
        ? <Redirect to={{pathname: '/Dashboard', state: {from: props.location}}} />
        : 
        <div>
            <Component {...props} />
        </div>}
    />

  )
}