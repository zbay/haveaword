var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

module.exports = React.createClass({
    render: function(){
        return (<div id="about">
        <h3>Can I Have-A-Word with you?</h3>
        <p>Do you want to talk with somebody, immediately, in your very own chat room at a custom URL?
        Do you want your conversation to be (optionally) password protected, and to (also optionally) self-destruct
        within 48 hours? Then Have_A_Word is for you. <Link to="/">Let's get started!</Link></p>
        <img src="../img/login.png" className="img-responsive"/>
        <div className="aboutCaption">Sample login</div>
        <img src="../img/chatExample.png" className="img-responsive"/>
        <div className="aboutCaption">Sample chat room</div>
        </div>);
    }
});