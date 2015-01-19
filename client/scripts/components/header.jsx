import React from 'react'
import Router, {Link} from 'react-router'

export default React.createClass({

  render() {

    return (
      <header>
        <nav className="navbar navbar-weather navbar-static-top" role="navigation">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link to="/" className="navbar-brand">Weather stations</Link>
            </div>
          </div>
        </nav>
      </header>
    )
  }
})
