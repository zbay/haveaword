var React = require('react');
var ReactRouter = require('react-router');
var BrowserHistory = require('react-router/lib/browserHistory');
var ChatRoom = require('./ChatRoom');
var PasswordForm = require('./PasswordForm');
var Link = ReactRouter.Link;
var axios = require("axios");

var ChatRoomWrapper = React.createClass({
    getInitialState: function(){
      return {"canView": false}  
    },
    componentWillMount: function(){
        this.checkPrivate();
    },
    render: function(){
        let that = this;
        let canView = that.state.canView;
        return (<div>
        {canView ? <ChatRoom roomID={that.props.roomID}/> : <PasswordForm roomID={that.props.roomID} setVisible={that.setVisible}/>}
        </div>);
    },
    checkPrivate: function(){
        let that = this;
        axios.post("/checkPrivate").then(function(response){
            console.log(response.data);
            if(!response.data.private){
                that.setVisible();
            }
        });
    },
    setVisible: function(){
       this.setState({"canView": true});
    }
});

module.exports = ChatRoomWrapper;