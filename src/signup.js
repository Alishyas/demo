import React, { Component } from 'react';
import './new.css'; 
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert'


class SignPage extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      error:'',
      confpwd:'',
      show: false
    };

    this.handlePassChange = this.handlePassChange.bind(this);
    this.ConfPasswordChange = this.ConfPasswordChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissError = this.dismissError.bind(this)
      this.onConfirm = this.onConfirm.bind(this)
  }

 
 dismissError() {
    this.setState({ error: '' });
  }

  handleSubmit(evt) {
    console.log('here')
    console.log(this.state)
    evt.preventDefault();
      if (!this.state.username) {
      return this.setState({ error: 'Username is required' });
    }

    if (!this.state.password) {
      return this.setState({ error: 'Password is required' });
    }

      if (this.state.confpwd!==this.state.password) {
          return this.setState({ error: 'Password & confirm password do not match' });
      }

     const payload ={"username":this.state.username,
                    "password":this.state.password};
    let self = this;
    axios.post('http://localhost:8080/signup',  payload)
      .then(res => {
        console.log('success')
        console.log(res)
          this.setState({
              show:true,
          });
        
      }).catch(function (error) {
        // handle error
      
        console.log(error.response.data.errors);
        return self.setState({ error: error.response.data.errors });


      })

  
      
  }

  handleUserChange(evt) {
    this.setState({
      username: evt.target.value,
    });
  };
   ConfPasswordChange(evt) {
    this.setState({
      confpwd: evt.target.value,
    });
  };

  handlePassChange(evt) {
    this.setState({
      password: evt.target.value,
    });
   
  }
  onConfirm(){
      this.setState({
          show: false,
      });
  }

  render() {
    // NOTE: I use data-attributes for easier E2E testing
    // but you don't need to target those (any css-selector will work)

    return (
        <div className="wrapper">
            <form className="form-signin" onSubmit={this.handleSubmit}>
          {
            this.state.error &&
            <h3 data-test="error" onClick={this.dismissError}>
              <button onClick={this.dismissError}>✖</button>
                            {this.state.error}
            </h3>
          }

                <SweetAlert
                    success
                    show={this.state.show}
                    title=""
                    onConfirm={this.onConfirm}
                    
                >
                    Successfully Registered
 </SweetAlert>
                <h2 className="form-signin-heading">Please login</h2>
                <input type="text" className="form-control" value={this.state.username} name="username" placeholder="Email Address" autoFocus onChange={this.handleUserChange} />
                <br/>
                <input type="password" className="form-control" value={this.state.password} name="password" placeholder="Password"  onChange={this.handlePassChange} />
                <br />
                <input type="password" className="form-control" value={this.state.confpwd} name="password" placeholder="Password" onChange={this.ConfPasswordChange} />

                    <input type="submit" value="Sign Up" data-test="submit" className="btn btn-lg btn-primary btn-block"/>
    </form>
  </div>
    );
  }
}

export default SignPage;