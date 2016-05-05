var React = require('react');
var ReactRouter = require('react-router');
var MessageList = require('./MessageList');
var NewMessageForm = require('./NewMessageForm');
var NameForm = require('./NameForm');
var FormAlert = require("../Alerts/FormAlert");
var io = require("socket.io-client");
var socket = io();
var moment = require('moment');

var Link = ReactRouter.Link;
var axios = require("axios");

var ChatRoom = React.createClass({
    getInitialState: function(){
      return {"name": "anonymous", "errorMessage": null, "messages": [], "expiration": Date.now()}  
    },
    componentWillMount: function(){
      this.getRoomData();  
    },
    componentDidMount: function(){
        let that = this;
          socket.emit("room", that.props.roomID);
          socket.on("newMessage", function(message){
            var currentMessages = that.state.messages;
            currentMessages.push(message);
            that.setState({messages: currentMessages});
      });  
    },
    render: function(){
        let that = this;
        var expirationDate = moment(that.state.expiration).format('MMMM Do');
        return (<div id="chatRoom">
        <h3>Chat Room: {that.props.roomID}</h3>
        <h4>Expires: {expirationDate != "Invalid date" ? expirationDate : "never"}</h4>
        <FormAlert errorMessage={that.state.errorMessage} successMessage={that.props.successMessage}/>
        <br />
        <MessageList roomID={that.state.roomID} messages={that.state.messages}/>
        <br />
        <NameForm setName={that.setName}/>
        <br />
        <NewMessageForm postMessage={that.postMessage}/>
        <br />
        </div>);
    },
    postMessage: function(text){
        let that = this;
        axios.post("/postMessage", {roomID: that.props.roomID, text: text, author: that.state.name}).then(function(response){
            if(response.data.error){
                that.setState({errorMessage: response.data.error});
            }
            else{
                socket.emit("newMessage", response.data.message, that.props.roomID);
            }
        });
    },
    setName: function(name){
        this.setState({"name": name});
    },
    getRoomData: function(){
        let that = this;
        axios.post("/getRoomData", {roomID: that.props.roomID}).then(function(response){
            if(response.data.messages){
                that.setState({"messages": response.data.messages, "expiration": response.data.expiration});
            }
            else{
                that.setState({"errorMessage": response.data.error});
            }
        });
    }
});

module.exports = ChatRoom;