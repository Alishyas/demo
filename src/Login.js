import React, { Component } from 'react';
import './new.css'; 
import axios from 'axios';



class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      error:''
    };

    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissError = this.dismissError.bind(this)
  }

 
 dismissError() {
    this.setState({ error: '' });
  }

  handleSubmit(evt) {
    console.log('here')
    evt.preventDefault();
      if (!this.state.username) {
      return this.setState({ error: 'Username is required' });
    }

    if (!this.state.password) {
      return this.setState({ error: 'Password is required' });
    }
     const payload ={"username":this.state.username,
                    "password":this.state.password};
    let self = this;
    axios.post('http://localhost:8080/login',  payload)
      .then(res => {
        console.log('success')
        localStorage.setItem('Username', this.state.username);
        console.log(this.state.username)
        if(this.state.username==='admin'){
          this.props.history.push('/dashboard')

        }
        else{
          this.props.history.push('/')

        }
       
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

  handlePassChange(evt) {
    this.setState({
      password: evt.target.value,
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

        
                <h2 className="form-signin-heading">Please login</h2>
                <input type="text" className="form-control" value={this.state.username} name="username" placeholder="Email Address" autoFocus onChange={this.handleUserChange} />
                <br/>
                <input type="password" className="form-control" value={this.state.password} name="password" placeholder="Password"  onChange={this.handlePassChange} />
           
                    <input type="submit" value="Log In" data-test="submit" className="btn btn-lg btn-primary btn-block"/>
   <br/>
          <a>Need an account <a href="/signup">Signup</a></a>
    </form>
  
  </div>
    );
  }
}

export default LoginPage;