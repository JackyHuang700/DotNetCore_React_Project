import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'

import routes from './routes'

// Views
const renderApp = appRoutes => {
  ReactDOM.render((
    <AppContainer>
      <BrowserRouter>
        <div>
          {appRoutes}
        </div>
      </BrowserRouter>
    </AppContainer>
  ), document.getElementById('react-app'));
}

renderApp(routes);

//Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./routes', () => {
    const NextApp = require('./routes').default;
    renderApp(routes);
  });
}