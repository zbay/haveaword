var React = require('react');
var ReactRouter = require('react-router');
var MessageList = require('./MessageList');
var NewMessageForm = require('./NewMessageForm');
var NameForm = require('./NameForm');
var FormAlert = require("../Alerts/FormAlert");
var io = require("socket.io-client");
var socket = io();
/*
        socket.on('news', function (data) {
        console.log(data);
        socket.emit('my other event', { my: 'data' });
  });
*/

var Link = ReactRouter.Link;
var axios = require("axios");

var ChatRoom = React.createClass({
    getInitialState: function(){
      return {"name": "anonymous", "errorMessage": null, "messages": []}  
    },
    componentWillMount: function(){
      this.getMessages();  
    },
    componentDidMount: function(){
        let that = this;
          socket.on("newMessage", function(message){
          var currentMessages = that.state.messages;
          currentMessages.push(message);
          console.log("message: " + JSON.stringify(message));
          console.log("currentMessages: " + JSON.stringify(currentMessages));
          that.setState({messages: currentMessages});
      });  
    },
    render: function(){
        let that = this;
        console.log(that.state.messages);
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
        axios.post("/postMessage", {roomID: that.props.roomID, text: text, author: that.state.name}).then(function(response){
            if(response.data.error){
                that.setState({errorMessage: response.data.error});
            }
            else{
                // configure postMessage to send the proper data, then listen for newMessages elsewhere in this file
                console.log(response.data.message);
                socket.emit("newMessage", response.data.message);
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