var React = require('react');
var Message = require("./Message");

var MessageList = React.createClass({
    render: function(){
        let that = this;
        return (
        <table id="messageList">
        <tbody>
        <tr>
            <th>Time</th>
            <th>Author</th>
            <th>Message</th>
        </tr>
        {that.renderMessages()}
        </tbody>
        </table>
        );
    },
    renderMessages: function(){
        let that = this;
         return (that.props.messages.map(function(message, index){
            return (<Message key={index} text={message.text} author={message.author} timePosted={message.timePosted}/>);
        }));        
    }
});

module.exports = MessageList;