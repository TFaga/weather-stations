import React from 'react'
import Router, {Link} from 'react-router'

export default React.createClass({

  render() {

    var Logo = (
      <div>
        <div className="header-logo">
          <img src="images/Logo.png" />
        </div>
        <div>
          <Link to="layout">Vremenske postaje</Link>
        </div>
      </div>
    )

    return (
      <div>
        <Logo />
      </div>
    )
  }
})
