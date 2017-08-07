import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { AppContainer } from 'react-hot-loader';
import Home from './Home';
injectTapEventPlugin();
const render = Component => {
	ReactDOM.render(
		<AppContainer>
			<Component />
		</AppContainer>, document.getElementById('react-app'));
};
render(Home);
if (module.hot) {
	module.hot.accept('./Home', () => {
		render(Home);
	});
}