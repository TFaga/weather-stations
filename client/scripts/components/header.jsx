import React from 'react'
import Router, {Link} from 'react-router'
import {FlatButton, AppBar} from 'material-ui'

export default React.createClass({

  render() {

    return (
      <div>
        <AppBar
          className="mui-dark-theme ws-header"
          showMenuIconButton={false}
          title={<img src={'images/logo.png'} alt="logo" />}>
        </AppBar>
      </div>
    )
  }
})
