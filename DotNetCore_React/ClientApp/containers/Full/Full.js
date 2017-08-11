import React, { Component } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

//局部
import Dashboard from '../../views/Dashboard/'
import Charts from '../../views/Charts/'
import Widgets from '../../views/Widgets/'
import Buttons from '../../views/Components/Buttons/'
import Cards from '../../views/Components/Cards/'
// import Forms from '../../views/Components/Forms/'
import Modals from '../../views/Components/Modals/'
import SocialButtons from '../../views/Components/SocialButtons/'
import Switches from '../../views/Components/Switches/'
import Tables from '../../views/Components/Tables/'
import Tabs from '../../views/Components/Tabs/'
import FontAwesome from '../../views/Icons/FontAwesome/'
import SimpleLineIcons from '../../views/Icons/SimpleLineIcons/'
import JackyTest from '../../views/JackyTest'
import Login from '../../views/Login'
import Index from '../../views/Index'
import Role_View from '../../views/Role/Role_View'
import Role_Create from '../../views/Role/Role_Create'
import Role_Edit from '../../views/Role/Role_Edit'

class Full extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
    };

    this.SwitchController = this.SwitchController.bind(this);
    this.Change_Login = this.Change_Login.bind(this);

  }



  SwitchController() {
    var renderList = [
      <Route path="/Login" name="Login" component={Login} />
    ];

    if (this.state.isLogin) {

      renderList = renderList.concat([
        <Route path="/Login" name="Login" component={Login} />,
        <Route path="/Index" name="Index" component={Index} />,
        <Route path="/Role_View" name="Role_View" component={Role_View} />,
        <Route path="/Role_Create" name="Role_Create" component={Role_Create} />,
        <Route path="/Role_Edit/:id/:" name="Role_Edit" component={Role_Edit} />,
        <Route path="/jackyTest" name="JackyTest" component={JackyTest} />,
        <Route path="/dashboard" name="Dashboard" component={Dashboard} />,
        <Route path="/components/buttons" name="Buttons" component={Buttons} />,
        <Route path="/components/cards" name="Cards" component={Cards} />,
        // <Route path="/components/forms" name="Forms" component={Forms} />,
        <Route path="/components/modals" name="Modals" component={Modals} />,
        <Route path="/components/social-buttons" name="Social Buttons" component={SocialButtons} />,
        <Route path="/components/switches" name="Swithces" component={Switches} />,
        <Route path="/components/tables" name="Tables" component={Tables} />,
        <Route path="/components/tabs" name="Tabs" component={Tabs} />,
        <Route path="/icons/font-awesome" name="Font Awesome" component={FontAwesome} />,
        <Route path="/icons/simple-line-icons" name="Simple Line Icons" component={SimpleLineIcons} />,
        <Route path="/widgets" name="Widgets" component={Widgets} />,
        <Route path="/charts" name="Charts" component={Charts} />,
        <Redirect from="/" to="/Login" />,
      ]);
    }


    return renderList;
  }


  //切換
  //卡在如何把這隻function傳進Login component
  Change_Login() {
    console.log(`Change_Login`);
    // this.setState({
    //   isLogin: !isLogin,
    // });
  }

  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props} isLogin={this.state.isLogin} />
          <main className="main">
            <Breadcrumb />
            <div className="container-fluid">
              <Switch>
                {this.SwitchController()}
              </Switch>
            </div>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    )
  }
}




export default Full;
