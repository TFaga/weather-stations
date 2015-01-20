import React from 'react'
import Router, {Route, DefaultRoute} from 'react-router'

import Layout from './components/layout'
import Home from './components/home/home'

export const routes = (
  <Route name="layout" path="/" handler={Layout}>
    <DefaultRoute handler={Home} />
  </Route>
)

export var start = () => {

  Router.run(routes, Handler => {
    React.render(<Handler />, document.getElementById('content'))
  })
}
