var React = require('react');
var { browserHistory, Link  } = require('react-router');
var Select = require('react-select');
require('react-select/dist/react-select.css');
var { Creatable } = require('react-select');

class EditForm extends React.Component {
    constructor(props) {
        super(props);
            this.state = {
                username: "",
                mobile: "",
                email: "",
                slack_username: "",
                s_sms: false,
                s_email: false,
                s_slack: false, 
                s_inapp: false, 
                selected_channels: [],
                channel_options: [],
                subscriptions: [],
                user_subscriptions: [],
            };
             
            this.handleInputChange = this.handleInputChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.updateState = this.updateState.bind(this);
            this.getUserSubscription = this.getUserSubscription.bind(this);
            this.removeUserSubscription = this.removeUserSubscription.bind(this);
    }
    createSubscription(subscription){
        var subscription_api = '/subscriptions/';
        $.ajax({
            url: subscription_api,
            cache: false,
            data: subscription,
            //data: {"subscriber": user_id, "channel": subscription.id},
            method: "POST",
            headers: { "X-CSRFToken": CSRF_TOKEN },
            success: function(data) {
            console.log("success createSubscriptions: " + JSON.stringify(data));

                window.location.href = "/subscription/";
                $("#success-alert").fadeTo(2000, 500)
                    .slideUp(500, function(){
                        $("#success-alert").slideUp(500);
                    })
                    .find("strong").text("New Subscriber added!");
            }.bind(this)
        })
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        var api_url = '/subscribers/';
        var subscriber_id = this.props.params.id;
        var current_user = {
            username: this.state.username,
            email: this.state.email,
            mobile: this.state.mobile,
            slack_username: this.state.slack_username,
        }
        var self = this;
        //SUBSCRIBER UPDATE
        if(subscriber_id){
            $.ajax({
                url: api_url + subscriber_id + '/',
                cache: false,
                data: current_user,
                method: 'PUT',
                headers: { "X-CSRFToken": CSRF_TOKEN },
                success: function(data) {
                    var channels = self.state.selected_channels;
                    var user_subscriptions = self.state.user_subscriptions;
                    
                    if(channels.length == 0){
                        $("#warning-alert").fadeTo(2000, 500)
                            .slideUp(500, function(){
                                $("#warning-alert").slideUp(500);
                            })
                            .find("strong").text("Channel is required");
                    }
                    else {
                        //remove all user subscriptions before updating
                        for(var i in user_subscriptions){
                            self.removeUserSubscription(user_subscriptions[i]);
                        }
                        
                        if(channels.length > 1) {
                            //We'll create a new subscription from the given user id and subscription channel
                            for(var i in channels ) {
                                var subscription = {
                                    channel: channels[i].value,
                                    sms: self.state.s_sms,
                                    email: self.state.s_email,
                                    slack: self.state.s_slack,
                                    inapp: self.state.s_inapp,
                                    subscriber: data.id
                                }
                                self.createSubscription(subscription);
                            }
                        }
                        else {
                            var subscription = {
                                channel: channels[0].value,
                                sms: self.state.s_sms,
                                email: self.state.s_email,
                                slack: self.state.s_slack,
                                inapp: self.state.s_inapp,
                                subscriber: data.id
                            }
                            self.createSubscription(subscription);
                        }
                        
                        //browserHistory.push("/subscription/");
                        window.location.href = "/subscription/";
                        $("#success-alert").fadeTo(2000, 500)
                            .slideUp(500, function(){
                                $("#success-alert").slideUp(500);
                            })
                            .find("strong").text("Subscriber:  " + this.state.username + " updated successfully!");
                    }
                    
                }.bind(this)
            })
        }
        //NEW SUBSCRIBER
        else {
            var current_state = {
                username: this.state.username,
                mobile: this.state.mobile,
                email: this.state.email,
                slack_username: this.state.slack_username
            }
            var self = this;

            $.ajax({
                url: api_url,
                cache: false,
                data: current_state,
                method: 'POST',
                headers: { "X-CSRFToken": CSRF_TOKEN },
                success: function(data) {
                    var user_id = data.id;
                    var channels = self.state.selected_channels;
                    console.log("selected channels!: " + JSON.stringify(channels));

                    if(channels.length == 0){
                        $("#warning-alert").fadeTo(2000, 500)
                            .slideUp(500, function(){
                                $("#warning-alert").slideUp(500);
                            })
                            .find("strong").text("Channel is required");
                    }
                    else {
                        if(channels.length > 1) {
                            //We'll create a new subscription from the given user id and subscription channel
                            for(var i in channels ) {
                                var subscription = {
                                    channel: channels[i].value,
                                    sms: self.state.s_sms,
                                    email: self.state.s_email,
                                    slack: self.state.s_slack,
                                    inapp: self.state.s_inapp,
                                    subscriber: user_id
                                }
                                self.createSubscription(subscription);
                            }
                        }
                        else {
                            var subscription = {
                                channel: channels[0].value,
                                sms: self.state.s_sms,
                                email: self.state.s_email,
                                slack: self.state.s_slack,
                                inapp: self.state.s_inapp,
                                subscriber: user_id
                            }
                            self.createSubscription(subscription);
                        }
                    }
                },
                error: function(){
                    $("#warning-alert").fadeTo(2000, 500)
                        .slideUp(500, function(){
                            $("#warning-alert").slideUp(500);
                        })
                        .find("strong").text("Something went wrong");

                }.bind(this)
            })
        }
    }
    removeUserSubscription(id){
        var subscription_api = '/subscriptions/' + id + '/';
        $.ajax({
            url: subscription_api,
            datatype: 'json',
            cache: false,
            method: 'DELETE',
            success: function(data) {
            }.bind(this)
        })
    }
    loadChannels(){
        var channels_api = '/channels/';
        var channels = [];
        var self = this;
        $.ajax({
            url: channels_api,
            datatype: 'json',
            cache: false,
            success: function(data) {
                var results = data.results;
                for(var i in results){
                    var obj = {};
                    obj["value"] = parseInt(results[i].id);
                    obj["label"] = results[i].name;
                    channels.push(obj);
                }
                self.setState({channel_options: channels});
            }.bind(this)
        })
    }
    getUserSubscription(subscriptions,user_id){
        var selected_channels = [];
        var alerts = {};
        var channels = this.state.channel_options;
        var user_subscriptions = [];

        for(var i in subscriptions){
            if(subscriptions[i].subscriber == user_id){
                alerts['sms'] = subscriptions[i].sms;
                alerts['email'] = subscriptions[i].email;
                alerts['slack'] = subscriptions[i].slack;
                alerts['inapp'] = subscriptions[i].inapp;
                user_subscriptions.push(subscriptions[i].id);

                for(var x in channels){
                    if(channels[x].value == subscriptions[i].channel){
                        var obj = {};
                        obj['value'] = channels[x].value;
                        obj['label'] = channels[x].label;
                        selected_channels.push(obj);
                    }
                }
            }
        }

        this.setState({
            selected_channels,
            user_subscriptions,
            "s_sms": alerts.sms,
            "s_email": alerts.email,
            "s_slack": alerts.slack,
            "s_inapp": alerts.inapp
        });
    }
    loadSubscriber(){
        var user_id = this.props.params.id;
        var api_url = '/subscribers/' + this.props.params.id + '/';
        var logged_user_url = '/users/current/';
        var subscription_api = '/subscriptions/';
        var self = this;
        //EDIT SELECTED SUBSCRIBER
        if(user_id){
            $.ajax({
                url: api_url,
                datatype: 'json',
                cache: false,
                success: function(data) {
                    self.setState({
                        "username": data.username,
                        "mobile": data.mobile,
                        "email": data.email,
                        "slack_username": data.slack_username
                    });
                    $.ajax({
                        url: subscription_api,
                        datatype: 'json',
                        cache: false,
                        success: function(data) {
                            var subscriptions = data.results;
                            self.getUserSubscription(subscriptions, user_id);
                        }.bind(this)
                    })
                }.bind(this)
            })
        }
        //NEW SUBSCRIBER
        else {
            $.ajax({
                url: logged_user_url,
                datatype: 'json',
                cache: false,
                success: function(data) {
                    this.setState({"username": data.username});
                }.bind(this)
            })
        }
    }
    componentDidMount(){
        this.loadSubscriber();
        this.loadChannels();
    }      
    updateState(value) {
        this.setState({
            selected_channels: value
        });
    }
    render(){
        return(
            <div>
                <h2>Form</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input type="text" disabled className="form-control" id="username" name="username" onChange={this.handleInputChange} value={this.state.username} />
                    </div>
                    <div className="form-group">
                        <label>Mobile Number:</label>
                        <input type="text" name="mobile" className="form-control" id="mobile" onChange={this.handleInputChange} value={this.state.mobile} />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" name="email" className="form-control" id="email" onChange={this.handleInputChange} value={this.state.email} />
                    </div>
                    <div className="form-group">
                        <label>Slack username:</label>
                        <input type="text" name="slack_username" className="form-control" id="slack_username" onChange={this.handleInputChange} value={this.state.slack_username} />
                    </div>
                    <div className="form-group">
                        <label>Channel</label>
                        <Select
                        name="multi-select"
                        value={this.state.selected_channels}
                        options={this.state.channel_options}
                        onChange={this.updateState}
                        multi={true}
                        />
                        <label>Notification</label>
                        <input type="hidden" name="multi-select" /><br/>
                         <label className="checkbox-inline"><input type="checkbox" checked={this.state.s_sms} name="s_sms" onChange={this.handleInputChange}/>Sms</label>
                         <label className="checkbox-inline"><input type="checkbox" checked={this.state.s_email} name="s_email" onChange={this.handleInputChange}/>Email</label>
                         <label className="checkbox-inline"><input type="checkbox" checked={this.state.s_slack} name="s_slack" onChange={this.handleInputChange}/>Slack</label>
                         <label className="checkbox-inline"><input type="checkbox" checked={this.state.s_inapp} name="s_inapp" onChange={this.handleInputChange}/>InApp</label>
                     </div>
                    <button type="submit" className="btn btn-success">Save</button>
                    {"  "}
                    <Link to="/subscription/" className="btn btn-default">Cancel</Link>
                </form>
            </div>
        );
    }
}

module.exports = EditForm;
