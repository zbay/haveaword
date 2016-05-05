var React = require('react');
var moment = require('moment');
var marked = require('marked');

var Message = React.createClass({
    render: function(){
        let that = this;
        var displayTime = moment(that.props.timePosted).format('MMMM Do, h:mm:ss a');
        return (<tr className="message">
        <td className="messageTime">{displayTime}</td>
        <td className="author">{that.props.author}</td>&nbsp;
        <td className="messageBody" dangerouslySetInnerHTML={that.rawMarkup(that.props.text)}></td>
        </tr>);
    },
    rawMarkup: function(value) {
      var rawMarkup = marked(value, {sanitize: true});
      return { __html: rawMarkup };
    },
});

module.exports = Message;