import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <div className="Navbar">
         <nav className="Navbar navbar is-dark">
           <div className="navbar-brand">
              <Link className="navbar-item" to='/'>
                Free Genes
              </Link>
              <div className="navbar-burger burger" data-target="navMenuTransparentExample">
                <span></span>
                <span></span>
                <span></span>
              </div>              
           </div>
           <div id="navMenuTransparentExample" className="navbar-menu">
            <div className="navbar-start">
              <Link className="navbar-item " to="/submit">
                Submit
              </Link> 
              <Link className="navbar-item " to="/status">
                Status
              </Link>    
            </div>
          </div>           
        </nav>       
      </div>
    );
  }
}

export default Navbar;