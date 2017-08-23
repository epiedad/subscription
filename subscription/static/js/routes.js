var React = require('react');
var { render } = require('react-dom');
var { Link, Router, Route, IndexRoute, browserHistory } = require('react-router');

var App = require('./components/App');
var Subscriptions = require('./components/subscriptions');
var EditForm = require('./components/subscriber_form');

const routes = (
    <Router history={browserHistory}>
        <Route component={App}>
            <Route path="/subscription/" component={Subscriptions} />
            <Route path="form(/:id)" component={EditForm} />
        </Route>
    </Router>
);

module.exports = routes;
