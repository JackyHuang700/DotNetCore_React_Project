import React, { Component } from 'react';
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import Header from '../components/Header/';
import Sidebar from '../components/Sidebar/';
import Breadcrumb from '../components/Breadcrumb/';
import Aside from '../components/Aside/';
import Footer from '../components/Footer/';
import { islogin } from '../helpers/auth'

import Dashboard from '../views/Backend/Dashboard/Dashboard'

export function BackendRoute({ component: Component, ...rest }) {
  let logined = islogin();

  return (
    <Route
      {...rest}
      render={(props) => logined !== true
        ? <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        :
        <div className="app">
          <Header />
          <div className="app-body">
            <Sidebar {...props} isLogin={logined} />
            <main className="main">
              <Breadcrumb />
              <div className="container-fluid">
                <Switch>
                </Switch>
              </div>
              <Component {...props} />
            </main>
            {/* <Aside /> */}
          </div>
          <Footer />
        </div>}
    />

  )
}