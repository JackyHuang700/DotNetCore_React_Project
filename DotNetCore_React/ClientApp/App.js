import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'

import { FrontRoute } from './helpers/FrontRoute'
import { LoginRoute } from './helpers/LoginRoute'
import { BackendRoute } from './helpers/BackendRoute'

// Containers
import Home from './views/Front/Home'
import JackyTest from './views/Front/JackyTest'


import Login from './views/Backend/User/Login'
import Dashboard from './views/Backend/Dashboard/Dashboard'
import Role_Create from './views/Backend/Role/Role_Create'
import Role_Delete from './views/Backend/Role/Role_Delete'
import Role_Edit from './views/Backend/Role/Role_Edit'
import Role_View from './views/Backend/Role/Role_View'

import User_Create from './views/Backend/User/User_Create'
import User_Delete from './views/Backend/User/User_Delete'
import User_Edit from './views/Backend/User/User_Edit'
import User_View from './views/Backend/User/User_View'

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
          <BackendRoute path='/Role/Create' component={Role_Create} />
          <BackendRoute path='/Role/Delete' component={Role_Delete} />
          <BackendRoute path='/Role/Edit' component={Role_Edit} />
          <BackendRoute path='/Role/View' component={Role_View} />
          <BackendRoute path='/User/Create' component={User_Create} />
          <BackendRoute path='/User/Delete' component={User_Delete} />
          <BackendRoute path='/User/Edit' component={User_Edit} />
          <BackendRoute path='/User/View' component={User_View} />
          <Route render={() => <h3>No Match Route</h3>} />
        </Switch>
      </div>
  </BrowserRouter> 
), document.getElementById('react-app'));