var React = require('react');
var ReactRouter = require('react-router');
var MessageList = require('./MessageList');
var NewMessageForm = require('./NewMessageForm');
var NameForm = require('./NameForm');
var FormAlert = require("../Alerts/FormAlert");
var io = require("socket.io-client");
var socket = io();
var moment = require('moment');
var recentQuantity = 50;

var Link = ReactRouter.Link;
var axios = require("axios");

var ChatRoom = React.createClass({
    getInitialState: function(){
      return {"name": "anonymous", "errorMessage": null, "messages": [], "expiration": Date.now(), "isLoading": true,
          "showAll": false, "allMessages": [], "origLength": 0
      }  
    },
    componentWillMount: function(){
      this.getData();  
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
        {(that.state.origLength > recentQuantity && !that.state.showAll ? 
            (<button onClick={that.showAll}>Show All Messages (Instead of {recentQuantity} most recent)</button>): 
            (<span></span>))}
        <FormAlert errorMessage={that.state.errorMessage} successMessage={that.props.successMessage}/>
        <br />
        {that.state.isLoading ? (<img src="/img/loading_spinner.gif"/>) : (<MessageList roomID={that.state.roomID} messages={that.state.messages}/>)}
        <br />
        <NameForm setName={that.setName}/>
        <br />
        <NewMessageForm postMessage={that.postMessage}/>
        <br />
        </div>);
    },
    postMessage: function(text){
        let that = this;
        axios.post("/postMessage", {roomID: that.props.roomID, text: text, author: that.state.name, password: that.props.password}).then(function(response){
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
    getData: function(){
        let that = this;
        axios.post("/getAllMessages", {roomID: that.props.roomID}).then(function(response){
            if(response.data.messages){
                that.setState({"allMessages": response.data.messages, "expiration": response.data.expiration, "isLoading": false,
                    "origLength": response.data.messages.length, "messages": response.data.messages.slice(-1 * recentQuantity)
                });
            }
            else{
                that.setState({"errorMessage": response.data.error});
            }
        });
    },
    showAll: function(){
        this.setState({"showAll": true, "messages": this.state.allMessages});
    }
});

module.exports = ChatRoom;