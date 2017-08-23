var React = require('react');
var {Link} = require('react-router');


class App extends React.Component {
    render(){
        return(
            <div>
                <div className="alert alert-success" id="success-alert">
                    <button type="button" className="close" data-dismiss="alert">x</button>
                    <strong></strong>
                </div>
                <div className="alert alert-warning" id="warning-alert">
                    <button type="button" className="close" data-dismiss="alert">x</button>
                    <strong></strong>
                </div>
                <div className="container-fluid center-div">
                    <h1>Subscriptions</h1>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

module.exports = App;

