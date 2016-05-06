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
        {canView ? <ChatRoom roomID={that.props.roomID} password={that.state.password}/>: <PasswordForm roomID={that.props.roomID} setVisible={that.setVisible} 
        setPassword={that.setPassword}/>}
        </div>);
    },
    checkPrivate: function(){
        let that = this;
        axios.post("/checkPrivate", {"roomID": that.props.roomID}).then(function(response){
            if(!response.data.private){
                if(response.data.exists){
                 that.setVisible();   
                }
                else{
                    BrowserHistory.push("/");
                }
            }
        });
    },
    setVisible: function(){
       this.setState({"canView": true});
    },
    setPassword: function(password){ //I require the password to add a message to a password-protected page, so post requests can't be spoofed to write to one
        this.setState({"password": password});
    }
});

module.exports = ChatRoomWrapper;