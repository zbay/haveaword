var React = require('react');
var ReactRouter = require('react-router');
var BrowserHistory = require('react-router/lib/browserHistory');
var Link = ReactRouter.Link;

var About = React.createClass({
    render: function(){
        return (<div>
        <NewRoomForm createdRoom={this.redirect}/>
        </div>);
    },
    redirect: function(roomID){
        BrowserHistory.push("/chat/" + roomID);
    }
});