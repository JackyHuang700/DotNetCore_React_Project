import React, { Component } from 'react';
import { Route, Link, Redirect, Switch } from 'react-router-dom'

import { FrontRoute } from './routes/FrontRoute'
import { LoginRoute } from './routes/LoginRoute'
import { BackendRoute } from './routes/BackendRoute'

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

import News_Create from './views/Backend/News/News_Create'
import News_Delete from './views/Backend/News/News_Delete'
import News_Edit from './views/Backend/News/News_Edit'
import News_View from './views/Backend/News/News_View'

/**
  * 
  * 已知Breadcrumb�呼�這隻
  */
export default (
      <Switch>
        <FrontRoute path='/' exact component={Home} />
        <FrontRoute path='/Index' exact component={Home} />
        <LoginRoute path='/login' component={Login} />
        <FrontRoute path='/JackyTest' component={JackyTest} />
        <BackendRoute path='/dashboard' component={Dashboard} />
        <BackendRoute path='/Role' exact component={Role_View} />
        <BackendRoute path='/Role/Create' component={Role_Create} />
        <BackendRoute path='/Role/Delete/:id' component={Role_Delete} />
        <BackendRoute path='/Role/Edit/:id/:edit' component={Role_Edit} />
        <BackendRoute path='/User' exact component={User_View} />
        <BackendRoute path='/User/Create' component={User_Create} />
        <BackendRoute path='/User/Delete/:id' component={User_Delete} />
        <BackendRoute path='/User/Edit/:id/:edit' component={User_Edit} />
        <BackendRoute path='/News' exact component={News_View} />
        <BackendRoute path='/News/Create' component={News_Create} />
        <BackendRoute path='/News/Delete/:id/:delete' component={News_Delete} />
        <BackendRoute path='/News/Edit/:id' component={News_Edit} />
        <Route render={() => <h3>No Match Route</h3>} />
      </Switch>
)