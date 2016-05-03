var React = require('react');
var ReactRouter = require('react-router');
var MessageList = require('./MessageList');
var NewMessageForm = require('./NewMessageForm');
var NameForm = require('./NameForm');
var FormAlert = require("../Alerts/FormAlert");

var Link = ReactRouter.Link;
var axios = require("axios");

var ChatRoom = React.createClass({
    getInitialState: function(){
      return {"name": "anonymous", "errorMessage": null, "messages": []}  
    },
    componentWillMount: function(){
      this.getMessages();  
    },
    render: function(){
        let that = this;
        return (<div>
        <h2>Chat Room</h2>
        <FormAlert errorMessage={that.state.errorMessage}/>
        <NameForm setName={that.setName}/>
        <MessageList roomID={that.state.roomID} messages={that.state.messages}/>
        <NewMessageForm postMessage={that.postMessage}/>
        </div>);
    },
    postMessage: function(text){
        let that = this;
        console.log("attempting to post message...");
        axios.post("/postMessage", {roomID: that.props.roomID, text: text, author: that.state.name}).then(function(response){
            if(response.data.error){
                that.setState({errorMessage: response.data.error});
            }
            else{
                // broadcast event
                
            }
        });
    },
    setName: function(name){
        this.setState({"name": name});
    },
    getMessages: function(){
        let that = this;
        axios.post("/getMessages", {roomID: that.props.roomID}).then(function(response){
            if(response.data.messages){
                that.setState({"messages": response.data.messages});
            }
            else{
                that.setState({"errorMessage": response.data.error});
            }
        });
    }
});

module.exports = ChatRoom;