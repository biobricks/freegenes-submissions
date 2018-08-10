import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

class LandingPage extends Component {

  render() {
    return (
      <div className="LandingPage bg-2">
        <div className="columns">
          <div className="column is-12-mobile is-6 desktop">
            <div className="panel">
              <div className="panel-heading">
                Welcome To Free Genes
              </div>
              <div className="panel-block">
                <p>
                  Please select from&nbsp;
                  <Link to="/submit">Submit</Link>
                  &nbsp;or&nbsp;
                  <Link to="/status">Status</Link>.
                </p> 
              </div>
            </div>
          </div>
        </div>  
      </div>
    );
  }
}

export default LandingPage;
