import React, { Component } from 'react';
import 'whatwg-fetch';
import './ListPage.css';


class ListPage extends Component {

  constructor(props) {
    super(props);
    this.state = {};

    this.getList()
  }

  componentDidMount() {
    this.getList()    
  }

  getList() {
    fetch('/get-list').then(function(resp) {
      return resp.json();
    }).then(function(data) {
      if(data.error) {
        console.log("err2", data.err)
        this.setState({
          error: data.error.toString()
        });
        return
      }
      this.setState({
        error: null,
        virtuals: data
      });

    }.bind(this)).catch(function(err) {
      console.log("err", err)
      this.setState({
        error: err.toString()
      });
    }.bind(this));
  }

  render() {
    
    var error = '';
    if(this.state.error) {
      error = (
        <div style={{color:'red', fontWeight:'bold'}}>
          <p>{this.state.error}</p>
        </div>
      );
    }

    var virtuals = [];
    if(!this.state.virtuals) {
      virtuals = (
        <div>Loading...</div>
      );
    } else if(!this.state.virtuals.length) {
      virtuals = (
        <div>No requests in database</div>
      );
    } else {
      var i, v;
      for(i=0; i < this.state.virtuals.length; i++) {
        v = this.state.virtuals[i];
        virtuals.push((
            <li>
            {v.name}
          </li>
        ));
      }
    }

    if(virtuals) {
      virtuals = (
        <ul>{virtuals}</ul>
      );
    }

    return (
      <div className="StatusPage bg-2">
        <div className="columns">
          <div className="column is-12-mobile is-6-tablet is-6-desktop">
            <div className="panel">
              <div className="panel-heading">
                List of requests
              </div>
              <div className="panel-block">
                {error}
                {virtuals}
              </div>              
            </div>
          </div>
        </div>  
      </div>
    );
  }
}

export default ListPage;
