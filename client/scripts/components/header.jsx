import React from 'react'
import {Navbar, Nav, NavItem, DropdownButton, MenuItem} from 'react-bootstrap'
import Router, {Link} from 'react-router'
import {NavItemLink} from 'react-router-bootstrap'

export default React.createClass({

  render() {

    var Logo = (
      <div>
        <span>
          <img className="header-logo" src="images/Logo.png" />
          <a>Vremenske postaje</a>
        </span>
      </div>
    )

    return (
      <Navbar fluid inverse staticTop toggleNavKey={1} brand={Logo}>
        <Nav pullRight eventKey={1}>
          <NavItemLink to="layout">Prijava</NavItemLink>
        </Nav>
      </Navbar>
    )
  }
})
