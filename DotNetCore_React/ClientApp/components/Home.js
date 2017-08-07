import React, { Component } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Breadcrumb from './Breadcrumb/Breadcrumb';
import Aside from './Aside/Aside';
import Footer from './Footer/Footer';

import Dashboard from '../views/Dashboard/'
import Charts from '../views/Charts/'
import Widgets from '../views/Widgets/'
import Buttons from '../views/Components/Buttons/'
import Cards from '../views/Components/Cards/'
import Forms from '../views/Components/Forms/'
import Modals from '../views/Components/Modals/'
import SocialButtons from '../views/Components/SocialButtons/'
import Switches from '../views/Components/Switches/'
import Tables from '../views/Components/Tables/'
import Tabs from '../views/Components/Tabs/'
import FontAwesome from '../views/Icons/FontAwesome/'
import SimpleLineIcons from '../views/Icons/SimpleLineIcons/'


const styles = {
	container: {
		textAlign: 'center'
	},
};
// const muiTheme = getMuiTheme({
// 	palette: {
// 		accent1Color: deepOrange500,
// 	},
// });
class Main extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			logged: true,
			drewOpen: false
		};
		this.toogleDrawer = this.toogleDrawer.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	toogleDrawer(){
		this.setState({drewOpen: !this.state.drewOpen});
	}
	handleChange(event, logged){
		this.setState({logged: logged});
	}
	render() {
		const title = 'MY AdPP';
		return (
      <div>
       {title}
      </div>
		);
	}
}
class App extends Component {
	render() {
		return (
      <div className="app">
        {/* <Header />
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumb />
            <div className="container-fluid">
              <Switch>
                <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                <Route path="/components/buttons" name="Buttons" component={Buttons}/>
                <Route path="/components/cards" name="Cards" component={Cards}/>
                <Route path="/components/forms" name="Forms" component={Forms}/>
                <Route path="/components/modals" name="Modals" component={Modals}/>
                <Route path="/components/social-buttons" name="Social Buttons" component={SocialButtons}/>
                <Route path="/components/switches" name="Swithces" component={Switches}/>
                <Route path="/components/tables" name="Tables" component={Tables}/>
                <Route path="/components/tabs" name="Tabs" component={Tabs}/>
                <Route path="/icons/font-awesome" name="Font Awesome" component={FontAwesome}/>
                <Route path="/icons/simple-line-icons" name="Simple Line Icons" component={SimpleLineIcons}/>
                <Route path="/widgets" name="Widgets" component={Widgets}/>
                <Route path="/charts" name="Charts" component={Charts}/>
                <Redirect from="/" to="/dashboard"/>
              </Switch>
            </div>
          </main>
          <Aside />
        </div>
        <Footer /> */}
		<Main/>
      </div>
    );
	}
}
export default App;