import React from 'react'
import Router, {Route, DefautRoute} from 'react-router'

import Layout from './components/layout'

export const routes = (
  <Route name="layout" path="/" handler={Layout}>
  </Route>
)

export var start = () => {

  Router.run(routes, Handler => {
    React.render(<Handler />, document.getElementById('content'))
  })
}
