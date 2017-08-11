import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'

import { FrontRoute } from './helpers/FrontRoute'
import { LoginRoute } from './helpers/LoginRoute'
import { BackendRoute } from './helpers/BackendRoute'

// Containers
import Home from './views/Front/Home'
import Login from './views/Backend/User/Login'
import Dashboard from './views/Backend/Dashboard/Dashboard'
import JackyTest from './views/Front/JackyTest'

// Views
ReactDOM.render((
  <BrowserRouter> 
      <div>
        <Switch>
          <FrontRoute path='/' exact component={Home} />
          <FrontRoute path='/Index' exact component={Home} />
          <LoginRoute path='/login' component={Login} />
          <FrontRoute path='/JackyTest' component={JackyTest} />
          <BackendRoute path='/dashboard' component={Dashboard} />
          <Route render={() => <h3>No Match Route</h3>} />
        </Switch>
      </div>
  </BrowserRouter> 
), document.getElementById('react-app'));