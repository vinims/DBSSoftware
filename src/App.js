import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import InitialConfigPage from './pages/initialconfigpage/initialconfigpage.component';
import ClientsPage from './pages/clientspage/clientspage.component';
import ClientPage from './pages/clientspage/clientpage.component';
import ContractPage from './pages/contractspage/contractpage.component';

import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';


class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }

      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  renderClients = (routerProps) => {
    let clientId = routerProps.match.params.clientId
    return <ClientPage client={clientId}/>
  }

  renderContracts = (routerProps) => {
    let clientId = routerProps.match.params.clientId
    return <ContractPage client={clientId}/>
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/InitialConfigPage' component={InitialConfigPage} />
          <Route exact path='/clients' component={ClientsPage} />
          <Route exact path="/client/:clientId" render = {routerProps => this.renderClients(routerProps)} />
          <Route exact path="/contract/:contractId" render = {routerProps => this.renderContracts(routerProps)} />
          <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
          <Route component = {HomePage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
