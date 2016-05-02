var React = require('react');

var Message = React.createClass({
    render: function(){
        let that = this;
        return (<div className="message">
        <span className="messageTime">{that.props.timePosted}</span>&nbsp;<span className="author">{that.props.author}</span>&nbsp;
        <span className="messageBody">{that.props.text}</span>
        </div>);
    }
});

module.exports = Message;