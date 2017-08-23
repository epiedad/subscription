var React = require('react');
var {render} = require('react-dom');
var routes = require('./routes');

render(
    routes,
    document.getElementById('container'));
