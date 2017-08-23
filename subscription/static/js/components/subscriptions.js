var React = require('react');
var {Link} = require('react-router');
var popupS = require('popups');
var createReactClass = require('create-react-class');

var Subscriptions = createReactClass ({

    loadLoggedUser: function(url){
        $.ajax({
            url: url,
            datatype: 'json',
            cache: false,
            success: function(data) {
                this.setState({'logged_user': data});
            }.bind(this)
        })
    },
    loadChannels: function(url){
        $.ajax({
            url: url,
            datatype: 'json',
            cache: false,
            success: function(data) {
                this.setState({'channels': data.results});
            }.bind(this)
        })
    },
    loadSubscribers: function(url){
        $.ajax({
            url: url,
            datatype: 'json',
            cache: false,
            success: function(data) {
                this.setState({'subscribers': data.results});
            }.bind(this)
        })
    },
    getInitialState: function() {
        return {'subscriber': "", 'subscribers': [], 'channels': {}, 'logged_user' : "", 'subscriptions': []};
    },
    componentDidMount: function() {
        var urls = {
            current_user: '/users/current/',
            subscribers: '/subscribers/',
            channels: '/channels/'
        }
        this.loadLoggedUser(urls.current_user);
        this.loadChannels(urls.channels);
        this.loadSubscribers(urls.subscribers);
    },
    deleteSubscriber(subscriber_id, index){
        var api_url = '/subscribers/' + subscriber_id + '/';
        popupS.confirm({
            content:     '<b>Are you sure you want to delete this subscriber?</b>',
            labelOk:     'Yes',
            labelCancel: 'No',
            onSubmit: function() {
                $.ajax({
                    url: api_url,
                    cache: false,
                    method: 'DELETE',
                    headers: { "X-CSRFToken": CSRF_TOKEN },
                    success: function(data) {
                        $('tr#' + index).fadeOut(400,function(){
                            this.remove();
                        })
                        $("#success-alert").fadeTo(2000, 500)
                            .slideUp(500, function(){
                                $("#success-alert").slideUp(500);
                            })
                            .find("strong").text("Subscriber deleted successfully!");
                    }.bind(this)
                })
            },
        });
        event.preventDefault();
    },
    subscriberRow(subscriber, index) {
        var channels = this.state.channels;
        var logged_user = this.state.logged_user;

        //we get all the subscribers with the same username of the current logged User since its unique.
        if(subscriber.username == logged_user.username){
            var obj = {};
            obj["subscriber_id"] = subscriber.id;
            obj["username"] = subscriber.username;
            var channel_names = [];

            for(x in subscriber.subscriptions){
                var channel_id = subscriber.subscriptions[x].substr(-2,1);
                for(i in channels){
                    if(channels[i].id == channel_id){
                        channel_names.push(channels[i].name);
                    }
                }
                obj["channels"] = channel_names.join(", ");
            }

           return (
            <tr key={index} id={index}>
                <td>{obj.username}</td>
                <td>{obj.channels}</td>
                <td>
                    <Link to={`form/${obj.subscriber_id}`} className="btn btn-info">Edit</Link>
                    {" "}
                    <button onClick={() => this.deleteSubscriber(obj.subscriber_id, index)} className="btn btn-danger">Delete</button>
                </td>
            </tr>
           );
        }
    },
    render: function() {
        //table rows
        var rows = this.state.subscribers.map(this.subscriberRow);

        //Table headings
        var table_headings = ['Subscriber', 'Subscribed Channel', 'Manage'];

        var headings = table_headings.map(function(heading, index) {
            return(<th key={index}>
                    {heading}
                </th>);
        });
        if(!this.state.logged_user){
            return null;
        }
        return(
            <div>
                <Link to="form" className="btn btn-primary">New Subscription</Link><br/>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>{headings}</tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        );
    }
})

module.exports = Subscriptions;
