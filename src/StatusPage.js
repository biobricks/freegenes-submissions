import React, { Component } from 'react';
import './StatusPage.css';

class StatusPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      records: []
    };
  }

  render() {
    
    return (
      <div className="StatusPage bg-2">
        <div className="columns">
          <div className="column is-12-mobile is-6-tablet is-6-desktop">
            <div className="panel">
              <div className="panel-heading">
               Foo
              </div>
              <div className="panel-block">
                <div className="columns is-multiline is-gapless">
                  
                  <div className="column is-12">
                    <div className="columns is-gapless">
                      <div className="column is-narrow">
                        <label className="label">Email</label>
                      </div>
                      <div className="column">   
                        FooBarBaz@example.com
                      </div>
                    </div>
                  </div>

                  <div className="column is-12">
                    <div className="columns is-gapless">
                      <div className="column is-narrow">
                        <label className="label">Part Type</label>
                      </div>
                      <div className="column">   
                        Prokaryotic Promoter
                      </div>
                    </div>
                  </div>

                  <div className="column is-12">
                    <div className="columns is-gapless">
                      <div className="column is-narrow">
                        <label className="label">Description</label>
                      </div>
                      <div className="column">   
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </div>
                    </div>
                  </div>

                  <div className="column is-12">
                    <div className="columns is-gapless">
                      <div className="column is-narrow">
                        <label className="label">Tags</label>
                      </div>
                      <div className="column">   
                        <a href="#">#Tag1</a>, <a href="#">#Tag2</a>, <a href="#">#Tag3</a>
                      </div>
                    </div>
                  </div>

                  <div className="column is-12">
                    <div className="columns is-gapless">
                      <div className="column is-narrow">
                        <label className="label">Genbank</label>
                      </div>
                      <div className="column">   
                        <button className="button is-link">File</button>
                      </div>
                    </div>
                  </div>

                  <div className="column is-12">
                    <div className="columns is-gapless">
                      <div className="column is-narrow">
                        <label className="label">Seq</label>
                      </div>
                      <div className="column sequence">   
                        ATGAGCCTGCTGAATGTCCCAGCCGGTAAAGATCTGCCGGAGGATATCTACGTTGTTATTGAAATCCCGGCGAATGCGGACCCGATTAAGTATGAGATTGACAAAGAGAGCGGTGCGCTGTTTGTCGATCGCTT
                      </div>
                    </div>
                  </div>

                  <div className="column is-12">
                    <div className="columns is-gapless">
                      <div className="column is-narrow">
                        <label className="label">Frags</label>
                      </div>
                      <div className="column sequence">   
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </div>
                    </div>
                  </div>

                  <div className="column is-12">

                  </div>

                </div>
              </div>
              <div className="panel-block">
                <div className="field is-grouped">
                  <div className="control">
                    <button className="button is-link">Approve</button>
                  </div>
                  <div className="control">
                    <button className="button is-danger">Deny</button>
                  </div>
                </div>            
              </div>              
            </div>
          </div>
        </div>  
      </div>
    );
  }
}

export default StatusPage;
