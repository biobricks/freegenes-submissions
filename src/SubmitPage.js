import React, { Component } from 'react';
import 'whatwg-fetch';
import './SubmitPage.css';

const genbankToJson = require('bio-parsers').genbankToJson;

function serialize(form) {
  var field, s = {};
  if (typeof form == 'object' && form.nodeName == "FORM") {
    var len = form.elements.length;
    var i, j;
    for (i=0; i<len; i++) {
      field = form.elements[i];
      if (field.name && !field.disabled && field.type != 'file' && field.type != 'reset' && field.type != 'submit' && field.type != 'button') {
        if (field.type == 'select-multiple') {
          for (j=form.elements[i].options.length-1; j>=0; j--) {
            if(field.options[j].selected)
              s[field.name] = field.options[j].value;
          }
        } else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
          s[field.name] = field.value;
        }
      }
    }
  }
  return s;
}

class SubmitPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: undefined,
      sequence: undefined,
      form: {
        submissionType: 'single',
        name: '',
        email: '',
        partType: '',
        description: '',
        links: '',
        tags: '',
        genbankFile: '',
        genbankZip: '',
        csvFile: ''
      }
    };
    this.onChangeField = this.onChangeField.bind(this);
  }

  onChangeField(e) {
    let form = this.state.form;
    form[e.target.name] = e.target.value;
    this.setState({ form });
  }

  submit(e) {
    e.preventDefault();
    
    var data = serialize(e.target);

    console.log("DATA:", data);

    data.geneID = this.state.sequence.name;
    data.sequence = this.state.sequence.sequence;

    fetch('/check-seq', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
    }).then(function(resp) {
      return resp.json();
    }).then(function(data) {
      if(data.error) {
        this.setState({
          error: data.error
        });
        return
      }
      this.setState({
        error: null
      });

      this.setState({
        error: data
      });

    }.bind(this)).catch(function(err) {
      this.setState({
        error: err
      });
    }.bind(this));
  }

  selectFile(e) {
    e.stopPropagation();
    e.preventDefault();

    this.setState({
      error: null
    });

    var files = e.target.files;
    if(!files.length) return;

    var reader = new FileReader();

    reader.onload = function(e) {
      var data = e.target.result;

      genbankToJson(data, function(res) {
        if(!res.length) {
          this.setState({
            error: "GenBank file does not include a sequence"
          });
          return
        }

        if(res.length > 1) {
          this.setState({
            error: "GenBank file includes more than one sequence. Only one sequence per GenBank file is currently supported."
          });
          return;
        }

        var res = res[0];

        if(!res.success) {
          if(res.messages && res.messages.length) {
            this.setState({
              error: "Error(s) parsing genbank file: " + res.messages.join("<br/>")
            });
          } else {
            this.setState({
              error: "Unable to parse GenBank file"
            });
          }

          return;
        }

        this.setState({
          sequence: {
            name: res.parsedSequence.name,
            sequence: res.parsedSequence.sequence
          }
        });

      }.bind(this));
    }.bind(this);

    reader.readAsText(files[0]);
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

    return (
      <div className="SubmitPage bg-2">
        <div className="columns">
          <div className="column is-12-mobile is-6 desktop">
            <div className="panel">
              {(this.state.form.submissionType === 'single') ? (
                <div className="panel-heading">
                  Submit Single
                </div>
              ) : (
                <div className="panel-heading">
                  Submit Bulk
                </div>
              )}
              <div className="panel-block">
                <form onSubmit={this.submit.bind(this)}>
                  
                  <div className="field">
                    <label className="label">Submission Type</label>
                    <div className="control">
                      <label className="radio">
                        {(this.state.form.submissionType === 'single') ? (
                          <div>
                            <input 
                              type="radio" 
                              name="submissionType" 
                              checked={true} 
                              value="single"
                              onChange={this.onChangeField}
                            />&nbsp;Single
                          </div>
                        ) : (
                          <div>
                            <input 
                              type="radio" 
                              name="submissionType" 
                              value="bulk"
                              onChange={this.onChangeField}
                            />&nbsp;Single
                          </div>
                        )} 
                      </label>
                      <label className="radio">
                        {(this.state.form.submissionType === 'bulk') ? (
                          <div>
                            <input 
                              type="radio" 
                              name="submissionType" 
                              checked={true} 
                              value="bulk"
                              onChange={this.onChangeField}
                            />&nbsp;Bulk
                          </div>
                        ) : (
                          <div>
                            <input 
                              type="radio" 
                              name="submissionType" 
                              value="bulk"
                              onChange={this.onChangeField}
                            />&nbsp;Bulk
                          </div>
                        )}
                      </label>
                    </div>  
                  </div>                    
                  <div className="field">
                    <label className="label">Name</label>
                    <div className="control has-icons-left">
                      <input 
                        className="input" 
                        type="text" 
                        name="name"
                        placeholder="Your Name"
                      />
                      <span className="icon is-small is-left">
                        <i className="mdi mdi-account"></i>
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control has-icons-left">
                      <input 
                        className="input" 
                        type="text"
                        name="email" 
                        placeholder="youremailaddress@example.com"
                      />
                      <span className="icon is-small is-left">
                        <i className="mdi mdi-email"></i>
                      </span>
                    </div>
                  </div>

                  {(this.state.form.submissionType === 'single') ? (
                    <div>
                      <div className="field">
                        <label className="label">Part Type</label>
                        <div className="control">
                          <label className="radio">
                            <input type="radio" name="partType" value="prokaryotic promoter" />
                            &nbsp;Prokaryotic Promoter
                          </label><br/>
                          <label className="radio">
                            <input type="radio" name="partType" value="rbs" />
                            &nbsp;RBS
                          </label><br/>
                          <label className="radio">
                            <input type="radio" name="partType" value="eukaryotic promoter" />
                            &nbsp;Eukaryotic Promoter
                          </label><br/>
                          <label className="radio">
                            <input type="radio" name="partType" value="cds" />
                            &nbsp;CDS
                          </label><br/>
                          <label className="radio">
                            <input type="radio" name="partType" value="terminator" />
                            &nbsp;Terminator
                          </label><br/>
                          <label className="radio">
                            <input type="radio" name="partType" value="operon" />
                            &nbsp;Operon
                          </label>
                          <label className="radio">
                            <input type="radio" name="partType" value="other" />
                            &nbsp;Other
                          </label>
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Description</label>
                        <div className="control">
                          <textarea className="textarea" name="description" placeholder="A short description."></textarea>
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Links</label>
                        <div className="control has-icons-left">
                          <input 
                            className="input" 
                            type="text" 
                            name="links"
                            placeholder="Links"
                          />
                          <span className="icon is-small is-left">
                            <i className="mdi mdi-link"></i>
                          </span>
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Tags</label>
                        <div className="control has-icons-left">
                          <input 
                            className="input" 
                            type="text" 
                            name="tags"
                            placeholder="#example"
                          />
                          <span className="icon is-small is-left">
                            <i className="mdi mdi-pound"></i>
                          </span>
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Genbank File</label>
                        <div className="control">
                          <div class="file">
                            <label class="file-label">
                              <input class="file-input" type="file" name="file" onChange={this.selectFile.bind(this)} />
                              <span class="file-cta">
                                <span class="file-icon">
                                  <i class="fas fa-upload"></i>
                                </span>
                               <span class="file-label">
                                 Choose a file…
                               </span>
                             </span>
                           </label>
                         </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="field">
                        <label className="label">CSV File</label>
                        <div className="control">
                          <button className="button is-primary">Upload File</button>
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Genbank Zip</label>
                        <div className="control">
                          <button className="button is-primary">Upload File</button>
                        </div>
                      </div>
                    </div>
                  )}

                  <hr/>
                  {error}
                  <div className="field">
                    <div className="control">
                      <button type="submit" className="button is-primary">Submit</button>
                    </div>
                  </div>            
                </form>
              </div>
            </div>
          </div>
        </div>  
      </div>
    );
  }
}

export default SubmitPage;
