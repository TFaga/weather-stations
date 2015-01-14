var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var Layout = require('./components/layout');

var routes = (
  <Route name="layout" path="/" handler={Layout}>
  </Route>
);

exports.start = () => {

  Router.run(routes, function (Handler) {
    React.render(<Handler />, document.getElementById('content'));
  });
};
