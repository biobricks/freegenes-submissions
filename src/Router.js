import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import LandingPage from './LandingPage';
import SubmitPage from './SubmitPage';
import ListPage from './ListPage';
import StatusPage from './StatusPage';

class Router extends Component {
  render() {
    const landingPage = (props) => {
      return (
        <LandingPage 
          {...props}
          {...this.props}
        />
      );
    };
    const submitPage = (props) => {
      return (
        <SubmitPage 
          {...props}
          {...this.props}
        />
      );
    };
    const listPage = (props) => {
      return (
        <ListPage 
          {...props}
          {...this.props}
        />
      );
    };
    const statusPage = (props) => {
      return (
        <StatusPage 
          {...props}
          {...this.props}
        />
      );
    };
    return (
      <main>
        <Switch>
          <Route exact path='/' component={landingPage}/>
          <Route exact path='/submit' component={submitPage}/>
          <Route exact path='/list' component={listPage}/>
          <Route exact path='/status' component={statusPage}/>
        </Switch>
      </main>
    );
  }
}

export default Router;
