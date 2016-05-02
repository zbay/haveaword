var React = require('react');
var ReactRouter = require('react-router');
var MessageList = require('./MessageList');
var MessageForm = require('./MessageForm');
var NameForm = require('./NameForm');
var FormAlert = require("./FormAlert");

var Link = ReactRouter.Link;
var axios = require("axios");

var ChatRoom = React.createClass({
    getInitialState: function(){
      return {"text": "", "name": "anonymous", "errorMessage": null}  
    },
    componentWillMount: function(){
        this.checkPrivate();
    },
    render: function(){
        let that = this;
        return (<div>
        <h2>Chat Room</h2>
        <FormAlert />
        <NameForm setName={that.setName}/>
        <MessageList roomID={that.state.roomID}/>
        <MessageForm postMessage={that.postMessage}/>
        </div>);
    },
    postMessage: function(text){
        let that = this;
        axios.post("/postMessage", {roomID: that.props.roomID, text: that.state.text, author: that.state.name}).then(function(response){
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
    }
});

module.exports = ChatRoom;