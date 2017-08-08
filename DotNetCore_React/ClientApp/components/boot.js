// import React from 'react';
// import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { AppContainer } from 'react-hot-loader';
// import Home from './Home';
injectTapEventPlugin();
// const render = Component => {
// 	ReactDOM.render(
// 		<AppContainer>
// 			<Component />
// 		</AppContainer>, document.getElementById('react-app'));
// };
// render(Home);
// if (module.hot) {
// 	module.hot.accept('./Home', () => {
// 		render(Home);
// 	});
// }







import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history';

// Containers
import Full from '../containers/Full/Full'

// Views


const history = createBrowserHistory();

const render = Component => {
ReactDOM.render((
	
  <HashRouter history={history}>
    <Switch>

      <Route path="/" name="Home" component={Full}/>
    </Switch>
  </HashRouter>
), document.getElementById('react-app'));

};
render(Full);

if (module.hot) {
	module.hot.accept('../containers/Full/Full', () => {
		render(Full);
	});
}

