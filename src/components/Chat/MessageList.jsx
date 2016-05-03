var React = require('react');
var Message = require("./Message");

var MessageList = React.createClass({
    render: function(){
        let that = this;
        return (<div id="messageList">
        {that.renderMessages()}
        </div>);
    },
    renderMessages: function(){
        let that = this;
         return (that.props.messages.map(function(message, index){
            return (<Message key={index} text={message.text} author={message.author} timePosted={message.timePosted}/>)
        }))        
    }
});

module.exports = MessageList;