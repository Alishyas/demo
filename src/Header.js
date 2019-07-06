import React, {PureComponent} from 'react'
import { Nav, NavItem, Navbar } from 'react-bootstrap';

export default class Header extends PureComponent {
  constructor() {
    super();
    this.state = {
      value: '',
      username: localStorage.getItem('Username')
    };
    this.logout = this.logout.bind(this)
  }

logout(){
  this.setState({ username: '' });
  localStorage.removeItem('Username');
  window.location.href="/login"
}

  render() {
    return(
        <Navbar inverse collapseOnSelect style={{display:"flex", flexDirection:"row"}}>
          <Navbar.Header >
            <Navbar.Brand className="brand">
              Online Bidding System
            </Navbar.Brand>
          <Nav style={{display:"flex", flexDirection:"row"}} >
            <NavItem eventKey={1} href="/">Home</NavItem>
            <NavItem eventKey={2} href="/products">Products</NavItem>
            <NavItem eventKey={3} href="/contact">Contact</NavItem>
            <NavItem eventKey={4} href="/about">About</NavItem>
            <NavItem>{this.state.username}</NavItem>
            {this.state.username &&
            <NavItem onClick={this.logout}>Logout</NavItem>
            }
          </Nav>
        </Navbar.Header>
      </Navbar>
      );
  }
}
